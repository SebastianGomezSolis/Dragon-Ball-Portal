// Componente genérico de catálogo reutilizable para personajes, sagas y razas.
// Permite buscar por nombre y mostrar los detalles del elemento seleccionado.
import React, { useEffect, useState } from 'react';
import BuscadorEntidades from '../components/BuscadorEntidades';
import Cargando from '../components/Cargando';
import DetalleEntidad from '../components/DetalleEntidad';
import ListaEntidades from '../components/ListaEntidades';

// Define la estructura base de un item en el catálogo
interface Item {
    // Identificador único del item
    id: number;
    // Nombre del item (se muestra en la lista)
    nombre: string;
    // Contenido HTML con la descripción detallada del item (opcional)
    contenidoHtml?: string;
    // Permite propiedades adicionales para flexibilidad
    [key: string]: unknown;
}

// Props que acepta el componente CatalogoPage
interface CatalogoPageProps {
    // Título de la página que se muestra en el encabezado
    titulo: string;
    // Texto placeholder del campo de búsqueda
    placeholder: string;
    // Texto del badge que aparece junto al título en los detalles
    badge: string;
    // Mensaje a mostrar cuando no hay items publicados
    textoVacio: string;
    // Función asíncrona que carga los items desde la API
    // Acepta un parámetro opcional de nombre para filtrar
    cargarItems: (nombre?: string) => Promise<Item[]>;
}

// Componente funcional que renderiza la página de catálogo genérica.
// Gestiona el estado de búsqueda, items cargados, elemento seleccionado y errores.
function CatalogoPage(props: CatalogoPageProps) {
    // Estado para almacenar el texto de búsqueda actual
    const [busqueda, setBusqueda] = useState('');
    // Estado para almacenar la lista de items cargados desde la API
    const [items, setItems] = useState<Item[]>([]);
    // Estado para almacenar el item actualmente seleccionado
    const [seleccionado, setSeleccionado] = useState<Item | null>(null);
    // Estado para controlar el indicador de carga
    const [cargando, setCargando] = useState(true);
    // Estado para almacenar mensajes de error
    const [error, setError] = useState('');

    // Función asíncrona que carga los items desde la API
    const cargar = async (nombre?: string) => {
        try {
            setCargando(true);
            setError('');
            // Llama a la función de carga proporcionada con el filtro de nombre
            const datos = await props.cargarItems(nombre);
            setItems(datos);
            // Selecciona automáticamente el primer item si existe
            setSeleccionado(datos[0] ?? null);
        } catch (e: unknown) {
            // Almacena el mensaje de error para mostrarlo al usuario
            setError(e instanceof Error ? e.message : 'Error desconocido');
        } finally {
            setCargando(false);
        }
    };

    // Efecto que carga los items iniciales al montar el componente
    useEffect(() => {
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Función que maneja el evento de búsqueda (submit del formulario)
    function handleBuscar(e: React.FormEvent) {
        e.preventDefault();
        cargar(busqueda);
    }

    return (
        // Contenedor principal de la sección de catálogo
        <section className="container py-5">
            {/* Encabezado con título y descripción de la página */}
            <h2 className="fw-bold mb-1">{props.titulo}</h2>
            <p className="text-secondary mb-4">
                Usá el buscador para filtrar por nombre y seleccioná un elemento para ver su detalle.
            </p>

            {/* Componente de búsqueda con campo de texto y botón */}
            <BuscadorEntidades
                valor={busqueda}
                onChange={setBusqueda}
                onBuscar={handleBuscar}
                placeholder={props.placeholder}
            />

            {/* Renderiza según el estado: carga, error, o contenido normal */}
            {cargando ? (
                <Cargando />
            ) : error ? (
                // Muestra alerta de error Bootstrap si hay algún error
                <div className="alert alert-danger">{error}</div>
            ) : (
                // Layout de dos columnas: lista de items (4) y detalle (8)
                <div className="row g-4">
                    {/* Columna izquierda: lista de items seleccionables */}
                    <div className="col-lg-4">
                        <ListaEntidades
                            items={items}
                            seleccionado={seleccionado}
                            onSeleccionar={setSeleccionado}
                            textoVacio={props.textoVacio}
                        />
                    </div>
                    {/* Columna derecha: panel de detalle del item seleccionado */}
                    <div className="col-lg-8">
                        <DetalleEntidad item={seleccionado} badge={props.badge} />
                    </div>
                </div>
            )}
        </section>
    );
}

// Exporta el componente para ser usado por las páginas específicas (PersonajesPage, SagasPage, RazasPage)
export default CatalogoPage;
