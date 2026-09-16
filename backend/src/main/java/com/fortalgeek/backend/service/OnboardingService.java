package com.fortalgeek.backend.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fortalgeek.backend.dto.OnboardingRequest;
import com.fortalgeek.backend.dto.OnboardingStatusResponse;
import com.fortalgeek.backend.model.PerfilJogador;
import com.fortalgeek.backend.model.TipoUsuario;
import com.fortalgeek.backend.model.Usuario;
import com.fortalgeek.backend.repository.PerfilJogadorRepository;
import com.fortalgeek.backend.repository.UsuarioRepository;

@Service
public class OnboardingService {

    private final UsuarioRepository usuarioRepository;
    private final PerfilJogadorRepository perfilJogadorRepository;


    public OnboardingService(
            UsuarioRepository usuarioRepository,
            PerfilJogadorRepository perfilJogadorRepository) {

        this.usuarioRepository = usuarioRepository;
        this.perfilJogadorRepository = perfilJogadorRepository;
    }


    @Transactional(readOnly = true)
    public OnboardingStatusResponse buscarStatus(String email) {

        Usuario usuario = buscarUsuario(email);

        validarUsuarioComum(usuario);


        return perfilJogadorRepository
                .findByUsuarioId(usuario.getId())

                .map(perfil -> new OnboardingStatusResponse(

                        perfil.isOnboardingConcluido(),

                        usuario.getNome(),

                        Set.copyOf(perfil.getInteresses())

                ))

                .orElseGet(() -> new OnboardingStatusResponse(

                        false,

                        usuario.getNome(),

                        Set.of()

                ));
    }


    @Transactional
    public OnboardingStatusResponse concluir(
            String email,
            OnboardingRequest request) {

        Usuario usuario = buscarUsuario(email);

        validarUsuarioComum(usuario);


        /*
         * Atualiza o nome/nickname que já existe
         * na tabela usuarios.
         */
        usuario.setNome(
                request.nickname().trim()
        );

        usuarioRepository.save(usuario);


        /*
         * Procura o PerfilJogador.
         *
         * Se ainda não existir, cria um novo.
         */
        PerfilJogador perfil =
                perfilJogadorRepository
                        .findByUsuarioId(usuario.getId())
                        .orElseGet(PerfilJogador::new);


        perfil.setUsuario(usuario);

        perfil.setInteresses(
                new HashSet<>(request.interesses())
        );

        perfil.setOnboardingConcluido(true);


        PerfilJogador perfilSalvo =
                perfilJogadorRepository.save(perfil);


        return new OnboardingStatusResponse(

                perfilSalvo.isOnboardingConcluido(),

                usuario.getNome(),

                Set.copyOf(
                        perfilSalvo.getInteresses()
                )

        );
    }


    private Usuario buscarUsuario(String email) {

        return usuarioRepository
                .findByEmail(email)

                .orElseThrow(() ->
                        new ResponseStatusException(

                                HttpStatus.UNAUTHORIZED,

                                "Usuário autenticado não encontrado"

                        )
                );
    }


    private void validarUsuarioComum(Usuario usuario) {

        if (usuario.getTipo() != TipoUsuario.USER) {

            throw new ResponseStatusException(

                    HttpStatus.FORBIDDEN,

                    "Este onboarding é exclusivo para usuários comuns"

            );
        }
    }
}