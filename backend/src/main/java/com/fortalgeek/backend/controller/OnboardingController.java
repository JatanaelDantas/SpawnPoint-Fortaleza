package com.fortalgeek.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fortalgeek.backend.dto.OnboardingRequest;
import com.fortalgeek.backend.dto.OnboardingStatusResponse;
import com.fortalgeek.backend.service.OnboardingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/onboarding")
public class OnboardingController {

    private final OnboardingService onboardingService;


    public OnboardingController(
            OnboardingService onboardingService) {

        this.onboardingService = onboardingService;
    }


    @GetMapping("/status")
    public ResponseEntity<OnboardingStatusResponse> buscarStatus(
            Authentication authentication) {

        String email = authentication.getName();


        OnboardingStatusResponse response =
                onboardingService.buscarStatus(email);


        return ResponseEntity.ok(response);
    }


    @PostMapping("/concluir")
    public ResponseEntity<OnboardingStatusResponse> concluir(

            Authentication authentication,

            @Valid
            @RequestBody
            OnboardingRequest request) {


        String email = authentication.getName();


        OnboardingStatusResponse response =
                onboardingService.concluir(
                        email,
                        request
                );


        return ResponseEntity.ok(response);
    }
}