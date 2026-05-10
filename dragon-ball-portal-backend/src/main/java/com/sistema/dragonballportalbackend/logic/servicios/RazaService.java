package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.RazaRepository;
import com.sistema.dragonballportalbackend.logic.model.Raza;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// Servicio de negocio para gestionar las operaciones relacionadas con las razas.
// Maneja la lógica para buscar, listar, filtrar y guardar datos de razas.
// Implementa el patrón de diseño Service de Spring para separar la lógica de negocio.
@Service
public class RazaService {
    // Repositorio de acceso a datos para la entidad Raza.
    // Permite realizar operaciones CRUD y consultas personalizadas contra la base de datos.
    // Inyección automática de dependencias por parte de Spring.
    @Autowired
    private RazaRepository razaRepository;

    // Recupera todas las razas existentes en el sistema sin filtros.
    // @return Lista completa de todas las raza almacenadas en la base de datos.
    public List<Raza> findAll() {
        List<Raza> lista = new ArrayList<>();
        razaRepository.findAll().forEach(lista::add);
        return lista;
    }

    // Recupera únicamente las razas que han sido marcadas como publicadas.
    // Útil para mostrar solo contenido aprobado al público general.
    // @return Lista de razas publicadas ordenadas alfabéticamente por nombre.
    public List<Raza> findAllPublicadas() {
        return razaRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    // Busca una raza específica usando su identificador único.
    // @param id Identificador primario de la raza a buscar.
    // @return La entidad Raza si existe, o null en caso de no encontrar coincidencias.
    public Raza findById(Integer id) {
        return razaRepository.findById(id).orElse(null);
    }

    // Busca razas cuyo nombre contenga el texto especificado (búsqueda parcial).
    // La búsqueda es insensitive a mayúsculas/minúsculas.
    // Si no se proporciona un nombre o está vacío, retorna todas las razas publicadas.
    // @param nombre Texto a buscar en el nombre de la raza. Puede ser null o vacío.
    // @return Lista de razas que coinciden con el criterio de búsqueda.
    public List<Raza> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicadas();
        }
        return razaRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    // Persiste o actualiza una raza en la base de datos.
    // Realiza validaciones de negocio antes de guardar: verifica que no sea nula
    // y que tenga un nombre válido. Por defecto, las nuevas razas no se publican.
    // @param raza Entidad Raza a guardar o actualizar.
    // @return null si la operación fue exitosa, o un mensaje de error describiendo la falla.
    public String guardar(Raza raza) {
        if (raza == null) {
            return "La raza es nula";
        }

        if (raza.getNombre() == null || raza.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (raza.getPublicado() == null) {
            raza.setPublicado(false);
        }
        razaRepository.save(raza);
        return null;
    }
}
