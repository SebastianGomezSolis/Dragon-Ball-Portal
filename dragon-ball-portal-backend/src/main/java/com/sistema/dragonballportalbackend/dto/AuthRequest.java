package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para la solicitud de autenticación.
// Contiene las credenciales necesarias para iniciar sesión.
@Getter
@Setter
public class AuthRequest {
    // Nombre de usuario o email para autenticación
    private String username;
    
    // Contraseña para autenticación
    private String password;
}
