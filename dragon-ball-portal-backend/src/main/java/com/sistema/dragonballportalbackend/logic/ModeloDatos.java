package com.sistema.dragonballportalbackend.logic;

import com.sistema.dragonballportalbackend.logic.servicios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModeloDatos {
    @Autowired private AuthService authService;
    @Autowired private ContribucionService contribucionService;
    @Autowired private PersonajeService personajeService;
    @Autowired private RazaService razaService;
    @Autowired private SagaService sagaService;
    @Autowired private UsuarioService usuarioService;

    public AuthService getAuthService() { return authService; }
    public ContribucionService getContribucionService() { return contribucionService; }
    public PersonajeService getPersonajeService() { return personajeService; }
    public RazaService getRazaService() { return razaService; }
    public SagaService getSagaService() { return sagaService; }
    public UsuarioService getUsuarioService() { return usuarioService; }

}
