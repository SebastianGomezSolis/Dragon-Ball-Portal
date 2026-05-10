package com.sistema.dragonballportalbackend.logic.model;

// Enumeración que representa los posibles estados de una contribución en el sistema.
// Define los estados por los que puede pasar una contribución durante su ciclo de vida.
public enum EstadoContribucion {
    // Estado inicial cuando una contribución es enviada pero aún no revisada
    PENDIENTE,
    // Estado cuando una contribución ha sido aprobada por un administrador
    APROBADA,
    // Estado cuando una contribución ha sido rechazada por un administrador
    RECHAZADA
}
