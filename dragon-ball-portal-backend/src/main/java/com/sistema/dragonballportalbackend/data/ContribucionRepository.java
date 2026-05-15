package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Contribucion;
import com.sistema.dragonballportalbackend.logic.model.EstadoContribucion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repositorio de Spring Data para operaciones CRUD sobre entidades Contribucion.
// Extiende CrudRepository para obtener métodos básicos y agrega consultas personalizadas.
@Repository
public interface ContribucionRepository extends CrudRepository<Contribucion, Integer> {
    List<Contribucion> findByEstadoOrderByFechaCreacionAsc(EstadoContribucion estado);
    List<Contribucion> findByUsuario_IdOrderByFechaCreacionDesc(Integer usuarioId);
}
