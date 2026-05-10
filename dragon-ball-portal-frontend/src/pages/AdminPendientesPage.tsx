// Página administrativa para revisar y moderar contribuciones pendientes.
// Solo accesible para usuarios con rol ADMIN, permite aprobar o rechazar contribuciones.
import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { api } from '../services/api';
import { formatFecha } from '../utils/formatters';
import { Contribucion, MensajeGlobal, SesionUsuario } from '../types';

// Props que acepta el componente AdminPendientesPage
interface AdminPendientesPageProps {
    // Datos de sesión del usuario actual (null si no está logueado)
    sesion: SesionUsuario | null;
    // Función para navegar a otras rutas
    onNavegar: (ruta: string) => void;
    // Función para mostrar mensajes globales al usuario
    onMensaje: (msg: MensajeGlobal) => void;
}

// Componente funcional que renderiza la página de revisión de contribuciones.
// Gestiona la carga de pendientes, selección de contribución y procesamiento de decisiones.
function AdminPendientesPage(props: AdminPendientesPageProps) {
    // Estados para gestionar la lista de pendientes, selección actual y campos del formulario
    const [items, setItems] = useState<Contribucion[]>([]);
    const [seleccionado, setSeleccionado] = useState<Contribucion | null>(null);
    const [observacion, setObservacion] = useState('');
    const [cargando, setCargando] = useState(true);
    // Estado para controlar el indicador durante procesamiento (aprobar/rechazar)
    const [procesando, setProcesando] = useState(false);

    // Función asíncrona que carga las contribuciones pendientes desde la API
    const cargarPendientes = async () => {
        try {
            setCargando(true);
            const datos = await api.getPendientes();
            setItems(datos);
            // Selecciona automáticamente la primera contribución pendiente
            setSeleccionado(datos[0] ?? null);
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al cargar' });
        } finally {
            setCargando(false);
        }
    };

    // Efecto que carga los pendientes al montar, solo si el usuario es admin
    useEffect(() => {
        if (props.sesion?.rol === 'ADMIN') {
            cargarPendientes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sesion]);

    // Verificación de acceso: usuario no logueado
    if (!props.sesion) {
        return (
            <section className="container py-5">
                <div className="alert alert-warning">Debés iniciar sesión.</div>
            </section>
        );
    }

    // Verificación de acceso: usuario logueado pero no es admin
    if (props.sesion.rol !== 'ADMIN') {
        return (
            <section className="container py-5">
                <div className="alert alert-danger">Solo los administradores pueden acceder a esta sección.</div>
                <button type="button" className="btn btn-outline-secondary mt-2"
                        onClick={() => props.onNavegar('/')}>
                    Volver al inicio
                </button>
            </section>
        );
    }

    // Función asíncrona para procesar (aprobar o rechazar) una contribución
    async function procesar(accion: 'aprobar' | 'rechazar') {
        // Sale early si no hay contribución seleccionada
        if (!seleccionado) return;
        setProcesando(true);
        try {
            // Ejecuta la acción correspondiente según el botón presionado
            if (accion === 'aprobar') {
                await api.aprobar(seleccionado.id, observacion);
                props.onMensaje({ tipo: 'success', texto: 'Contribución aprobada correctamente.' });
            } else {
                await api.rechazar(seleccionado.id, observacion);
                props.onMensaje({ tipo: 'success', texto: 'Contribución rechazada.' });
            }
            setObservacion('');
            // Recarga la lista de pendientes después de procesar
            await cargarPendientes();
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al procesar' });
        } finally {
            setProcesando(false);
        }
    }

    return (
        // Contenedor principal de la sección
        <section className="container py-5">
            {/* Encabezado de la página */}
            <h2 className="fw-bold mb-1">Contribuciones pendientes</h2>
            <p className="text-secondary mb-4">
                Revisá y moderá los aportes de los usuarios antes de publicarlos.
            </p>

            {cargando ? (
                <Cargando />
            ) : (
                // Layout de dos columnas: lista de pendientes (5) y panel de revisión (7)
                <div className="row g-4">
                    {/* Lista izquierda: selección de contribuciones pendientes */}
                    <div className="col-lg-5">
                        <div className="list-group shadow-sm">
                            {items.length === 0 && (
                                <div className="list-group-item text-secondary">
                                    No hay contribuciones pendientes por revisar.
                                </div>
                            )}
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`list-group-item list-group-item-action ${seleccionado?.id === item.id ? 'active' : ''}`}
                                    onClick={() => { setSeleccionado(item); setObservacion(''); }}
                                >
                                    <div className="fw-semibold">{item.titulo}</div>
                                    <div className="small">{item.tipo} · {formatFecha(item.fechaCreacion)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Panel derecho: detalle de la contribución seleccionada y acciones */}
                    <div className="col-lg-7">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                {!seleccionado ? (
                                    // Mensaje cuando no hay selección
                                    <div className="text-secondary">
                                        Seleccioná una contribución para revisarla.
                                    </div>
                                ) : (
                                    <>
                                        {/* Encabezado del panel: título y badge */}
                                        <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
                                            <div>
                                                <h4 className="mb-1">{seleccionado.titulo}</h4>
                                                <div className="text-secondary small">
                                                    {seleccionado.tipo} · Usuario #{seleccionado.usuario?.id}
                                                </div>
                                            </div>
                                            <span className="badge text-bg-warning align-self-start">Pendiente</span>
                                        </div>

                                        {/* Contenido HTML de la contribución */}
                                        <div className="detail-html border rounded p-3 bg-light mb-3"
                                             dangerouslySetInnerHTML={{ __html: seleccionado.contenidoHtml ?? '' }} />

                                        {/* Campo para agregar observación del administrador */}
                                        <div className="mb-3">
                                            <label className="form-label">Observación del administrador</label>
                                            <textarea
                                                className="form-control"
                                                rows={3}
                                                value={observacion}
                                                onChange={(e) => setObservacion(e.target.value)}
                                                placeholder="Opcional — se mostrará al usuario."
                                            />
                                        </div>

                                        {/* Botones de acción: aprobar y rechazar */}
                                        <div className="d-flex gap-2">
                                            <button type="button"
                                                    className="btn btn-success"
                                                    disabled={procesando}
                                                    onClick={() => procesar('aprobar')}>
                                                Aprobar
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger"
                                                    disabled={procesando}
                                                    onClick={() => procesar('rechazar')}>
                                                Rechazar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// Exporta el componente para ser usado en App.tsx
export default AdminPendientesPage;
