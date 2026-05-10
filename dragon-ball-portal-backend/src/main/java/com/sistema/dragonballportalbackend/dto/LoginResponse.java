package com.sistema.dragonballportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

// DTO (Data Transfer Object) que contiene la respuesta de un inicio de sesión exitoso.
// Se envía al cliente después de que el usuario proporciona credenciales válidas.
// Incluye toda la información necesaria para que el cliente maneje la sesión.
@Getter
@AllArgsConstructor
public class LoginResponse {
    private Integer id;
    private String username;
    private String rol;
    private String token;
}
