package com.sistema.dragonballportalbackend.security;

import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.SesionUsuarioBean;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Filtro de Servlet que intercepta todas las peticiones HTTP para validar tokens JWT.
// Extiende OncePerRequestFilter para ejecutarse una vez por cada petición.
// Extrae el token del header Authorization, valida su autenticidad y populate el bean de sesión.
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    // Servicio para validar y extraer información de tokens JWT.
    @Autowired
    private JwtService jwtService;

    // Bean de sesión para almacenar los datos del usuario autenticado.
    @Autowired
    private SesionUsuarioBean sesionUsuarioBean;

    // Método principal del filtro que procesa cada petición HTTP.
    // Limpia la sesión anterior, extrae el token del header y actualiza el bean de sesión.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Limpia cualquier sesión anterior antes de procesar la nueva petición.
        // Esto asegura que no haya datos de sesiones anteriores contaminando la actual.
        sesionUsuarioBean.logout();

        // Obtiene el header Authorization de la petición HTTP.
        String authHeader = request.getHeader("Authorization");

        // Verifica si el header existe y comienza con "Bearer " (formato estándar JWT).
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extrae el token JWT eliminando el prefijo "Bearer ".
            String token = authHeader.substring(7);
            
            // Valida el token y si es correcto, extrae los datos del usuario.
            if (jwtService.esValido(token)) {
                Integer id = jwtService.obtenerUserId(token);
                String username = jwtService.obtenerUsername(token);
                Rol rol = jwtService.obtenerRol(token);

                // Actualiza el bean de sesión con los datos del usuario del token.
                sesionUsuarioBean.login(id, username, rol, true);
            }
        }

        // Continúa con la cadena de filtros para que la petición sea procesada normalmente.
        filterChain.doFilter(request, response);
    }
}
