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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Lob
    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    @Column(nullable = false)
    private Boolean publicado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
