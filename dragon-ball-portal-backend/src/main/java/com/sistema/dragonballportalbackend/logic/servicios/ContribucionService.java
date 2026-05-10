package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.ContribucionRepository;
import com.sistema.dragonballportalbackend.logic.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

// Servicio de negocio para gestionar las contribuciones de usuarios.
// Maneja la creación, revisión y aprobación/rechazo de contribuciones.
// Cada contribución puede crear una entidad (Personaje, Saga o Raza) tras ser aprobada.
@Service
public class ContribucionService {
    // Repositorio para operaciones CRUD sobre Contribucion.
    // Permite consultar y persistir contribuciones en la base de datos.
    @Autowired
    private ContribucionRepository contribucionRepository;

    // Servicio de usuario para verificar la existencia del autor de una contribución.
    @Autowired
    private UsuarioService usuarioService;

    // Servicio de personaje para crear entidades Personaje al aprobar contribuciones.
    @Autowired
    private PersonajeService personajeService;

    // Servicio de saga para crear entidades Saga al aprobar contribuciones.
    @Autowired
    private SagaService sagaService;

    // Servicio de raza para crear entidades Raza al aprobar contribuciones.
    @Autowired
    private RazaService razaService;

    // Recupera todas las contribuciones del sistema sin filtros.
    // @return Lista completa de contribuciones.
    public List<Contribucion> findAll() {
        List<Contribucion> lista = new ArrayList<>();
        contribucionRepository.findAll().forEach(lista::add);
        return lista;
    }

    // Recupera las contribuciones que están pendientes de revisión.
    // Ordenadas por fecha de creación (más antiguas primero) para facilitar revisión.
    public List<Contribucion> findPendientes() {
        return contribucionRepository.findByEstadoOrderByFechaCreacionAsc(EstadoContribucion.PENDIENTE);
    }

    // Recupera todas las contribuciones realizadas por un usuario específico.
    // Ordenadas por fecha de creación descendente (más recientes primero).
    public List<Contribucion> findByUsuarioId(Integer usuarioId) {
        return contribucionRepository.findByUsuario_IdOrderByFechaCreacionDesc(usuarioId);
    }

    // Busca una contribución por su identificador único.
    public Contribucion findById(Integer id) {
        return contribucionRepository.findById(id).orElse(null);
    }

    // Crea una nueva contribución en el sistema.
    // Valida que todos los campos requeridos estén presentes y que el usuario exista.
    // Las contribuciones nuevas se crean con estado PENDIENTE automáticamente.
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

    // Aprueba una contribución pendiente creando la entidad correspondiente.
    // Dependiendo del tipo (PERSONAJE, SAGA o RAZA), crea la entidad adecuada.
    // Actualiza el estado a APROBADA y guarda la observación del administrador.
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

    // Rechaza una contribución pendiente sin crear ninguna entidad.
    // Actualiza el estado a RECHAZADA y guarda la observación del administrador.
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

    // Método privado que crea una entidad Personaje a partir de la contribución aprobada.
    // Configura el personaje como publicado y con el autor de la contribución.
    private void aprobarComoPersonaje(Contribucion contribucion) {
        Personaje personaje = new Personaje();
        personaje.setNombre(contribucion.getTitulo());
        personaje.setContenidoHtml(contribucion.getContenidoHtml());
        personaje.setPublicado(true);
        personaje.setAutor(contribucion.getUsuario());
        personajeService.guardar(personaje);
    }

    // Método privado que crea una entidad Saga a partir de la contribución aprobada.
    // Configura la saga como publicada y con el autor de la contribución.
    private void aprobarComoSaga(Contribucion contribucion) {
        Saga saga = new Saga();
        saga.setNombre(contribucion.getTitulo());
        saga.setContenidoHtml(contribucion.getContenidoHtml());
        saga.setPublicado(true);
        saga.setAutor(contribucion.getUsuario());
        sagaService.guardar(saga);
    }

    // Método privado que crea una entidad Raza a partir de la contribución aprobada.
    // Configura la raza como publicada y con el autor de la contribución.
    private void aprobarComoRaza(Contribucion contribucion) {
        Raza raza = new Raza();
        raza.setNombre(contribucion.getTitulo());
        raza.setContenidoHtml(contribucion.getContenidoHtml());
        raza.setPublicado(true);
        raza.setAutor(contribucion.getUsuario());
        razaService.guardar(raza);
    }
}
