package com.sistema.dragonballportalbackend.security;

import com.sistema.dragonballportalbackend.logic.model.Rol;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey clave() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Genera un token firmado con los datos del usuario
    public String generarToken(Integer id, String username, Rol rol) {
        return Jwts.builder()
                .subject(username)
                .claim("id", id)
                .claim("rol", rol.name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(clave())
                .compact();
    }

    public Claims parsearClaims(String token) {
        return Jwts.parser()
                .verifyWith(clave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean esValido(String token) {
        try {
            parsearClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String obtenerUsername(String token) {
        return parsearClaims(token).getSubject();
    }

    public Integer obtenerUserId(String token) {
        return parsearClaims(token).get("id", Integer.class);
    }

    public Rol obtenerRol(String token) {
        return Rol.valueOf(parsearClaims(token).get("rol", String.class));
    }
}
