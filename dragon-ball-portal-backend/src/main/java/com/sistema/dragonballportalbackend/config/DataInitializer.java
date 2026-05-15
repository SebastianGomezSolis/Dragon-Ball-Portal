package com.sistema.dragonballportalbackend.config;

import com.sistema.dragonballportalbackend.data.UsuarioRepository;
import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.logic.servicios.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Componente que se ejecuta al iniciar la aplicación para inicializar datos básicos.
// Implementa CommandLineRunner para correr lógica después de que el contexto se cargue.
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public DataInitializer(UsuarioRepository usuarioRepository, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
    }

    // Método que se ejecuta después de que el contexto de Spring se inicializa.
    @Override
    public void run(String... args) {
        if (!usuarioRepository.existsByUsername("admin")) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword("Admin123!");
            admin.setRol(Rol.ADMIN);
            admin.setActivo(true);
            usuarioService.guardar(admin);
            log.info("Admin creado automáticamente (user: admin / pass: Admin123!)");
        } else {
            log.info("Admin ya existe");
        }
    }
}
