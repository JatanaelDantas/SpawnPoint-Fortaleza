package com.fortalgeek.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.EventoRequest;
import com.fortalgeek.backend.model.Empresa;
import com.fortalgeek.backend.model.Evento;
import com.fortalgeek.backend.repository.EmpresaRepository;
import com.fortalgeek.backend.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;
    
    // aqui é o método de criação do evento
    public Evento criarEvento(EventoRequest request) {

        Empresa empresaEncontrada = empresaRepository.findById(request.getEmpresaId())
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada!"));

        Evento novoEvento = new Evento();
        novoEvento.setTitulo(request.getTitulo());
        novoEvento.setDescricao(request.getDescricao());
        novoEvento.setLocal(request.getLocal());
        novoEvento.setDataHora(request.getDataHora());

        novoEvento.setEmpresa(empresaEncontrada);

        return eventoRepository.save(novoEvento);

    }

    // aqui é o método de atualização do evento
    public Evento atualizarEvento(Long id, EventoRequest request) {
        Evento eventoExistente = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        eventoExistente.setTitulo(request.getTitulo());
        eventoExistente.setDescricao(request.getDescricao());
        eventoExistente.setLocal(request.getLocal());
        eventoExistente.setDataHora(request.getDataHora());

        return eventoRepository.save(eventoExistente);
    }

    // aqui é o método de deleção do evento
    public void deletarEvento(Long id) {
        Evento eventoExistente = eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado!"));

        eventoRepository.delete(eventoExistente);
    }
    // aqui é o método de listagem de todos os eventos
    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }
}
