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
    // Útil para filtrar contribuciones pendientes de revisión.
    // @param estado Estado de la contribución a filtrar (PENDIENTE, APROBADA, RECHAZADA)
    // @return Lista de contribuciones con el estado especificado
    List<Contribucion> findByEstadoOrderByFechaCreacionAsc(EstadoContribucion estado);
    
    // Busca todas las contribuciones de un usuario específico, ordenadas por fecha de creación descendente.
    // Las más recientes aparecen primero.
    // @param usuarioId Identificador del usuario cuyas contribuciones se buscan
    // @return Lista de contribuciones del usuario ordenadas por fecha (recientes primero)
    List<Contribucion> findByUsuario_IdOrderByFechaCreacionDesc(Integer usuarioId);
    
    // Busca contribuciones de un tipo y estado específicos.
    // Útil para filtrar contribuciones por tipo (ej: teorías, fanart, fanfic).
    // @param tipo Tipo de contribución a buscar
    // @param estado Estado de la contribución a buscar
    // @return Lista de contribuciones que coinciden con tipo y estado
    List<Contribucion> findByTipoAndEstado(String tipo, EstadoContribucion estado);
}
