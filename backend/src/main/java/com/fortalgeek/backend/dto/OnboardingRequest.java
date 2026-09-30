package com.fortalgeek.backend.dto;

import java.util.Set;
import com.fortalgeek.backend.model.InteresseGeek;

public record OnboardingRequest(
    
    // Campos de Jogador 
    String nickname,
    Set<InteresseGeek> interesses,

    // Campos de Empresa 
    String nomeFantasia,
    String cnpj,
    String telefone

) {
}