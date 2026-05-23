package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.ContribucionRequest;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Contribucion;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contribuciones")
public class ContribucionController {
    private final ModeloDatos modeloDatos;

    public ContribucionController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    private Integer obtenerUserId() {
        Claims claims = (Claims) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return claims.get("id", Integer.class);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody ContribucionRequest request) {
        Integer userId = obtenerUserId();

        Contribucion c = new Contribucion();
        c.setTipo(request.getTipo());
        c.setTitulo(request.getTitulo());
        c.setContenidoHtml(request.getContenidoHtml());
        Usuario usuario = new Usuario();
        usuario.setId(userId);
        c.setUsuario(usuario);

        String error = modeloDatos.getContribucionService().crearContribucion(c);
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        return ResponseEntity.ok("Contribución enviada para revisión");
    }

    @GetMapping("/mias")
    public ResponseEntity<?> mias() {
        Integer userId = obtenerUserId();
        return ResponseEntity.ok(modeloDatos.getContribucionService().findByUsuarioId(userId));
    }
}
