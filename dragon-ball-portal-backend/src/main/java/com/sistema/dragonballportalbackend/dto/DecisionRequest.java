package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para la solicitud de decisión administrativa.
// Contiene la observación que un administrador agrega al aprobar o rechazar una contribución.
@Getter
@Setter
public class DecisionRequest {
    private String observacionAdmin;
}
