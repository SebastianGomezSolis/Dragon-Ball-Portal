package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Saga;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SagaRepository extends CrudRepository<Saga, Integer> {
    List<Saga> findByPublicadoTrueOrderByNombreAsc();
    List<Saga> findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(String nombre);
}
