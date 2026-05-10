package com.sistema.dragonballportalbackend.config;

import com.sistema.dragonballportalbackend.data.UsuarioRepository;
import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.logic.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Componente que se ejecuta al iniciar la aplicación para inicializar datos básicos.
// Implementa CommandLineRunner para correr lógica después de que el contexto se cargue.
@Component
public class DataInitializer implements CommandLineRunner {
    // Repositorio de usuarios para verificar existencia y guardar nuevos usuarios.
    // Inyectado automáticamente por Spring.
    @Autowired private UsuarioRepository usuarioRepository;

    // Servicio de usuario para guardar nuevos usuarios en el sistema.
    // Inyectado automáticamente por Spring.
    @Autowired private UsuarioService usuarioService;

    // Método que se ejecuta después de que el contexto de Spring se inicializa.
    // Argumentos de la línea de comandos (no utilizados actualmente)
    @Override
    public void run(String... args) {
        // Verifica si ya existe un usuario con el username "admin"
        if (!usuarioRepository.existsByUsername("admin")) {
            // Crea un nuevo usuario administrador si no existe
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword("1234");
            admin.setRol(Rol.ADMIN);
            admin.setActivo(true);
            usuarioService.guardar(admin);
            System.out.println("Admin creado automáticamente");
        } else {
            System.out.println("Admin ya existe");
        }
    }
}
