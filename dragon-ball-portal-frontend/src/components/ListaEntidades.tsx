// Componente para mostrar una lista de entidades con capacidad de selección.
// Resalta el elemento actualmente seleccionado y permite filtrar por nombre.
import React from 'react';

// Define la estructura de un item en la lista (debe tener id y nombre)
interface Item {
    // Identificador único del elemento
    id: number;
    // Nombre o título del elemento (se muestra en la lista)
    nombre: string;
    // Permite propiedades adicionales para flexibilidad
    [key: string]: unknown;
}

// Props que acepta el componente ListaEntidades
interface ListaEntidadesProps {
    // Array de elementos a mostrar en la lista
    items: Item[];
    // Elemento actualmente seleccionado (null si no hay selección)
    seleccionado: Item | null;
    // Función callback ejecutada al seleccionar un item
    onSeleccionar: (item: Item) => void;
    // Texto a mostrar cuando no hay elementos (opcional, default: 'Sin resultados.')
    textoVacio?: string;
}

// Componente funcional que renderiza una lista de selección.
// Muestra un mensaje de lista vacía si no hay elementos.
// Resalta el elemento seleccionado con la clase 'active' de Bootstrap.
function ListaEntidades(props: ListaEntidadesProps) {
    // Renderiza mensaje de lista vacía si no hay elementos
    if (props.items.length === 0) {
        return (
            <div className="list-group shadow-sm">
                <div className="list-group-item text-secondary">
                    {props.textoVacio ?? 'Sin resultados.'}
                </div>
            </div>
        );
    }

    // Renderiza la lista de elementos
    return (
        <div className="list-group shadow-sm">
            {/* Mapea cada item a un botón que puede ser seleccionado */}
            {props.items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    // Aplica estilo 'active' si este item está seleccionado
                    className={`list-group-item list-group-item-action ${props.seleccionado?.id === item.id ? 'active' : ''}`}
                    onClick={() => props.onSeleccionar(item)}
                >
                    {/* Muestra el nombre del item en negrita */}
                    <span className="fw-semibold">{item.nombre}</span>
                </button>
            ))}
        </div>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default ListaEntidades;
