package com.fortalgeek.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
import com.fortalgeek.backend.dto.RegisterRequest;
import com.fortalgeek.backend.dto.CadastroEmpresaRequest;
import com.fortalgeek.backend.dto.LoginRequest;
import com.fortalgeek.backend.dto.LoginResponse;
import com.fortalgeek.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.autenticar(request);
        if (response.getAutenticado()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody RegisterRequest request) {
        try {
            LoginResponse response = authService.registrar(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
    //FAZ A ROTA ASSIM PARA CADASTRO DE USUARIO COMUM
    @PostMapping("/cadastro/empresa")
    public ResponseEntity<String> cadastrarEmpresa(@RequestBody CadastroEmpresaRequest request) {
        try {
            authService.cadastrarEmpresa(request);
            return ResponseEntity.status(201).body("Empresa cadastrada com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
