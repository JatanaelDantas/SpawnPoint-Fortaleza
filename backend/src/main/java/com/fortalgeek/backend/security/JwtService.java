package com.fortalgeek.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fortalgeek.backend.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(secret);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String gerarToken(Usuario usuario) {

        long umaHora = 60 * 60 * 1000;
        long agora = System.currentTimeMillis();

        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim("tipo", usuario.getTipo().name())
                .issuedAt(new Date(agora))
                .expiration(new Date(agora + umaHora))
                .signWith(getSigningKey())
                .compact();
    }

    private Claims extrairClaims(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims;
    }

    public String extrairEmail(String token) {

        Claims claims = extrairClaims(token);

        return claims.getSubject();
    }

    public boolean tokenValido(String token) {

        try {

            Claims claims = extrairClaims(token);

            Date expiracao = claims.getExpiration();

            return expiracao != null && expiracao.after(new Date());

        } catch (JwtException | IllegalArgumentException e) {

            return false;
        }
    }
}