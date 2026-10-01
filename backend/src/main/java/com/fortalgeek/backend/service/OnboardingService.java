package com.fortalgeek.backend.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fortalgeek.backend.dto.OnboardingRequest;
import com.fortalgeek.backend.dto.OnboardingStatusResponse;
import com.fortalgeek.backend.model.Empresa;
import com.fortalgeek.backend.model.PerfilJogador;
import com.fortalgeek.backend.model.TipoUsuario;
import com.fortalgeek.backend.model.Usuario;
import com.fortalgeek.backend.repository.EmpresaRepository;
import com.fortalgeek.backend.repository.PerfilJogadorRepository;
import com.fortalgeek.backend.repository.UsuarioRepository;

@Service
public class OnboardingService {

    private final UsuarioRepository usuarioRepository;
    private final PerfilJogadorRepository perfilJogadorRepository;
    private final EmpresaRepository empresaRepository;

    public OnboardingService(
            UsuarioRepository usuarioRepository,
            PerfilJogadorRepository perfilJogadorRepository,
            EmpresaRepository empresaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.perfilJogadorRepository = perfilJogadorRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional(readOnly = true)
    public OnboardingStatusResponse buscarStatus(String email) {
        Usuario usuario = buscarUsuario(email);

        if (usuario.getTipo() == TipoUsuario.COMPANY) {
            return buscarEmpresaDoUsuario(usuario.getId())
                    .map(empresa -> new OnboardingStatusResponse(true, empresa.getNomeFantasia(), Set.of()))
                    .orElseGet(() -> new OnboardingStatusResponse(false, usuario.getNome(), Set.of()));
        }

        return perfilJogadorRepository.findByUsuarioId(usuario.getId())
                .map(perfil -> new OnboardingStatusResponse(
                        perfil.isOnboardingConcluido(),
                        usuario.getNome(),
                        Set.copyOf(perfil.getInteresses())
                ))
                .orElseGet(() -> new OnboardingStatusResponse(false, usuario.getNome(), Set.of()));
    }

    @Transactional
    public OnboardingStatusResponse concluir(String email, OnboardingRequest request) {
        Usuario usuario = buscarUsuario(email);

        if (usuario.getTipo() == TipoUsuario.COMPANY) {
            Empresa empresa = buscarEmpresaDoUsuario(usuario.getId())
                    .orElseGet(Empresa::new);

            empresa.setUsuario(usuario);
            empresa.setNomeFantasia(request.nomeFantasia());
            empresa.setCnpj(request.cnpj());
            empresa.setTelefone(request.telefone());

            empresaRepository.save(empresa);

            return new OnboardingStatusResponse(true, empresa.getNomeFantasia(), Set.of());
        }

        if (request.nickname() != null && !request.nickname().trim().isEmpty()) {
            usuario.setNome(request.nickname().trim());
            usuarioRepository.save(usuario);
        }

        PerfilJogador perfil = perfilJogadorRepository
                .findByUsuarioId(usuario.getId())
                .orElseGet(PerfilJogador::new);

        perfil.setUsuario(usuario);
        
        if (request.interesses() != null) {
            perfil.setInteresses(new HashSet<>(request.interesses()));
        }
        
        perfil.setOnboardingConcluido(true);

        PerfilJogador perfilSalvo = perfilJogadorRepository.save(perfil);

        return new OnboardingStatusResponse(
                perfilSalvo.isOnboardingConcluido(),
                usuario.getNome(),
                Set.copyOf(perfilSalvo.getInteresses())
        );
    }

    private Usuario buscarUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuário autenticado não encontrado"
                ));
    }

    private Optional<Empresa> buscarEmpresaDoUsuario(Long usuarioId) {
        return empresaRepository.findAll().stream()
                .filter(e -> e.getUsuario() != null && e.getUsuario().getId().equals(usuarioId))
                .findFirst();
    }
}