// Componente genérico alternativo para mostrar catálogos de entidades.
// Similar a CatalogoPage pero usa componentes diferentes para el layout.
import React, { useEffect, useState } from 'react';
import DetailCard from '../components/DetailCard';
import EntityList from '../components/EntityList';
import LoadingBlock from '../components/LoadingBlock';
import SearchPanel from '../components/SearchPanel';
import SectionTitle from '../components/SectionTitle';

// Define la estructura base de un item en el catálogo
interface Item {
    // Identificador único del item
    id: number;
    // Permite propiedades adicionales para flexibilidad
    [key: string]: unknown;
}

// Props que acepta el componente EntityCatalogPage
interface Props {
    // Texto eyebrow opcional (categoría superior)
    eyebrow?: string;
    // Título principal de la página
    title: string;
    // Descripción opcional de la página
    description?: string;
    // Placeholder del campo de búsqueda
    placeholder?: string;
    // Función asíncrona para cargar las entidades desde la API
    loadEntities: (nombre?: string) => Promise<Item[]>;
    // Texto cuando no hay entidades
    emptyText?: string;
    // Badge a mostrar en los detalles
    badge?: string;
}

// Componente funcional que renderiza una página de catálogo genérica.
// Versión alternativa de CatalogoPage usando componentes diferentes.
function EntityCatalogPage({ eyebrow, title, description, placeholder, loadEntities, emptyText, badge }: Props) {
    // Estados para gestionar búsqueda, elementos cargados, selección y errores
    const [busqueda, setBusqueda] = useState('');
    const [elementos, setElementos] = useState<Item[]>([]);
    const [seleccionado, setSeleccionado] = useState<Item | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    // Función asíncrona que carga los elementos desde la API
    const cargarElementos = async (nombre: string = '') => {
        try {
            setCargando(true);
            setError('');
            const datos = await loadEntities(nombre);
            setElementos(datos);
            // Selecciona automáticamente el primer elemento si existe
            setSeleccionado(datos[0] ?? null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setCargando(false);
        }
    };

    // Efecto que carga los elementos iniciales al montar
    useEffect(() => {
        cargarElementos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Función que maneja el evento de búsqueda (submit del formulario)
    const manejarBusqueda = (e: React.FormEvent) => {
        e.preventDefault();
        cargarElementos(busqueda);
    };

    return (
        // Contenedor principal de la sección
        <section className="container py-5">
            {/* Fila con título, descripción y panel de búsqueda */}
            <div className="row mb-4">
                <div className="col-12">
                    <SectionTitle eyebrow={eyebrow} title={title} description={description} />
                    <SearchPanel value={busqueda} onChange={setBusqueda} onSearch={manejarBusqueda} placeholder={placeholder} />
                </div>
            </div>

            {/* Renderiza según el estado: carga, error, o contenido */}
            {cargando ? (
                <LoadingBlock />
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                // Layout de dos columnas: lista de items (4) y detalle (8)
                <div className="row g-4">
                    <div className="col-lg-4">
                        <EntityList items={elementos} onSelect={setSeleccionado} emptyText={emptyText} />
                    </div>
                    <div className="col-lg-8">
                        <DetailCard item={seleccionado} badge={badge} />
                    </div>
                </div>
            )}
        </section>
    );
}

// Exporta el componente para uso futuro
export default EntityCatalogPage;
