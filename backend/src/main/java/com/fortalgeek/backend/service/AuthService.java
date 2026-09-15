package com.fortalgeek.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
import com.fortalgeek.backend.dto.RegisterRequest; 
import com.fortalgeek.backend.model.TipoUsuario;
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

    
    public LoginResponse registrar(RegisterRequest request) {
        
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }
        
        
        if (!request.isTermosAceitos()) {
            throw new IllegalArgumentException("É necessário aceitar os termos da LGPD.");
        }

       
        Usuario novoUsuario = new Usuario();
        novoUsuario.setEmail(request.getEmail());
        novoUsuario.setSenha(passwordEncoder.encode(request.getSenha())); // Senha criptografada
        novoUsuario.setTermosAceitos(request.isTermosAceitos());

        
        if ("COMPANY".equalsIgnoreCase(request.getTipo())) {
            novoUsuario.setTipo(TipoUsuario.COMPANY);
            novoUsuario.setNome(request.getNome()); 
            novoUsuario.setNomeEmpresa(request.getNomeEmpresa());
            novoUsuario.setCnpj(request.getCnpj());
            novoUsuario.setCpf(request.getCpf());
        } else {
            novoUsuario.setTipo(TipoUsuario.USER);
            novoUsuario.setNome(request.getNome());
        }

       
        usuarioRepository.save(novoUsuario);
        
       
        String token = jwtService.gerarToken(novoUsuario);
        return new LoginResponse(novoUsuario.getNome(), novoUsuario.getTipo(), true, token);
    }
}