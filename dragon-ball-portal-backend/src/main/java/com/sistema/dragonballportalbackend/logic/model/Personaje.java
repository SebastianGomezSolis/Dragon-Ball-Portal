package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// Entidad JPA que representa un personaje en el sistema.
// Mapeada a la tabla "personaje" en la base de datos.
@Entity
@Table(name = "personaje")
@Getter
@Setter
public class Personaje {
    // Identificador único del personaje (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Nombre del personaje (máximo 100 caracteres, no puede ser nulo)
    @Column(nullable = false, length = 100)
    private String nombre;

    // Contenido HTML del personaje (tipo TEXT en la base de datos)
    @Lob
    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    // Indica si el personaje está publicado y visible al público (no puede ser nulo)
    @Column(nullable = false)
    private Boolean publicado;

    // Relación muchos a uno con Usuario (el autor del personaje)
    // Carga perezosa (LAZY) para mejorar el rendimiento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
