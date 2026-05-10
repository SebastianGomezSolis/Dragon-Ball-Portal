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

// Servicio para la generación y validación de tokens JWT (JSON Web Tokens).
// Proporciona métodos para crear tokens seguros, verificar su validez y extraer información.
@Service
public class JwtService {
    // Clave secreta para firmar los tokens, leída desde la configuración de la aplicación.
    @Value("${app.jwt.secret}")
    private String secret;

    // Tiempo de expiración de los tokens en milisegundos, configurable.
    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    // Construye la clave secreta usando el algoritmo HMAC-SHA para firmar tokens.
    // @return Clave en formato SecretKey para usar en operaciones de firma/verificación.
    private SecretKey clave() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Genera un nuevo token JWT firmado con la información del usuario.
    // El token incluye id, username y rol como claims personalizados.
    // @param id Identificador del usuario para incluir en el token.
    // @param username Nombre de usuario para usar como subject del token.
    // @param rol Rol del usuario para incluir como claim.
    // @return Token JWT firmaddo listo para enviar al cliente.
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

    // Analiza y decodifica un token JWT para extraer sus claims.
    // Verifica la firma del token antes de retornar los datos.
    // @param token Token JWT a parsear.
    // @return Claims decodificados del token (id, username, rol, fechas, etc.).
    public Claims parsearClaims(String token) {
        return Jwts.parser()
                .verifyWith(clave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Verifica si un token JWT es válido (firma correcta y no expirado).
    // @param token Token JWT a verificar.
    // @return true si el token es válido, false si está corrupto o expirado.
    public boolean esValido(String token) {
        try {
            parsearClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extrae el nombre de usuario (subject) del token JWT.
    // @param token Token JWT del cual extraer el username.
    // @return Nombre de usuario almacenado en el token.
    public String obtenerUsername(String token) {
        return parsearClaims(token).getSubject();
    }

    // Extrae el identificador de usuario del token JWT.
    // @param token Token JWT del cual extraer el id.
    // @return Id de usuario almacenado en el token.
    public Integer obtenerUserId(String token) {
        return parsearClaims(token).get("id", Integer.class);
    }

    // Extrae el rol del usuario del token JWT.
    // @param token Token JWT del cual extraer el rol.
    // @return Rol del usuario (ADMIN o USER).
    public Rol obtenerRol(String token) {
        return Rol.valueOf(parsearClaims(token).get("rol", String.class));
    }
}
