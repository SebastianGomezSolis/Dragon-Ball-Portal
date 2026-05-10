package com.sistema.dragonballportalbackend.logic.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

// Utilidad para el manejo seguro de contraseñas usando el algoritmo BCrypt.
// Proporciona métodos para cifrar contraseñas y verificar coincidencias.
@Component
public class PasswordHash {
    // Instancia del codificador BCrypt que implementa el algoritmo de hashing.
    // Utilizado internamente para todas las operaciones de cifrado y verificación.
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Cifra una contraseña en texto plano usando BCrypt.
    // El hash resultante incluye un salt automáticamente para mayor seguridad.
    // @param plainPassword Contraseña en texto plano a cifrar.
    // @return Hash BCrypt de la contraseña que puede ser almacenado en la base de datos.
    public String hash(String plainPassword) {
        return encoder.encode(plainPassword);
    }

    // Verifica si una contraseña en texto plano coincide con un hash almacenado.
    // Utiliza el método matches de BCrypt para comparación segura.
    // @param plainPassword Contraseña en texto plano a verificar.
    // @param hashedPassword Hash almacenado contra el que se verifica.
    // @return true si la contraseña coincide, false en caso contrario.
    public boolean verify(String plainPassword, String hashedPassword) {
        return encoder.matches(plainPassword, hashedPassword);
    }
}
