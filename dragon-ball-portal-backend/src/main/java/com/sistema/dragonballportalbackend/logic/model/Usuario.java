package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// Entidad JPA que representa un usuario en el sistema.
// Mapeada a la tabla "usuario" en la base de datos.
@Entity
@Table(name = "usuario")
@Getter
@Setter
public class Usuario {
    // Identificador único del usuario (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Nombre de usuario para autenticación (único, máximo 100 caracteres, no nulo)
    @Column(nullable = false, unique = true, length = 100)
    private String username;

    // Contraseña hasheada para autenticación (máximo 255 caracteres, no nulo)
    @Column(nullable = false, length = 255)
    private String password;

    // Rol del usuario en el sistema (ADMIN o USER, máximo 20 caracteres, no nulo)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol;

    // Indica si el usuario está activo y puede acceder al sistema (no nulo)
    @Column(nullable = false)
    private Boolean activo;
}
