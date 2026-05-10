// Componente genérico para mostrar una lista de elementos seleccionables.
// Renderiza cada item como un botón que ejecuta onSelect al hacer click.
import React from 'react';

// Define la estructura base de un item en la lista (id requerido, resto flexible)
interface Item {
  // Identificador único del elemento (necesario para la key de React)
  id: number;
  // Permite cualquier propiedad adicional para flexibilidad
  [key: string]: unknown;
}

// Props para configurar el componente EntityList
interface Props {
  // Array de elementos a mostrar en la lista
  items: Item[];
  // Nombre del campo que se usará como título (default: 'nombre')
  titleField?: string;
  // Función callback que se ejecuta cuando el usuario selecciona un item
  onSelect: (item: Item) => void;
  // Texto a mostrar cuando la lista está vacía (opcional)
  emptyText?: string;
}

// Componente funcional que renderiza una lista de elementos como botones.
// Cada elemento muestra el valor del campo especificado en titleField.
function EntityList({ items, titleField = 'nombre', onSelect, emptyText }: Props) {
  return (
    // Lista sin estilos de Bootstrap
    <ul className="list-group shadow-sm">
      {/* Muestra texto de lista vacía si no hay elementos */}
      {items.length === 0 && (
        <li className="list-group-item text-secondary">{emptyText}</li>
      )}
      {/* Mapea cada item a un botón cliqueable */}
      {items.map((elemento) => (
        <button
          key={elemento.id}
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(elemento)}
        >
          {/* Muestra el valor del campo título con fallback a string vacío */}
          <div className="fw-semibold">{String(elemento[titleField] ?? '')}</div>
        </button>
      ))}
    </ul>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default EntityList;
