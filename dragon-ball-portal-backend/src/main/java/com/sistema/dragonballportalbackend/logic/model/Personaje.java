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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 100)
    private String raza;

    @Column(length = 100)
    private String saga;

    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;

    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    @Column(nullable = false)
    private Boolean publicado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
