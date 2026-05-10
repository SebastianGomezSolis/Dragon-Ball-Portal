package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para la solicitud de decisión administrativa.
// Contiene la observación que un administrador agrega al aprobar o rechazar una contribución.
@Getter
@Setter
public class DecisionRequest {
    // Observación o comentario que el administrador agrega al tomar una decisión
    // sobre una contribución (puede ser null o vacío)
    private String observacionAdmin;
}
