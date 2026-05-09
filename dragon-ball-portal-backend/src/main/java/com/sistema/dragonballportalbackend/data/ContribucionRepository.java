package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Contribucion;
import com.sistema.dragonballportalbackend.logic.model.EstadoContribucion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContribucionRepository extends CrudRepository<Contribucion, Integer> {
    List<Contribucion> findByEstadoOrderByFechaCreacionAsc(EstadoContribucion estado);
    List<Contribucion> findByUsuario_IdOrderByFechaCreacionDesc(Integer usuarioId);
    List<Contribucion> findByTipoAndEstado(String tipo, EstadoContribucion estado);
}
