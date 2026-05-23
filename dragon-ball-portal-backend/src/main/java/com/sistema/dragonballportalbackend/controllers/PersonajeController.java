package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/personajes")
public class PersonajeController {
    private final ModeloDatos modeloDatos;

    public PersonajeController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getPersonajeService().buscarPorNombre(nombre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getPersonajeService().findById(id));
    }
}
