import React from 'react';
import CatalogoPage from './CatalogoPage';

interface Item {
    id: number;
    nombre: string;
    contenidoHtml?: string;
    [key: string]: unknown;
}

async function cargarRazas(nombre?: string): Promise<Item[]> {
    const url = `http://localhost:8080/api/razas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    throw new Error('Error al cargar razas');
}

function RazasPage() {
    return (
        <CatalogoPage
            titulo="Razas"
            placeholder="Buscar raza por nombre..."
            badge="Raza"
            textoVacio="No hay razas publicadas todavía."
            cargarItems={cargarRazas}
        />
    );
}

export default RazasPage;
