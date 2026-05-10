package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.PersonajeRepository;
import com.sistema.dragonballportalbackend.logic.model.Personaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// Servicio de negocio para gestionar las operaciones relacionadas con los personajes.
// Implementa la lógica de negocio para buscar, listar y guardar personajes.
@Service
public class PersonajeService {
     
    // Repositorio de personajes para acceder a la capa de persistencia.
    // Inyectado automáticamente por Spring.
    @Autowired
    private PersonajeRepository personajeRepository;

    // Obtiene todos los personajes registrados en el sistema.
    // @return Lista completa de personajes
    public List<Personaje> findAll() {
        List<Personaje> lista = new ArrayList<>();
        personajeRepository.findAll().forEach(lista::add);
        return lista;
    }

    // Obtiene todos los personajes que están marcados como publicados.
    // Los resultados se ordenan alfabéticamente por nombre.
    // @return Lista de personajes publicados ordenados por nombre
    public List<Personaje> findAllPublicados() {
        return personajeRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    // Busca un personaje por su identificador único.
    // @param id Identificador del personaje a buscar
    // @return Objeto personaje si existe, null en caso contrario
    public Personaje findById(Integer id) {
        return personajeRepository.findById(id).orElse(null);
    }

    // Busca personajes por nombre utilizando una coincidencia parcial e insensible a mayúsculas.
    // Si no se proporciona un nombre, devuelve todos los personajes publicados.
    // @param nombre Texto a buscar en el nombre del personaje (puede ser null o vacío)
    // @return Lista de personajes que coinciden con el criterio de búsqueda
    public List<Personaje> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicados();
        }
        return personajeRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    // Guarda o actualiza un personaje en la base de datos.
    // Realiza validaciones básicas antes de guardar.
    // @param personaje Objeto personaje a guardar
    // @return null si la operación fue exitosa, mensaje de error en caso de fallo
    public String guardar(Personaje personaje) {
        if (personaje == null) {
            return "El personaje es nulo";
        }

        if (personaje.getNombre() == null || personaje.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (personaje.getPublicado() == null) {
            personaje.setPublicado(false);
        }
        personajeRepository.save(personaje);
        return null;
    }
}
