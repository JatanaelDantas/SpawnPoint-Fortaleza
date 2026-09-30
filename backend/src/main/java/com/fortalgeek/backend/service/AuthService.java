package com.fortalgeek.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
import com.fortalgeek.backend.dto.RegisterRequest;
import com.fortalgeek.backend.model.Empresa;
import com.fortalgeek.backend.model.TipoUsuario;
import com.fortalgeek.backend.model.Usuario;
import com.fortalgeek.backend.repository.EmpresaRepository;
import com.fortalgeek.backend.repository.UsuarioRepository;
import com.fortalgeek.backend.security.JwtService;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmpresaRepository empresaRepository;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService, EmpresaRepository empresaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.empresaRepository = empresaRepository;
    }

    public LoginResponse autenticar(LoginRequest request) {
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(request.getEmail());
        
        if(usuarioEncontrado.isEmpty()) {
            throw new IllegalArgumentException("Credenciais inválidas.");
        }

        Usuario usuario = usuarioEncontrado.get();
        boolean senhaCorreta = passwordEncoder.matches(request.getSenha(), usuario.getSenha());
        
        if(!senhaCorreta) {
            throw new IllegalArgumentException("Credenciais inválidas.");
        }

        String token = jwtService.gerarToken(usuario);
        return new LoginResponse(usuario.getNome(), usuario.getTipo(), true, token);
    }

    public LoginResponse registrar(RegisterRequest request) {
        
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        if ("COMPANY".equalsIgnoreCase(request.getTipo()) && empresaRepository.findByCnpj(request.getCnpj()).isPresent()) {
            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }

        
        Usuario novoUsuario = new Usuario();
        novoUsuario.setEmail(request.getEmail());
        novoUsuario.setSenha(passwordEncoder.encode(request.getSenha()));
        novoUsuario.setNome(request.getNome());
        

        if ("COMPANY".equalsIgnoreCase(request.getTipo())) {
            novoUsuario.setTipo(TipoUsuario.COMPANY);
        } else {
            novoUsuario.setTipo(TipoUsuario.USER);
        }

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        
        if (TipoUsuario.COMPANY.equals(usuarioSalvo.getTipo())) {
            Empresa novaEmpresa = new Empresa();
            novaEmpresa.setNomeFantasia(request.getNomeFantasia());
            novaEmpresa.setCnpj(request.getCnpj());
            novaEmpresa.setTelefone(request.getTelefone());
            novaEmpresa.setUsuario(usuarioSalvo); 
            empresaRepository.save(novaEmpresa);
        }

        String token = jwtService.gerarToken(usuarioSalvo);
        return new LoginResponse(usuarioSalvo.getNome(), usuarioSalvo.getTipo(), true, token);
    }
}