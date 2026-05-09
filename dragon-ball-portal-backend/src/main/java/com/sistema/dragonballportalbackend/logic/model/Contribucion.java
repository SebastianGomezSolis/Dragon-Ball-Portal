package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "contribucion")
@Getter
@Setter
public class Contribucion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 20)
    private String tipo;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Lob
    @Column(name = "contenido_html", nullable = false, columnDefinition = "TEXT")
    private String contenidoHtml;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoContribucion estado;

    @Column(name = "fecha_creacion", nullable = false)
    private Instant fechaCreacion;

    @Lob
    @Column(name = "observacion_admin", columnDefinition = "TEXT")
    private String observacionAdmin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
