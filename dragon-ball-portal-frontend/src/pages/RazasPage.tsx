// Página específica para listar y buscar razas.
// Reutiliza el componente genérico CatalogoPage configurado para razas.
import React from 'react';
import CatalogoPage from './CatalogoPage';
import { api } from '../services/api';

// Componente funcional que renderiza la página de razas.
// Simplemente configura y renderiza el catálogo genérico con parámetros específicos.
function RazasPage() {
    return (
        // Componente genérico de catálogo configurado para razas
        <CatalogoPage
            // Título de la página
            titulo="Razas"
            // Placeholder del campo de búsqueda
            placeholder="Buscar raza por nombre..."
            // Texto del badge que aparece junto al título en los detalles
            badge="Raza"
            // Mensaje cuando no hay razas publicadas
            textoVacio="No hay razas publicadas todavía."
            // Función de la API para cargar la lista de razas
            cargarItems={api.getRazas}
        />
    );
}

// Exporta el componente para ser usado en App.tsx
export default RazasPage;
