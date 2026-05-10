package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador REST para manejar las operaciones relacionadas con las razas.
// Proporciona endpoints para listar y obtener detalles de razas.
@RestController
@RequestMapping("/api/razas")
public class RazaController {
    // Servicio de modelo que proporciona acceso a los servicios de negocio.
    // Inyectado automáticamente por Spring.
    @Autowired
    private ModeloDatos modeloDatos;

    // Lista todas las razas o filtra por nombre si se proporciona.
    // @param nombre Parámetro opcional para filtrar razas por nombre
    // @return Lista de razas que coinciden con el filtro o todas las disponibles
    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getRazaService().buscarPorNombre(nombre));
    }

    // Obtiene los detalles de una raza específica por su ID.
    // Parametro id: Identificador único de la raza
    // Retorna el objeto raza con los datos solicitados
    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getRazaService().findById(id));
    }
}
