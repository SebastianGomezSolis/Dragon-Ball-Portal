package com.sistema.dragonballportalbackend.logic;

import com.sistema.dragonballportalbackend.logic.servicios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// Facade que centraliza el acceso a todos los servicios de negocio de la aplicación.
// Proporciona un único punto de entrada para que los controladores accedan a los servicios,
// evitando el acoplamiento directo entre controladores y servicios.
@Component
public class ModeloDatos {
    // Servicios de negocio inyectados automáticamente por Spring.
    // Cada servicio maneja una funcionalidad específica del sistema.
    @Autowired private AuthService authService;
    @Autowired private ContribucionService contribucionService;
    @Autowired private PersonajeService personajeService;
    @Autowired private RazaService razaService;
    @Autowired private SagaService sagaService;
    @Autowired private UsuarioService usuarioService;

    // Getters para acceder a cada servicio desde los controladores.
    // Permiten mantener la estructura de fachada centralizada.
    public AuthService getAuthService() { return authService; }
    public ContribucionService getContribucionService() { return contribucionService; }
    public PersonajeService getPersonajeService() { return personajeService; }
    public RazaService getRazaService() { return razaService; }
    public SagaService getSagaService() { return sagaService; }
    public UsuarioService getUsuarioService() { return usuarioService; }

}
