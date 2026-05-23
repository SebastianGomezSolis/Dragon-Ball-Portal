package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sagas")
public class SagaController {
    private final ModeloDatos modeloDatos;

    public SagaController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getSagaService().buscarPorNombre(nombre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getSagaService().findById(id));
    }
}
