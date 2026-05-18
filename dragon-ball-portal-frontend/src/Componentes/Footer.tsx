// Componente simple que renderiza el pie de página de la aplicación.
// Muestra el nombre del portal centrado con texto blanco sobre fondo oscuro.
import React from 'react';

// Componente funcional que muestra un footer estático.
// No recibe props ya que su contenido es fijo.
function Footer() {
    return (
        // Footer Bootstrap con fondo oscuro, texto blanco y padding vertical
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center small">
                {/* Texto centrado con el nombre de la aplicación */}
                <span>Dragon Ball Portal</span>
            </div>
        </footer>
    );
}

// Exporta el componente para ser usado en App.tsx
export default Footer;
