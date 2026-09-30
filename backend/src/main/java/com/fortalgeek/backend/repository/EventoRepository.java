package com.fortalgeek.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fortalgeek.backend.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

}
