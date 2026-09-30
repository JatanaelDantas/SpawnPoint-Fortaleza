package com.fortalgeek.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    
    @PostMapping
    public ResponseEntity<Evento> criarEvento(@RequestBody EventoRequest request) {
        Evento novoEvento = eventoService.criarEvento(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEvento);
    }


    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        List<Evento> eventos = eventoService.listarTodos();
        return ResponseEntity.ok(eventos);
    }
    
}