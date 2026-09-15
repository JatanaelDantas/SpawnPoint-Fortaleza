package com.fortalgeek.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String senhaTeste = "Teste123!";

        String hash = encoder.encode(senhaTeste);

        System.out.println("Senha original: " + senhaTeste);
        System.out.println("Hash BCrypt: " + hash);
    }
}