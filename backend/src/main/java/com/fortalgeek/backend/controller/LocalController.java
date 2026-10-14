package com.fortalgeek.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fortalgeek.backend.dto.LocalRequest;
import com.fortalgeek.backend.model.Local;
import com.fortalgeek.backend.service.LocalService;

@RestController
@RequestMapping("/api/locais")
public class LocalController {

    @Autowired
    private LocalService localService;

    @PostMapping
    public ResponseEntity<Local> criarLocal(@RequestBody LocalRequest request) {
        Local novoLocal = localService.criarLocal(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoLocal);
    }

    @GetMapping
    public ResponseEntity<List<Local>> listarLocais() {
        List<Local> locais = localService.listarTodos();
        return ResponseEntity.ok(locais);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Local> atualizarLocal(@PathVariable Long id, @RequestBody LocalRequest request) {
        Local localAtualizado = localService.atualizarLocal(id, request);
        return ResponseEntity.ok(localAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLocal(@PathVariable Long id) {
        localService.deletarLocal(id);
        return ResponseEntity.noContent().build();
    }
}