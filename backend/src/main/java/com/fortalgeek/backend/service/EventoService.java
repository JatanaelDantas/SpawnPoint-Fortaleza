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

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }
}
