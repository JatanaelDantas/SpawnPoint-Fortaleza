package com.fortalgeek.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
import com.fortalgeek.backend.model.Usuario;
import com.fortalgeek.backend.repository.UsuarioRepository;
import com.fortalgeek.backend.security.JwtService;

@Service

public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse autenticar(LoginRequest request) {
        Optional<Usuario>usuarioEncontrado = usuarioRepository.findByEmail(request.getEmail());
        if(usuarioEncontrado.isEmpty()) {
            return new LoginResponse(null, null, false, null);
        }
        Usuario usuario = usuarioEncontrado.get();
        boolean senhaCorreta = passwordEncoder.matches(request.getSenha(), usuario.getSenha());
        if(!senhaCorreta) {
            return new LoginResponse(null, null, false, null);
    }
        String token = jwtService.gerarToken(usuario);
        return new LoginResponse(usuario.getNome(), usuario.getTipo(), true, token);
    }
}
