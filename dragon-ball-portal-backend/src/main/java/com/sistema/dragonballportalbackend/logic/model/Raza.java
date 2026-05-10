package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// Entidad JPA que representa una raza en el sistema.
// Mapeada a la tabla "raza" en la base de datos.
@Entity
@Table(name = "raza")
@Getter
@Setter
public class Raza {
    // Identificador único de la raza (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Nombre de la raza (máximo 100 caracteres, no puede ser nulo)
    @Column(nullable = false, length = 100)
    private String nombre;

    // Contenido HTML de la raza (tipo TEXT en la base de datos)
    @Lob
    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    // Indica si la raza está publicada y visible al público (no puede ser nulo)
    @Column(nullable = false)
    private Boolean publicado;

    // Relación muchos a uno con Usuario (el autor de la raza)
    // Carga perezosa (LAZY) para mejorar el rendimiento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
