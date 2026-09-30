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

import com.fortalgeek.backend.dto.EventoRequest;
import com.fortalgeek.backend.model.Evento;
import com.fortalgeek.backend.service.EventoService;


@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    
    // aqui é o endpoint do create
    @PostMapping
    public ResponseEntity<Evento> criarEvento(@RequestBody EventoRequest request) {
        Evento novoEvento = eventoService.criarEvento(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEvento);
    }


    // aqui é o endpoint do read
    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        List<Evento> eventos = eventoService.listarTodos();
        return ResponseEntity.ok(eventos);
    }
    
    // aqui é o endpoint do update
    @PutMapping("/{id}")
    public ResponseEntity<Evento> atualizarEvento(@PathVariable Long id, @RequestBody EventoRequest request) {
        Evento eventoAtualizado = eventoService.atualizarEvento(id, request);
        return ResponseEntity.ok(eventoAtualizado);
    }

    // aqui é o endpoint do delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        eventoService.deletarEvento(id);
        return ResponseEntity.noContent().build(); // Retorna 204 (Sem conteúdo) indicando sucesso
    }

}