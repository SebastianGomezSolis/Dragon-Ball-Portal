package com.sistema.dragonballportalbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContribucionRequest {
    private String tipo;
    private String titulo;
    private String contenidoHtml;
}
