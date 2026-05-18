// Componente de formulario para buscar entidades por nombre.
// Incluye un campo de texto y un botón para ejecutar la búsqueda.
import React from 'react';

// Props que acepta el componente BuscadorEntidades
interface BuscadorEntidadesProps {
    // Valor actual del campo de texto de búsqueda
    valor: string;
    // Función callback que se ejecuta cuando el usuario escribe en el campo
    onChange: (valor: string) => void;
    // Función callback que se ejecuta al enviar el formulario (submit)
    onBuscar: (e: React.FormEvent) => void;
    // Texto placeholder del campo de texto (opcional, default: 'Buscar...')
    placeholder?: string;
}

// Componente funcional que renderiza un formulario de búsqueda.
// Layout de dos columnas: campo de texto (9 partes) y botón (3 partes).
function BuscadorEntidades(props: BuscadorEntidadesProps) {
    return (
        // Formulario con layout de filas Bootstrap (g-2 para spacing pequeño)
        <form className="row g-2 align-items-center mb-4" onSubmit={props.onBuscar}>
            {/* Columna del campo de texto (ocupa 9 de 12 partes en desktop) */}
            <div className="col-md-9">
                <input
                    type="text"
                    className="form-control"
                    placeholder={props.placeholder ?? 'Buscar...'}
                    value={props.valor}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
            {/* Columna del botón de búsqueda (ocupa 3 de 12 partes en desktop) */}
            <div className="col-md-3 d-grid">
                <button type="submit" className="btn btn-warning fw-semibold">
                    Buscar
                </button>
            </div>
        </form>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default BuscadorEntidades;
