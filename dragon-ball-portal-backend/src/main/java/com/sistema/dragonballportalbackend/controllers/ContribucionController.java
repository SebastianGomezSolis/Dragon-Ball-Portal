package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.ContribucionRequest;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Contribucion;
import com.sistema.dragonballportalbackend.logic.model.SesionUsuarioBean;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contribuciones")
public class ContribucionController {
    @Autowired private ModeloDatos modeloDatos;
    @Autowired private SesionUsuarioBean sesionUsuarioBean;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody ContribucionRequest request) {
        if (!sesionUsuarioBean.isLogueado()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }

        Contribucion c = new Contribucion();
        c.setTipo(request.getTipo());
        c.setTitulo(request.getTitulo());
        c.setContenidoHtml(request.getContenidoHtml());

        Usuario usuario = new Usuario();
        usuario.setId(sesionUsuarioBean.getId());
        c.setUsuario(usuario);

        String error = modeloDatos.getContribucionService().crearContribucion(c);

        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        return ResponseEntity.ok("Contribución enviada para revisión");
    }

    @GetMapping("/mias")
    public ResponseEntity<?> mias() {
        if (!sesionUsuarioBean.isLogueado()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }
        return ResponseEntity.ok(modeloDatos.getContribucionService().findByUsuarioId(sesionUsuarioBean.getId()));
    }
}
