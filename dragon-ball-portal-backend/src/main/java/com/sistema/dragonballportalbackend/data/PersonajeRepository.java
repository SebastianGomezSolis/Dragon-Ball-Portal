package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Personaje;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repositorio de Spring Data para operaciones CRUD sobre entidades Personaje.
// Extiende CrudRepository para obtener métodos básicos y agrega consultas personalizadas.
@Repository
public interface PersonajeRepository extends CrudRepository<Personaje, Integer> {
    // Obtiene todos los personajes publicados ordenados alfabéticamente por nombre.
    List<Personaje> findByPublicadoTrueOrderByNombreAsc();
    
    // Busca personajes por nombre (coincidencia parcial, insensible a mayúsculas) que estén publicados, ordenados alfabéticamente por nombre.
    List<Personaje> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
