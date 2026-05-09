package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.RazaRepository;
import com.sistema.dragonballportalbackend.logic.model.Raza;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RazaService {
    @Autowired
    private RazaRepository razaRepository;

    public List<Raza> findAll() {
        List<Raza> lista = new ArrayList<>();
        razaRepository.findAll().forEach(lista::add);
        return lista;
    }

    public List<Raza> findAllPublicadas() {
        return razaRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    public Raza findById(Integer id) {
        return razaRepository.findById(id).orElse(null);
    }

    public List<Raza> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicadas();
        }
        return razaRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    public String guardar(Raza raza) {
        if (raza == null) {
            return "La raza es nula";
        }

        if (raza.getNombre() == null || raza.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (raza.getPublicado() == null) {
            raza.setPublicado(false);
        }
        razaRepository.save(raza);
        return null;
    }
}
