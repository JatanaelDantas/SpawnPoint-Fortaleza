package com.fortalgeek.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.dto.LocalRequest;
import com.fortalgeek.backend.model.Local;
import com.fortalgeek.backend.repository.LocalRepository;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    //aqui é o create
    public Local criarLocal(LocalRequest request) {
        Local novoLocal = new Local();
        novoLocal.setNome(request.getNome());
        novoLocal.setEndereco(request.getEndereco());
        novoLocal.setCapacidade(request.getCapacidade());
        return localRepository.save(novoLocal);
    }

    //aqui é o read
    public List<Local> listarTodos() {
        return localRepository.findAll();
    }

    //aqui é o update
    public Local atualizarLocal(Long id, LocalRequest request) {
        Local localExistente = localRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Local não encontrado!"));

        localExistente.setNome(request.getNome());
        localExistente.setEndereco(request.getEndereco());
        localExistente.setCapacidade(request.getCapacidade());

        return localRepository.save(localExistente);
    }

    //aqui é o delete
    public void deletarLocal(Long id) {
        Local localExistente = localRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Local não encontrado!"));
        
        localRepository.delete(localExistente);
    }
}