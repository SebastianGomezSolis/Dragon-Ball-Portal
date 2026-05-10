// Componente de panel de búsqueda con campo de texto y botón.
// Versión alternativa de BuscadorEntidades con nombres de props en inglés.
import React from 'react';

// Props para configurar el componente SearchPanel
interface Props {
  // Valor actual del campo de texto
  value: string;
  // Función callback cuando el usuario escribe en el campo
  onChange: (value: string) => void;
  // Función callback al enviar el formulario (submit)
  onSearch: (e: React.FormEvent) => void;
  // Texto placeholder del campo (default: 'Buscar...')
  placeholder?: string;
}

// Componente funcional que renderiza un panel de búsqueda.
// Layout de dos columnas: campo de texto (9 partes) y botón (3 partes).
function SearchPanel({ value, onChange, onSearch, placeholder = 'Buscar...' }: Props) {
  return (
    // Formulario Bootstrap con alineación vertical centrada
    <form className="row g-2 align-items-center mb-4" onSubmit={onSearch}>
      {/* Campo de texto que ocupa 9 de 12 columnas en pantallas medianas */}
      <div className="col-md-9">
        <input
          className="form-control"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      {/* Botón de búsqueda que ocupa 3 de 12 columnas en pantallas medianas */}
      <div className="col-md-3 d-grid">
        <button className="btn btn-warning fw-semibold" type="submit">Buscar</button>
      </div>
    </form>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default SearchPanel;
