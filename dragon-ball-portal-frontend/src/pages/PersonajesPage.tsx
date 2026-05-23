import React from 'react';
import CatalogoPage from './CatalogoPage';

interface Item {
    id: number;
    nombre: string;
    contenidoHtml?: string;
    [key: string]: unknown;
}

async function cargarPersonajes(nombre?: string): Promise<Item[]> {
    const url = `http://localhost:8080/api/personajes${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    throw new Error('Error al cargar personajes');
}

function PersonajesPage() {
    return (
        <CatalogoPage
            titulo="Personajes"
            placeholder="Buscar personaje por nombre..."
            badge="Personaje"
            textoVacio="No hay personajes publicados todavía."
            cargarItems={cargarPersonajes}
        />
    );
}

export default PersonajesPage;
