package com.fortalgeek.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fortalgeek.backend.model.PerfilJogador;

public interface PerfilJogadorRepository
        extends JpaRepository<PerfilJogador, Long> {

    Optional<PerfilJogador> findByUsuarioId(Long usuarioId);

}