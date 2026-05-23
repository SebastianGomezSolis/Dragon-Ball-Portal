package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.dto.LoginResponse;
import com.sistema.dragonballportalbackend.dto.RegisterRequest;
import com.sistema.dragonballportalbackend.dto.SesionResponse;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final ModeloDatos modeloDatos;
    private final JwtService jwtService;

    public AuthController(ModeloDatos modeloDatos, JwtService jwtService) {
        this.modeloDatos = modeloDatos;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) {
        Usuario usuario = modeloDatos.getAuthService().login(request);
        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
        String token = jwtService.generarToken(usuario.getId(), usuario.getUsername(), usuario.getRol());
        return new LoginResponse(usuario.getId(), usuario.getUsername(), usuario.getRol().name(), token);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        String error = modeloDatos.getUsuarioService().registrar(usuario);
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    @PostMapping("/logout")
    public String logout() {
        return "Sesión cerrada";
    }

    @GetMapping("/sesion")
    public SesionResponse sesion(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No hay sesión activa");
        }
        try {
            String token = authHeader.substring(7);
            var claims = jwtService.parsearClaims(token);
            return new SesionResponse(
                    claims.get("id", Integer.class),
                    claims.getSubject(),
                    claims.get("rol", String.class)
            );
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido");
        }
    }
}
