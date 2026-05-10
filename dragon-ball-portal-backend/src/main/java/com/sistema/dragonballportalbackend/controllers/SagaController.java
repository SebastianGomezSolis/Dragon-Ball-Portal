package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador REST para manejar operaciones relacionadas con sagas de Dragon Ball.
// Proporciona endpoints públicos para consultar sagas y filtrar por nombre.
@RestController
@RequestMapping("/api/sagas")
public class SagaController {
    // Modelo de datos centralizado que inyecta todos los servicios de la aplicación.
    // Permite acceder a los servicios de negocio sin acoplamiento directo.
    @Autowired
    private ModeloDatos modeloDatos;

    // Obtiene todas las sagas o filtra por nombre según el parámetro de búsqueda.
    // Si no se proporciona nombre, retorna todas las sagas publicadas.
    // @param nombre - Parámetro opcional para filtrar sagas por nombre (búsqueda parcial).
    // @return Lista de sagas que coinciden con el filtro.
    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getSagaService().buscarPorNombre(nombre));
    }

    // Obtiene los detalles de una saga específica usando su identificador único.
    // @param id - Identificador único de la saga en la base de datos.
    // @return Datos completos de la saga o null si no existe.
    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getSagaService().findById(id));
    }
}
