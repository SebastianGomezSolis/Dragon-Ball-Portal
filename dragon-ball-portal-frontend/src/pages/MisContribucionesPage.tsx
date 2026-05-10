// Página que muestra todas las contribuciones enviadas por el usuario autenticado.
// Presenta el estado de cada contribución (pendiente, aprobada, rechazada) y observaciones del admin.
import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { api } from '../services/api';
import { badgeEstado, formatEstado, formatFecha } from '../utils/formatters';
import { Contribucion, MensajeGlobal, SesionUsuario } from '../types';

// Props que acepta el componente MisContribucionesPage
interface MisContribucionesPageProps {
    // Datos de sesión del usuario actual (null si no está logueado)
    sesion: SesionUsuario | null;
    // Función para navegar a otras rutas
    onNavegar: (ruta: string) => void;
    // Función para mostrar mensajes globales al usuario
    onMensaje: (msg: MensajeGlobal) => void;
}

// Componente funcional que renderiza la página de contribuciones del usuario.
// Carga y muestra todas las contribuciones enviadas por el usuario actual.
function MisContribucionesPage(props: MisContribucionesPageProps) {
    // Estado para almacenar la lista de contribuciones del usuario
    const [items, setItems] = useState<Contribucion[]>([]);
    // Estado para controlar el indicador de carga
    const [cargando, setCargando] = useState(true);

    // Efecto que carga las contribuciones cuando hay sesión activa
    useEffect(() => {
        // Sale early si no hay sesión activa
        if (!props.sesion) return;
        const cargar = async () => {
            try {
                // Carga las contribuciones del usuario autenticado
                const datos = await api.getMisContribuciones();
                setItems(datos);
            } catch (e: unknown) {
                // Muestra mensaje de error si la carga falla
                props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al cargar' });
            } finally {
                setCargando(false);
            }
        };
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sesion]);

    // Si el usuario no está logueado, muestra mensaje para iniciar sesión
    if (!props.sesion) {
        return (
            <section className="container py-5">
                <div className="alert alert-warning">
                    Debés iniciar sesión para ver tus contribuciones.
                </div>
                <button type="button" className="btn btn-warning mt-2"
                        onClick={() => props.onNavegar('/login')}>
                    Ir al login
                </button>
            </section>
        );
    }

    return (
        // Contenedor principal de la sección
        <section className="container py-5">
            {/* Encabezado de la página */}
            <h2 className="fw-bold mb-1">Mis contribuciones</h2>
            <p className="text-secondary mb-4">
                Seguimiento de todos los aportes que enviaste al portal.
            </p>

            {/* Renderiza según el estado: carga, sin contribuciones, o lista de items */}
            {cargando ? (
                <Cargando />
            ) : items.length === 0 ? (
                // Mensaje cuando no hay contribuciones, con botón para enviar la primera
                <div className="alert alert-secondary">
                    No has enviado contribuciones todavía.{' '}
                    <button type="button" className="btn btn-link p-0"
                            onClick={() => props.onNavegar('/contribuir')}>
                        Enviá tu primer aporte.
                    </button>
                </div>
            ) : (
                // Layout vertical de cards para cada contribución
                <div className="row g-3">
                    {items.map((item) => (
                        <div className="col-12" key={item.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    {/* Encabezado del card: título, tipo, fecha y badge de estado */}
                                    <div className="d-flex flex-wrap justify-content-between gap-3 mb-2">
                                        <div>
                                            <h5 className="mb-1">{item.titulo}</h5>
                                            <div className="text-secondary small">
                                                {item.tipo} · {formatFecha(item.fechaCreacion)}
                                            </div>
                                        </div>
                                        {/* Badge con el estado de la contribución (color según estado) */}
                                        <span className={`badge text-bg-${badgeEstado(item.estado)} align-self-start`}>
                                            {formatEstado(item.estado)}
                                        </span>
                                    </div>
                                    {/* Observación del administrador */}
                                    <div className="small text-secondary mb-3">
                                        <strong>Observación del admin:</strong>{' '}
                                        {item.observacionAdmin ?? 'Sin observaciones.'}
                                    </div>
                                    {/* Contenido HTML de la contribución */}
                                    <div className="detail-html border-top pt-3"
                                         dangerouslySetInnerHTML={{ __html: item.contenidoHtml ?? '' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

// Exporta el componente para ser usado en App.tsx
export default MisContribucionesPage;
