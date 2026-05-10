// Importaciones necesarias para el componente
import React from 'react';
import { SesionUsuario } from '../types';
import { formatRol } from '../utils/formatters';

// Props para el componente ElementoNav (elemento individual de navegación)
interface ElementoNavProps {
  // Texto que se muestra en el enlace
  label: string;
  // URL del enlace (en formato hash para SPA)
  href: string;
  // Función opcional que se ejecuta al hacer click en el enlace
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  // Si es true, el enlace se resalta con estilo de administrador
  highlight?: boolean;
}

// Componente auxiliar que renderiza un elemento individual de la lista de navegación.
// Permite reutilizar la estructura de enlace con diferentes estilos según el contexto.
function ElementoNav({ label, href, onClick, highlight = false }: ElementoNavProps) {
  return (
    <li className="nav-item">
      <a
        // Aplica clase especial de destaque si highlight es true (para admin)
        className={`nav-link ${highlight ? 'fw-semibold text-warning' : ''}`}
        href={href}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
}

// Props para el componente Header (barra de navegación completa)
interface Props {
  // Datos de sesión del usuario actual (null si no está logueado)
  session: SesionUsuario | null;
  // Función para navegar a diferentes rutas de la aplicación
  navigate: (ruta: string) => void;
  // Función para cerrar la sesión del usuario
  onLogout: () => void;
}

// Componente de barra de navegación principal de la aplicación.
// Muestra enlaces a todas las secciones y opciones según el estado del usuario.
// Este componente es una versión alternativa del Navbar con estructura modular.
function Header({ session, navigate, onLogout }: Props) {
  // Verifica si el usuario tiene rol de administrador
  const esAdmin = session?.rol === 'ADMIN';
  // Verifica si hay una sesión activa (convierte a booleano)
  const estaLogueado = Boolean(session);

  return (
    // Barra de navegación Bootstrap con fondo oscuro
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* Logo y nombre de la marca clickeable */}
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#/">
          <img src="/images/branding/icon.jpg" alt="Icono Dragon Ball Portal" className="brand-icon rounded-circle" />
          <span>Dragon Ball Portal</span>
        </a>

        {/* Botón hamburguesa para colapsar el menú en móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor del menú que se colapsa en pantallas pequeñas */}
        <div className="collapse navbar-collapse" id="mainMenu">
          {/* Lista de enlaces de navegación usando el componente ElementoNav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <ElementoNav label="Inicio" href="#/" />
            <ElementoNav label="Personajes" href="#/personajes" />
            <ElementoNav label="Sagas" href="#/sagas" />
            <ElementoNav label="Razas" href="#/razas" />
            <ElementoNav label="Comparar" href="#/comparar" />
            {/* Enlaces conditionally renderizados según estado de sesión */}
            {estaLogueado && <ElementoNav label="Contribuir" href="#/contribuir" />}
            {estaLogueado && <ElementoNav label="Mis contribuciones" href="#/mis-contribuciones" />}
            {/* Enlace destacado para administradores */}
            {esAdmin && <ElementoNav label="Pendientes" href="#/admin/pendientes" highlight />}
          </ul>

          {/* Sección derecha: información de usuario o botón de login */}
          <div className="d-flex align-items-center gap-3 text-white small">
            {estaLogueado ? (
              <>
                {/* Muestra nombre y rol del usuario (oculto en móvil) */}
                <div className="text-end d-none d-md-block">
                  <div className="fw-semibold">{session!.username}</div>
                  <div className="text-secondary">{formatRol(session!.rol)}</div>
                </div>
                {/* Botón para cerrar sesión */}
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Cerrar sesión</button>
              </>
            ) : (
              /* Botón para iniciar sesión cuando no hay usuario */
              <button className="btn btn-warning btn-sm fw-semibold" onClick={() => navigate('/login')}>Iniciar sesión</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default Header;
