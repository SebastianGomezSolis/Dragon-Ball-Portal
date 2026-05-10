package com.sistema.dragonballportalbackend.logic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

// Entidad JPA que representa una contribución al portal.
// Mapeada a la tabla "contribucion" en la base de datos.
@Entity
@Table(name = "contribucion")
@Getter
@Setter
public class Contribucion {
    // Identificador único de la contribución (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Tipo de contribución (ej: teoría, fanart, fanfic, etc.) - máximo 20 caracteres, no nulo
    @Column(nullable = false, length = 20)
    private String tipo;

    // Título de la contribución - máximo 255 caracteres, no nulo
    @Column(nullable = false, length = 255)
    private String titulo;

    // Contenido HTML de la contribución (tipo TEXT en la base de datos, no nulo)
    @Lob
    @Column(name = "contenido_html", nullable = false, columnDefinition = "TEXT")
    private String contenidoHtml;

    // Estado actual de la contribución (pendiente, aprobada, rechazada, etc.) - máximo 20 caracteres, no nulo
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoContribucion estado;

    // Fecha y hora de creación de la contribución (no nulo)
    @Column(name = "fecha_creacion", nullable = false)
    private Instant fechaCreacion;

    // Observaciones del administrador sobre la contribución (tipo TEXT en la base de datos)
    @Lob
    @Column(name = "observacion_admin", columnDefinition = "TEXT")
    private String observacionAdmin;

    // Relación muchos a uno con Usuario (el usuario que creó la contribución)
    // Carga perezosa (LAZY) para mejorar el rendimiento, no puede ser nulo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
