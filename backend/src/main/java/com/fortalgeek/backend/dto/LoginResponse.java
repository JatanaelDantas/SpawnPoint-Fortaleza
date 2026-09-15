package com.fortalgeek.backend.dto;
import com.fortalgeek.backend.model.TipoUsuario;

public class LoginResponse {
    private String nome;
    private TipoUsuario tipo;
    private boolean autenticado;
    private String token;


    public LoginResponse(String nome, TipoUsuario tipo, boolean autenticado, String token) {
        this.nome = nome;
        this.tipo = tipo;
        this.autenticado = autenticado;
        this.token = token;
    }

    public String getToken() {
        return token;
    }
    public boolean getAutenticado() {
        return autenticado;
    }
    public String getNome() {
        return nome;
    }
    public TipoUsuario getTipo() {
        return tipo;
}

}
