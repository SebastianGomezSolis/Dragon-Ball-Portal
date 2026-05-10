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
    // Servicio de modelo que proporciona acceso a los servicios de negocio.
    // Inyectado automáticamente por Spring.
    @Autowired private ModeloDatos modeloDatos;
    
    // Bean de sesión que mantiene el estado de autenticación del usuario.
    // Inyectado automáticamente por Spring.
    @Autowired private SesionUsuarioBean sesionUsuarioBean;

    // Endpoint para crear una nueva contribución.
    // @request: Objeto con los datos de la contribución a crear
    // Retorna el mensaje de éxito o error de validación/autenticación
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody ContribucionRequest request) {
        // Verifica si el usuario está autenticado antes de permitir la creación
        if (!sesionUsuarioBean.isLogueado()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }

        // Crea un nuevo objeto contribución y establece sus propiedades
        Contribucion c = new Contribucion();
        c.setTipo(request.getTipo());
        c.setTitulo(request.getTitulo());
        c.setContenidoHtml(request.getContenidoHtml());

        // Asocia la contribución con el usuario actual
        Usuario usuario = new Usuario();
        usuario.setId(sesionUsuarioBean.getId());
        c.setUsuario(usuario);

        // Intenta guardar la contribución mediante el servicio
        String error = modeloDatos.getContribucionService().crearContribucion(c);

        // Si hubo un error, devuelve una respuesta de bad request
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        // Si fue exitoso, devuelve un mensaje de confirmación
        return ResponseEntity.ok("Contribución enviada para revisión");
    }

    // Endpoint para obtener todas las contribuciones del usuario autenticado.
    // Retorna la lista de contribuciones del usuario o error de autenticación
    @GetMapping("/mias")
    public ResponseEntity<?> mias() {
        // Verifica si el usuario está autenticado antes de permitir el acceso
        if (!sesionUsuarioBean.isLogueado()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }
        // Devuelve las contribuciones asociadas al usuario actual
        return ResponseEntity.ok(modeloDatos.getContribucionService().findByUsuarioId(sesionUsuarioBean.getId()));
    }
}
