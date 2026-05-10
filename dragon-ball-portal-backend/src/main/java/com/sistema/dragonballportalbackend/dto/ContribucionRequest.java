package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para la solicitud de creación de contribución.
// Contiene los datos necesarios para crear una nueva contribución al portal.
@Getter
@Setter
public class ContribucionRequest {
    // Tipo de contribución (ej: teoría, fanart, fanfic, etc.)
    private String tipo;
    
    // Título de la contribución
    private String titulo;
    
    // Contenido HTML de la contribución
    private String contenidoHtml;
}
