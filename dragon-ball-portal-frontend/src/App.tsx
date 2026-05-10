// Importaciones necesarias para el componente principal de la aplicación
import React, { useEffect, useState } from 'react';
import './App.css';
// Importación de componentes reutilizables
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import AlertaMensaje from './components/AlertaMensaje';
// Importación de páginas de la aplicación
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';
import PersonajesPage from './pages/PersonajesPage';
import SagasPage from './pages/SagasPage';
import RazasPage from './pages/RazasPage';
import ContribuirPage from './pages/ContribuirPage';
import MisContribucionesPage from './pages/MisContribucionesPage';
import AdminPendientesPage from './pages/AdminPendientesPage';
import CompararPage from './pages/CompararPage';
// Importación de servicios y tipos personalizados
import { obtenerSesion, limpiarSesion } from './services/authService';
import { MensajeGlobal, SesionUsuario } from './types';

// Función auxiliar para obtener la ruta actual desde el hash de la URL
// @returns {string} La ruta actual formateada correctamente
function obtenerRuta(): string {
    const hash = window.location.hash || '#/';
    const ruta = hash.replace('#', '');
    return ruta.startsWith('/') ? ruta : `/${ruta}`;
}

// Componente principal de la aplicación React
// Maneja el estado global de la aplicación (ruta, sesión, mensajes)
// y renderiza las diferentes páginas según la ruta actual
function App() {
    // Estado que almacena la ruta actual de la aplicación
    const [ruta, setRuta] = useState<string>(obtenerRuta);
    // Estado que almacena la información de la sesión del usuario actual
    const [sesion, setSesion] = useState<SesionUsuario | null>(obtenerSesion);
    // Estado que almacena mensajes globales para mostrar al usuario (éxito, error, etc.)
    const [mensaje, setMensaje] = useState<MensajeGlobal | null>(null);

    // Efecto que se ejecuta al montar el componente para escuchar cambios en el hash de la URL
    // Actualiza el estado de la ruta cuando cambia el hash (navegación)
    useEffect(() => {
        const handler = () => setRuta(obtenerRuta());
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    // Función para navegar a una ruta específica cambiando el hash de la URL
    // @param destino {string} La ruta a la que se quiere navegar
    function navegar(destino: string) {
        window.location.hash = destino;
    }

    // Función para cerrar la sesión del usuario actual
    // Limpia los datos de sesión, actualiza el estado y muestra un mensaje de éxito
    function handleLogout() {
        limpiarSesion();
        setSesion(null);
        setMensaje({ tipo: 'success', texto: 'Sesión cerrada correctamente.' });
        navegar('/');
    }

    // Función que renderiza la página correspondiente según la ruta actual
    // @returns {JSX.Element} El componente de página a renderizar
    function renderPagina() {
        switch (ruta) {
            case '/login':
                return (
                    <LoginPage
                        // Callback para actualizar el estado de sesión cuando el usuario inicia sesión
                        onSesion={setSesion}
                        // Callback para navegar a otras páginas
                        onNavegar={navegar}
                        // Callback para mostrar mensajes globales
                        onMensaje={setMensaje}
                    />
                );
            case '/personajes':
                return <PersonajesPage />;
            case '/sagas':
                return <SagasPage />;
            case '/razas':
                return <RazasPage />;
            case '/comparar':
                return <CompararPage />;
            case '/contribuir':
                return (
                    <ContribuirPage
                        // Información de la sesión actual para verificar permisos
                        sesion={sesion}
                        // Callback para navegar a otras páginas
                        onNavegar={navegar}
                        // Callback para mostrar mensajes globales
                        onMensaje={setMensaje}
                    />
                );
            case '/mis-contribuciones':
                return (
                    <MisContribucionesPage
                        // Información de la sesión actual para filtrar contribuciones del usuario
                        sesion={sesion}
                        // Callback para navegar a otras páginas
                        onNavegar={navegar}
                        // Callback para mostrar mensajes globales
                        onMensaje={setMensaje}
                    />
                );
            case '/admin/pendientes':
                return (
                    <AdminPendientesPage
                        // Información de la sesión actual para verificar permisos de administrador
                        sesion={sesion}
                        // Callback para navegar a otras páginas
                        onNavegar={navegar}
                        // Callback para mostrar mensajes globales
                        onMensaje={setMensaje}
                    />
                );
            default:
                return (
                    <InicioPage
                        // Callback para navegar a otras páginas
                        onNavegar={navegar}
                        // Callback para mostrar mensajes globales
                        onMensaje={setMensaje}
                    />
                );
        }
    }

    // Renderiza el componente principal de la aplicación
    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            {/* Barra de navegación que muestra enlaces según el estado de sesión */}
            <Navbar
                sesion={sesion}
                onNavegar={navegar}
                onLogout={handleLogout}
            />

            {/* Banner que muestra el título de la página actual */}
            <Banner ruta={ruta} />

            {/* Componente para mostrar mensajes globales (alertas) */}
            <AlertaMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />

            {/* Contenido principal donde se renderizan las páginas */}
            <main className="flex-grow-1">
                {renderPagina()}
            </main>

            {/* Pie de página de la aplicación */}
            <Footer />
        </div>
    );
}

// Exporta el componente App como default para ser usado en index.tsx
export default App;