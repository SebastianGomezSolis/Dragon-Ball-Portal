package com.sistema.dragonballportalbackend.data;

import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repositorio de Spring Data para operaciones CRUD sobre entidades Usuario.
// Extiende CrudRepository para obtener métodos básicos y agrega consultas personalizadas.
@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    // Busca un usuario por su nombre de usuario (username).
    // @param username Nombre de usuario a buscar
    // @return Optional que contiene el usuario si existe, o empty si no existe
    Optional<Usuario> findByUsername(String username);
    
    // Verifica si existe un usuario con el nombre de usuario especificado.
    // @param username Nombre de usuario a verificar
    // @return true si existe un usuario con ese username, false en caso contrario
    boolean existsByUsername(String username);
}
