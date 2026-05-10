package com.sistema.dragonballportalbackend.logic.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

// Utilidad para el manejo seguro de contraseñas usando el algoritmo BCrypt.
// Proporciona métodos para cifrar contraseñas y verificar coincidencias.
@Component
public class PasswordHash {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String hash(String plainPassword) {
        return encoder.encode(plainPassword);
    }

    public boolean verify(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}
