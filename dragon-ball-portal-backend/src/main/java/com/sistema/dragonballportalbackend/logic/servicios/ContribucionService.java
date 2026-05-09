package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.ContribucionRepository;
import com.sistema.dragonballportalbackend.logic.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContribucionService {
    @Autowired
    private ContribucionRepository contribucionRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PersonajeService personajeService;

    @Autowired
    private SagaService sagaService;

    @Autowired
    private RazaService razaService;

    public List<Contribucion> findAll() {
        List<Contribucion> lista = new ArrayList<>();
        contribucionRepository.findAll().forEach(lista::add);
        return lista;
    }

    public List<Contribucion> findPendientes() {
        return contribucionRepository.findByEstadoOrderByFechaCreacionAsc(EstadoContribucion.PENDIENTE);
    }

    public List<Contribucion> findByUsuarioId(Integer usuarioId) {
        return contribucionRepository.findByUsuario_IdOrderByFechaCreacionDesc(usuarioId);
    }

    public Contribucion findById(Integer id) {
        return contribucionRepository.findById(id).orElse(null);
    }

    public String crearContribucion(Contribucion contribucion) {
        if (contribucion == null) {
            return "La contribución es nula";
        }

        if (contribucion.getTitulo() == null || contribucion.getTitulo().isBlank()) {
            return "El título es requerido";
        }

        if (contribucion.getTipo() == null || contribucion.getTipo().isBlank()) {
            return "El tipo es requerido";
        }

        if (contribucion.getContenidoHtml() == null || contribucion.getContenidoHtml().isBlank()) {
            return "El contenido es requerido";
        }

        if (contribucion.getUsuario() == null || contribucion.getUsuario().getId() == null) {
            return "El usuario es requerido";
        }

        Usuario usuario = usuarioService.findById(contribucion.getUsuario().getId());
        if (usuario == null) {
            return "El usuario no existe";
        }

        contribucion.setUsuario(usuario);
        contribucion.setEstado(EstadoContribucion.PENDIENTE);
        contribucion.setFechaCreacion(Instant.now());
        contribucionRepository.save(contribucion);
        return null;
    }

    public String aprobar(Integer id, String observacionAdmin) {
        Contribucion contribucion = findById(id);

        if (contribucion == null) {
            return "La contribución no existe";
        }
        if (contribucion.getEstado() != EstadoContribucion.PENDIENTE) {
            return "La contribución ya fue procesada";
        }

        switch (contribucion.getTipo().toUpperCase()) {
            case "PERSONAJE" -> aprobarComoPersonaje(contribucion);
            case "SAGA" -> aprobarComoSaga(contribucion);
            case "RAZA" -> aprobarComoRaza(contribucion);
            default -> { return "Tipo de contribución inválido"; }
        }

        contribucion.setEstado(EstadoContribucion.APROBADA);
        contribucion.setObservacionAdmin(observacionAdmin);
        contribucionRepository.save(contribucion);
        return null;
    }

    public String rechazar(Integer id, String observacionAdmin) {
        Contribucion contribucion = findById(id);

        if (contribucion == null) {
            return "La contribución no existe";
        }

        if (contribucion.getEstado() != EstadoContribucion.PENDIENTE) {
            return "La contribución ya fue procesada";
        }

        contribucion.setEstado(EstadoContribucion.RECHAZADA);
        contribucion.setObservacionAdmin(observacionAdmin);
        contribucionRepository.save(contribucion);
        return null;
    }

    private void aprobarComoPersonaje(Contribucion contribucion) {
        Personaje personaje = new Personaje();
        personaje.setNombre(contribucion.getTitulo());
        personaje.setContenidoHtml(contribucion.getContenidoHtml());
        personaje.setPublicado(true);
        personaje.setAutor(contribucion.getUsuario());
        personajeService.guardar(personaje);
    }

    private void aprobarComoSaga(Contribucion contribucion) {
        Saga saga = new Saga();
        saga.setNombre(contribucion.getTitulo());
        saga.setContenidoHtml(contribucion.getContenidoHtml());
        saga.setPublicado(true);
        saga.setAutor(contribucion.getUsuario());
        sagaService.guardar(saga);
    }

    private void aprobarComoRaza(Contribucion contribucion) {
        Raza raza = new Raza();
        raza.setNombre(contribucion.getTitulo());
        raza.setContenidoHtml(contribucion.getContenidoHtml());
        raza.setPublicado(true);
        raza.setAutor(contribucion.getUsuario());
        razaService.guardar(raza);
    }
}
