// Página de inicio que muestra un resumen del contenido disponible.
// Presenta cards de navegación a cada sección y un resumen de publicaciones.
import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { api } from '../services/api';
import { MensajeGlobal, Personaje, Raza, Saga } from '../types';

// Props que acepta el componente InicioPage
interface InicioPageProps {
    // Función para navegar a otras páginas
    onNavegar: (ruta: string) => void;
    // Función para mostrar mensajes globales al usuario
    onMensaje: (msg: MensajeGlobal) => void;
}

// Componente funcional que renderiza la página principal.
// Carga datos de personajes, sagas y razas para mostrar un resumen.
function InicioPage(props: InicioPageProps) {
    // Estados para almacenar los datos de cada categoría
    const [personajes, setPersonajes] = useState<Personaje[]>([]);
    const [sagas, setSagas] = useState<Saga[]>([]);
    const [razas, setRazas] = useState<Raza[]>([]);
    // Estado para controlar el indicador de carga
    const [cargando, setCargando] = useState(true);

    // Efecto que carga los datos al montar el componente
    useEffect(() => {
        // Función asíncrona que carga todos los datos en paralelo
        const cargar = async () => {
            try {
                // Carga personajes, sagas y razas simultáneamente
                const [rp, rs, rr] = await Promise.all([
                    api.getPersonajes(),
                    api.getSagas(),
                    api.getRazas(),
                ]);
                // Almacena solo los primeros 4 elementos de cada categoría
                setPersonajes(rp.slice(0, 4));
                setSagas(rs.slice(0, 4));
                setRazas(rr.slice(0, 4));
            } catch (e: unknown) {
                // Muestra mensaje de error si la carga falla
                props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al cargar datos' });
            } finally {
                // Desactiva el indicador de carga al finalizar (error o éxito)
                setCargando(false);
            }
        };
        // Ejecuta la carga de datos
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Sección de cards de navegación a cada categoría */}
            <section className="container py-5">
                {/* Layout de tres columnas en desktop, una en móvil */}
                <div className="row g-4">
                    {/* Card de Personajes */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 h-100 feature-card">
                            <img src="/images/pages/personajes.png"
                                 className="card-img-top section-card-image"
                                 alt="Personajes" />
                            <div className="card-body">
                                <h3 className="h5 fw-bold">Personajes</h3>
                                <p className="text-secondary mb-3">
                                    Explorá las fichas publicadas con contenido detallado.
                                </p>
                                <button className="btn btn-outline-dark"
                                        type="button"
                                        onClick={() => props.onNavegar('/personajes')}>
                                    Ver personajes
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card de Sagas */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 h-100 feature-card">
                            <img src="/images/pages/sagas.jpg"
                                 className="card-img-top section-card-image"
                                 alt="Sagas" />
                            <div className="card-body">
                                <h3 className="h5 fw-bold">Sagas</h3>
                                <p className="text-secondary mb-3">
                                    Consultá los grandes arcos narrativos de la serie.
                                </p>
                                <button className="btn btn-outline-dark"
                                        type="button"
                                        onClick={() => props.onNavegar('/sagas')}>
                                    Ver sagas
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card de Razas */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 h-100 feature-card">
                            <img src="/images/pages/goku.jpg"
                                 className="card-img-top section-card-image"
                                 alt="Razas" />
                            <div className="card-body">
                                <h3 className="h5 fw-bold">Razas</h3>
                                <p className="text-secondary mb-3">
                                    Descubrí el origen y características de cada raza.
                                </p>
                                <button className="btn btn-outline-dark"
                                        type="button"
                                        onClick={() => props.onNavegar('/razas')}>
                                    Ver razas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de resumen de contenido publicado */}
            <section className="container pb-5">
                <h2 className="fw-bold mb-4">Contenido publicado</h2>
                <h6> Ultimos 5 agregados </h6>
                {/* Muestra indicador de carga mientras obtiene los datos */}
                {cargando ? (
                    <Cargando />
                ) : (
                    /* Layout de tres columnas para mostrar resúmenes */
                    <div className="row g-4">
                        {/* Columna de resumen de personajes */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h5 className="fw-bold text-warning text-uppercase mb-3">Personajes</h5>
                                    <ul className="list-group list-group-flush">
                                        {/* Muestra mensaje si no hay personajes, o la lista */}
                                        {personajes.length === 0
                                            ? <li className="list-group-item px-0 text-secondary">Sin publicados.</li>
                                            : personajes.map(p => (
                                                <li key={p.id} className="list-group-item px-0">{p.nombre}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Columna de resumen de sagas */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h5 className="fw-bold text-warning text-uppercase mb-3">Sagas</h5>
                                    <ul className="list-group list-group-flush">
                                        {sagas.length === 0
                                            ? <li className="list-group-item px-0 text-secondary">Sin publicadas.</li>
                                            : sagas.map(s => (
                                                <li key={s.id} className="list-group-item px-0">{s.nombre}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Columna de resumen de razas */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h5 className="fw-bold text-warning text-uppercase mb-3">Razas</h5>
                                    <ul className="list-group list-group-flush">
                                        {razas.length === 0
                                            ? <li className="list-group-item px-0 text-secondary">Sin publicadas.</li>
                                            : razas.map(r => (
                                                <li key={r.id} className="list-group-item px-0">{r.nombre}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

// Exporta el componente para ser usado en App.tsx
export default InicioPage;
