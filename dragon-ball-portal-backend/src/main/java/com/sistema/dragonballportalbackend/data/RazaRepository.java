package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Raza;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repositorio de Spring Data para operaciones CRUD sobre entidades Raza.
// Extiende CrudRepository para obtener métodos básicos y agrega consultas personalizadas.
@Repository
public interface RazaRepository extends CrudRepository<Raza, Integer> {
    List<Raza> findByPublicadoTrueOrderByNombreAsc();
    List<Raza> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
