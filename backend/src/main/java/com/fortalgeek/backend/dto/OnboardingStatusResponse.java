package com.fortalgeek.backend.dto;

import java.util.Set;

import com.fortalgeek.backend.model.InteresseGeek;

public record OnboardingStatusResponse(

    boolean concluido,

    String nickname,

    Set<InteresseGeek> interesses

) {
}