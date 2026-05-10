package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador REST para manejar las operaciones relacionadas con los personajes.
// Proporciona endpoints para listar y obtener detalles de personajes.
@RestController
@RequestMapping("/api/personajes")
public class PersonajeController {
     
    // Servicio de modelo que proporciona acceso a los servicios de negocio.
    // Inyectado automáticamente por Spring.
    @Autowired
    private ModeloDatos modeloDatos;

    // Lista todos los personajes o filtra por nombre si se proporciona.
    // Parametro nombre: Parámetro opcional para filtrar personajes por nombre
    // Retorna la lista de personajes que coinciden con el filtro o todos los publicados
    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getPersonajeService().buscarPorNombre(nombre));
    }

    // Obtiene los detalles de un personaje específico por su ID.
    // Parametro id: Identificador único del personaje
    // Retorna el objeto personaje con los datos solicitados
    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getPersonajeService().findById(id));
    }
}
