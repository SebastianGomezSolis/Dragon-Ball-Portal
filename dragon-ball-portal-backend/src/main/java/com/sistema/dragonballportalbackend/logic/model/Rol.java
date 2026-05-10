package com.sistema.dragonballportalbackend.logic.model;

// Enumeración que define los roles disponibles en el sistema.
// Cada rol determina el nivel de acceso y permisos del usuario.
public enum Rol {
    // Rol de administrador: tiene acceso completo al sistema,
    // puede aprobar o rechazar contribuciones de otros usuarios.
    ADMIN,
    // Rol de usuario regular: puede crear contribuciones y ver su propio historial,
    // pero no tiene permisos de administración.
    USER
}
