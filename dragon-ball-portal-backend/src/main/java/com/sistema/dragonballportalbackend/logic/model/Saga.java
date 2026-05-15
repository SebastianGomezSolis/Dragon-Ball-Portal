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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "contenido_html", columnDefinition = "TEXT")
    private String contenidoHtml;

    @Column(nullable = false)
    private Boolean publicado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id")
    private Usuario autor;
}
