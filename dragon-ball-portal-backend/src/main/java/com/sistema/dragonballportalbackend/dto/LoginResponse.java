package com.sistema.dragonballportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

// DTO (Data Transfer Object) que contiene la respuesta de un inicio de sesión exitoso.
// Se envía al cliente después de que el usuario proporciona credenciales válidas.
// Incluye toda la información necesaria para que el cliente maneje la sesión.
@Getter
@AllArgsConstructor
public class LoginResponse {
    // Identificador único del usuario en la base de datos.
    private Integer id;
    // Nombre de usuario para mostrar en la interfaz.
    private String username;
    // Rol del usuario (ADMIN o USER) para controlar permisos en el frontend.
    private String rol;
    // Token JWT que el cliente debe almacenar y enviar en futuras peticiones.
    private String token;
}
