package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Personaje;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonajeRepository extends CrudRepository<Personaje, Integer> {
    List<Personaje> findByPublicadoTrueOrderByNombreAsc();
    List<Personaje> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
