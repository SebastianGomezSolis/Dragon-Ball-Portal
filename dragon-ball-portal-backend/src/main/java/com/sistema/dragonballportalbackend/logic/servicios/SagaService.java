package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.SagaRepository;
import com.sistema.dragonballportalbackend.logic.model.Saga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// Servicio de negocio para gestionar las operaciones relacionadas con las sagas.
// Centraliza la lógica de acceso a datos y validaciones para el manejo de sagas.
// Forma parte de la capa de servicio de la arquitectura de la aplicación.
@Service
public class SagaService {
    // Repositorio que proporciona métodos de acceso a la tabla de sagas en la base de datos.
    // Utilizado para ejecutar consultas y operaciones CRUD sobre la entidad Saga.
    // Inyección automática de Spring para desacoplar la lógica de negocio.
    @Autowired
    private SagaRepository sagaRepository;

    // Recupera el conjunto completo de sagas almacenadas en el sistema.
    // No aplica filtros de estado de publicación.
    public List<Saga> findAll() {
        List<Saga> lista = new ArrayList<>();
        sagaRepository.findAll().forEach(lista::add);
        return lista;
    }

    // Recupera únicamente las sagas que tienen el estado de publicación activo.
    // Ordena los resultados alfabéticamente por nombre para una mejor organización.
    // Ideal para mostrar contenido público verificado a los usuarios.
    public List<Saga> findAllPublicadas() {
        return sagaRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    // Busca una saga específica según su identificador numérico único.
    public Saga findById(Integer id) {
        return sagaRepository.findById(id).orElse(null);
    }

    // Realiza una búsqueda de sagas por nombre con coincidencia parcial.
    // Es sensible a mayúsculas/minúsculas para flexibilidad en la búsqueda.
    // Cuando el parámetro nombre es null o está vacío, retorna todas las sagas publicadas.
    public List<Saga> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicadas();
        }
        return sagaRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    // Persiste una nueva saga o actualiza una existente en la base de datos.
    // Incluye validaciones de negocio: objeto no nulo y nombre obligatorio.
    // Las sagas nuevas se crean con el estado publicado en false por defecto.
    public String guardar(Saga saga) {
        if (saga == null) {
            return "La saga es nula";
        }

        if (saga.getNombre() == null || saga.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (saga.getPublicado() == null) {
            saga.setPublicado(false);
        }
        sagaRepository.save(saga);
        return null;
    }
}
