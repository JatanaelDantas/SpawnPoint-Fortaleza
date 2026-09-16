package com.fortalgeek.backend.dto;

import java.util.Set;

import com.fortalgeek.backend.model.InteresseGeek;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record OnboardingRequest(

    @NotBlank(message = "O nickname é obrigatório")
    @Size(
        min = 3,
        max = 30,
        message = "O nickname deve ter entre 3 e 30 caracteres"
    )
    String nickname,

    @NotNull(message = "Os interesses são obrigatórios")
    @Size(
        min = 1,
        max = 10,
        message = "Escolha entre 1 e 10 interesses"
    )
    Set<InteresseGeek> interesses

) {
}