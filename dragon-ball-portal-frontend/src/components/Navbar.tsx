// Importaciones necesarias para el componente
import React from 'react';
import { SesionUsuario } from '../types';
import { formatRol } from '../utils/formatters';

// Props que acepta el componente Navbar para configurarse dinámicamente
interface NavbarProps {
    // Datos de sesión del usuario actual (null si no está logueado)
    sesion: SesionUsuario | null;
    // Función callback para navegar a diferentes rutas de la aplicación
    onNavegar: (ruta: string) => void;
    // Función callback para cerrar la sesión del usuario
    onLogout: () => void;
}

// Componente de navegación principal de la aplicación.
// Renderiza una barra de navegación con enlaces a todas las secciones.
// Muestra opciones diferentes según el estado de autenticación y rol del usuario.
function Navbar(props: NavbarProps) {
    // Verifica si el usuario tiene rol de administrador
    const esAdmin = props.sesion?.rol === 'ADMIN';
    // Verifica si hay una sesión activa
    const logueado = props.sesion !== null;

    return (
        // Barra de navegación Bootstrap con fondo oscuro y sombra
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">
                {/* Logo y nombre de la marca - clickeable para ir al inicio */}
                <a className="navbar-brand fw-bold d-flex align-items-center gap-2"
                   href="#/"
                   onClick={(e) => { e.preventDefault(); props.onNavegar('/'); }}>
                    {/* Imagen del icono de la marca */}
                    <img src="/images/branding/icon.jpg"
                         alt="Dragon Ball Portal"
                         className="brand-icon rounded-circle" />
                    <span>Dragon Ball Portal</span>
                </a>

                {/* Botón hamburguesa para menú colapsable en móviles */}
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú de navegación que se colapsa en pantallas pequeñas */}
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    {/* Lista de enlaces de navegación */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Enlace a la página de inicio */}
                        <li className="nav-item">
                            <a className="nav-link" href="#/"
                               onClick={(e) => { e.preventDefault(); props.onNavegar('/'); }}>
                                Inicio
                            </a>
                        </li>
                        {/* Enlace a la página de personajes */}
                        <li className="nav-item">
                            <a className="nav-link" href="#/personajes"
                               onClick={(e) => { e.preventDefault(); props.onNavegar('/personajes'); }}>
                                Personajes
                            </a>
                        </li>
                        {/* Enlace a la página de sagas */}
                        <li className="nav-item">
                            <a className="nav-link" href="#/sagas"
                               onClick={(e) => { e.preventDefault(); props.onNavegar('/sagas'); }}>
                                Sagas
                            </a>
                        </li>
                        {/* Enlace a la página de razas */}
                        <li className="nav-item">
                            <a className="nav-link" href="#/razas"
                               onClick={(e) => { e.preventDefault(); props.onNavegar('/razas'); }}>
                                Razas
                            </a>
                        </li>
                        {/* Enlace a la página de comparación */}
                        <li className="nav-item">
                            <a className="nav-link" href="#/comparar"
                               onClick={(e) => { e.preventDefault(); props.onNavegar('/comparar'); }}>
                                Comparar
                            </a>
                        </li>
                        {/* Enlace a contribuir - solo visible si está logueado */}
                        {logueado && (
                            <li className="nav-item">
                                <a className="nav-link" href="#/contribuir"
                                   onClick={(e) => { e.preventDefault(); props.onNavegar('/contribuir'); }}>
                                    Contribuir
                                </a>
                            </li>
                        )}
                        {/* Enlace a mis contribuciones - solo visible si está logueado */}
                        {logueado && (
                            <li className="nav-item">
                                <a className="nav-link" href="#/mis-contribuciones"
                                   onClick={(e) => { e.preventDefault(); props.onNavegar('/mis-contribuciones'); }}>
                                    Mis contribuciones
                                </a>
                            </li>
                        )}
                        {/* Enlace a pendientes - solo visible si es administrador, destacado en amarillo */}
                        {esAdmin && (
                            <li className="nav-item">
                                <a className="nav-link fw-semibold text-warning" href="#/admin/pendientes"
                                   onClick={(e) => { e.preventDefault(); props.onNavegar('/admin/pendientes'); }}>
                                    Pendientes
                                </a>
                            </li>
                        )}
                    </ul>

                    {/* Sección derecha de la barra: información de usuario o botón de login */}
                    <div className="d-flex align-items-center gap-3 text-white small">
                        {logueado ? (
                            <>
                                {/* Muestra nombre de usuario y rol (oculto en móviles) */}
                                <div className="text-end d-none d-md-block">
                                    <div className="fw-semibold">{props.sesion!.username}</div>
                                    <div className="text-secondary">{formatRol(props.sesion!.rol)}</div>
                                </div>
                                {/* Botón para cerrar sesión */}
                                <button className="btn btn-outline-light btn-sm"
                                        type="button"
                                        onClick={props.onLogout}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            /* Botón para iniciar sesión cuando no hay usuario logueado */
                            <button className="btn btn-warning btn-sm fw-semibold"
                                    type="button"
                                    onClick={() => props.onNavegar('/login')}>
                                Iniciar sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Exporta el componente para ser usado en App.tsx
export default Navbar;
