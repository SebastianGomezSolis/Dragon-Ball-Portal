package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.PersonajeRepository;
import com.sistema.dragonballportalbackend.logic.model.Personaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonajeService {
    @Autowired
    private PersonajeRepository personajeRepository;

    public List<Personaje> findAll() {
        List<Personaje> lista = new ArrayList<>();
        personajeRepository.findAll().forEach(lista::add);
        return lista;
    }

    public List<Personaje> findAllPublicados() {
        return personajeRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    public Personaje findById(Integer id) {
        return personajeRepository.findById(id).orElse(null);
    }

    public List<Personaje> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicados();
        }
        return personajeRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    public String guardar(Personaje personaje) {
        if (personaje == null) {
            return "El personaje es nulo";
        }

        if (personaje.getNombre() == null || personaje.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (personaje.getPublicado() == null) {
            personaje.setPublicado(false);
        }
        personajeRepository.save(personaje);
        return null;
    }
}
