package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para la solicitud de autenticación.
// Contiene las credenciales necesarias para iniciar sesión.
@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
}
