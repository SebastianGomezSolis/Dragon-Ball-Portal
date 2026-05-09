package com.sistema.dragonballportalbackend.config;

import com.sistema.dragonballportalbackend.data.UsuarioRepository;
import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.logic.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired private UsuarioRepository usuarioRepository;

    @Autowired private UsuarioService usuarioService;

    @Override
    public void run(String... args) {
        if (!usuarioRepository.existsByUsername("admin")) {
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
