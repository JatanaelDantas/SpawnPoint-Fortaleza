package com.fortalgeek.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fortalgeek.backend.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    
    
    Optional<Empresa> findByCnpj(String cnpj);
}