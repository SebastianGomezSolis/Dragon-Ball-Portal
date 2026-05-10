package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Saga;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repositorio de Spring Data para operaciones CRUD sobre entidades Saga.
// Extiende CrudRepository para obtener métodos básicos y agrega consultas personalizadas.
@Repository
public interface SagaRepository extends CrudRepository<Saga, Integer> {
    // Obtiene todas las sagas publicadas ordenadas alfabéticamente por nombre.
    List<Saga> findByPublicadoTrueOrderByNombreAsc();
    
    // Busca sagas por nombre (coincidencia parcial, insensible a mayúsculas) que estén publicadas, ordenadas alfabéticamente por nombre.
    List<Saga> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
