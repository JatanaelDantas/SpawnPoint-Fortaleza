package com.fortalgeek.backend.dto;


//O QUE EU MANDO E QUERO RECEBER DE CADASTRO DE EMPRESA
public class CadastroEmpresaRequest {
    private String email;
    private String senha;
    private String nomeFantasia;
    private String cnpj;
    private String telefone;

    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getNomeFantasia() { return nomeFantasia; }
    public void setNomeFantasia(String nomeFantasia) { this.nomeFantasia = nomeFantasia; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
}