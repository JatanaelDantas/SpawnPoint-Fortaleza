package com.fortalgeek.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "perfis_jogador")
public class PerfilJogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "usuario_id",
        nullable = false,
        unique = true
    )
    private Usuario usuario;

    @Column(
        name = "onboarding_concluido",
        nullable = false
    )
    private boolean onboardingConcluido = false;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "perfil_interesses",
        joinColumns = @JoinColumn(name = "perfil_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(
        name = "interesse",
        nullable = false
    )
    private Set<InteresseGeek> interesses = new HashSet<>();


    public Long getId() {
        return id;
    }


    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


    public boolean isOnboardingConcluido() {
        return onboardingConcluido;
    }

    public void setOnboardingConcluido(boolean onboardingConcluido) {
        this.onboardingConcluido = onboardingConcluido;
    }


    public Set<InteresseGeek> getInteresses() {
        return interesses;
    }

    public void setInteresses(Set<InteresseGeek> interesses) {
        this.interesses = interesses;
    }
}