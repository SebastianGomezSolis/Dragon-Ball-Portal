package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.DecisionRequest;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.SesionUsuarioBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Controlador REST para operaciones administrativas.
// Proporciona endpoints para gestionar contribuciones pendientes y tomar decisiones.
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    // Servicio de modelo que proporciona acceso a los servicios de negocio.
    // Inyectado automáticamente por Spring.
    @Autowired private ModeloDatos modeloDatos;
    
    // Bean de sesión que mantiene el estado de autenticación y permisos del usuario.
    // Inyectado automáticamente por Spring.
    @Autowired private SesionUsuarioBean sesionUsuarioBean;

    // Endpoint para obtener todas las contribuciones pendientes de revisión.
    // Solo accesible por usuarios con rol de administrador.
    // Retorna la lista de contribuciones pendientes o error de autorización
    @GetMapping("/pendientes")
    public ResponseEntity<?> pendientes() {
        // Verifica si el usuario tiene permisos de administrador
        if (!sesionUsuarioBean.isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado");
        }
        // Devuelve las contribuciones que están pendientes de revisión
        return ResponseEntity.ok(modeloDatos.getContribucionService().findPendientes());
    }

    // Endpoint para aprobar una contribución específica.
    // Parametro id: Identificador de la contribución a aprobar
    // Parametro request: Solicitud que contiene la observación del administrador
    // Retorna el mensaje de éxito o error de validación/autorización
    @PostMapping("/contribuciones/{id}/aprobar")
    public ResponseEntity<?> aprobar(@PathVariable Integer id, @RequestBody DecisionRequest request) {
        // Verifica si el usuario tiene permisos de administrador
        if (!sesionUsuarioBean.isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado");
        }

        // Intenta aprobar la contribución con la observación proporcionada
        String error = modeloDatos.getContribucionService().aprobar(id, request.getObservacionAdmin());

        // Si hubo un error, devuelve una respuesta de bad request
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        // Si fue exitoso, devuelve un mensaje de confirmación
        return ResponseEntity.ok("Contribución aprobada");
    }

    // Endpoint para rechazar una contribución específica.
    // Parametro id: Identificador de la contribución a rechazar
    // Parametro request: Solicitud que contiene la observación del administrador
    // Retorna el mensaje de éxito o error de validación/autorización
    @PostMapping("/contribuciones/{id}/rechazar")
    public ResponseEntity<?> rechazar(@PathVariable Integer id, @RequestBody DecisionRequest request) {
        // Verifica si el usuario tiene permisos de administrador
        if (!sesionUsuarioBean.isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado");
        }
        // Intenta rechazar la contribución con la observación proporcionada
        String error = modeloDatos.getContribucionService().rechazar(id, request.getObservacionAdmin());

        // Si hubo un error, devuelve una respuesta de bad request
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        // Si fue exitoso, devuelve un mensaje de confirmación
        return ResponseEntity.ok("Contribución rechazada");
    }
}
