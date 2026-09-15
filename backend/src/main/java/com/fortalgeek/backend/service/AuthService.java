package com.fortalgeek.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.CadastroEmpresaRequest;
import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
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

    
    public void cadastrarEmpresa(CadastroEmpresaRequest request) {
        // VERIFICAÇÃO 
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        if (empresaRepository.findByCnpj(request.getCnpj()).isPresent()) {
            throw new RuntimeException("CNPJ já cadastrado");
        }

        //AQUI CRIO O USUARIO DO TIPO COMPANY E SALVO NO BANCO DE DADOS
        Usuario novoUsuario = new Usuario();
        novoUsuario.setEmail(request.getEmail());
        novoUsuario.setSenha(passwordEncoder.encode(request.getSenha())); //SERVE PARA CRIPTOGRAFAR A SENHA
        novoUsuario.setNome(request.getNomeFantasia()); // USAR NOME FANTASIA COMO NOME DO USUARIO
        novoUsuario.setTipo(TipoUsuario.COMPANY);
        
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        //AQUI CRIO A EMPRESA E SALVO NO BANCO DE DADOS, VINCULANDO O USUARIO CRIADO A ELA
        Empresa novaEmpresa = new Empresa();
        novaEmpresa.setNomeFantasia(request.getNomeFantasia());
        novaEmpresa.setCnpj(request.getCnpj());
        novaEmpresa.setTelefone(request.getTelefone());
        novaEmpresa.setUsuario(usuarioSalvo); //VINCULA O USUARIO CRIADO A EMPRESA

        empresaRepository.save(novaEmpresa);
    }
}