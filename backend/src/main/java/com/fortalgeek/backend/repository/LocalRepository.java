package com.fortalgeek.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fortalgeek.backend.model.Local;

public interface LocalRepository extends JpaRepository<Local, Long> {
}