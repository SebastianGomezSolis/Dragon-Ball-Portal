package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/razas")
public class RazaController {
    private final ModeloDatos modeloDatos;

    public RazaController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping
    public ResponseEntity<?> listar(@RequestParam(required = false) String nombre) {
        return ResponseEntity.ok(modeloDatos.getRazaService().buscarPorNombre(nombre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detalle(@PathVariable Integer id) {
        return ResponseEntity.ok(modeloDatos.getRazaService().findById(id));
    }
}
