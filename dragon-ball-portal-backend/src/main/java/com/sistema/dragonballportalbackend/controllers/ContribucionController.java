package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.ContribucionRequest;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Contribucion;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contribuciones")
public class ContribucionController {
    @Autowired private ModeloDatos modeloDatos;

    @Autowired private JwtService jwtService;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody ContribucionRequest request, HttpServletRequest httpRequest) {
        String authHeader = httpRequest.getHeader("Authorization");
        String token = authHeader.substring(7);
        Integer userId = jwtService.obtenerUserId(token);

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
    public ResponseEntity<?> mias(HttpServletRequest httpRequest) {
        String authHeader = httpRequest.getHeader("Authorization");
        String token = authHeader.substring(7);
        Integer userId = jwtService.obtenerUserId(token);
        return ResponseEntity.ok(modeloDatos.getContribucionService().findByUsuarioId(userId));
    }
}
