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
    // Busca todas las contribuciones con un estado específico, ordenadas por fecha de creación ascendente.
    List<Contribucion> findByEstadoOrderByFechaCreacionAsc(EstadoContribucion estado);
    
    // Busca todas las contribuciones de un usuario específico, ordenadas por fecha de creación descendente.
    // Las más recientes aparecen primero.
    List<Contribucion> findByUsuario_IdOrderByFechaCreacionDesc(Integer usuarioId);
    
    // Busca contribuciones de un tipo y estado específicos.
    List<Contribucion> findByTipoAndEstado(String tipo, EstadoContribucion estado);
}
