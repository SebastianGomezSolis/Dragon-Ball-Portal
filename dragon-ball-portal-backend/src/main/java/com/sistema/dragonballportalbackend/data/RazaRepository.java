package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Raza;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RazaRepository extends CrudRepository<Raza, Integer> {
    List<Raza> findByPublicadoTrueOrderByNombreAsc();
    List<Raza> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
