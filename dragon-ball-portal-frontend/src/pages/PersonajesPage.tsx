// Página específica para listar y buscar personajes.
// Reutiliza el componente genérico CatalogoPage configurado para personajes.
import React from 'react';
import CatalogoPage from './CatalogoPage';
import { api } from '../services/api';

// Componente funcional que renderiza la página de personajes.
// Simplemente configura y renderiza el catálogo genérico con parámetros específicos.
function PersonajesPage() {
    return (
        // Componente genérico de catálogo configurado para personajes
        <CatalogoPage
            // Título de la página
            titulo="Personajes"
            // Placeholder del campo de búsqueda
            placeholder="Buscar personaje por nombre..."
            // Texto del badge que aparece junto al título en los detalles
            badge="Personaje"
            // Mensaje cuando no hay personajes publicados
            textoVacio="No hay personajes publicados todavía."
            // Función de la API para cargar la lista de personajes
            cargarItems={api.getPersonajes}
        />
    );
}

// Exporta el componente para ser usado en App.tsx
export default PersonajesPage;
