package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// Entidad JPA que representa una saga en el sistema.
// Mapeada a la tabla "saga" en la base de datos.
@Entity
@Table(name = "saga")
@Getter
@Setter
public class Saga {
    // Identificador único de la saga (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Nombre de la saga (máximo 100 caracteres, no puede ser nulo)
    @Column(nullable = false, length = 100)
    private String nombre;

    // Contenido HTML de la saga (tipo TEXT en la base de datos)
    @Lob
    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    // Indica si la saga está publicada y visible al público (no puede ser nulo)
    @Column(nullable = false)
    private Boolean publicado;

    // Relación muchos a uno con Usuario (el autor de la saga)
    // Carga perezosa (LAZY) para mejorar el rendimiento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
