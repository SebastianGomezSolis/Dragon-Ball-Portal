// Componente principal de la aplicación React.
// Maneja la navegación por hash, el estado global de sesión y los mensajes al usuario.
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import AlertaMensaje from './components/AlertaMensaje';
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';
import PersonajesPage from './pages/PersonajesPage';
import SagasPage from './pages/SagasPage';
import RazasPage from './pages/RazasPage';
import ContribuirPage from './pages/ContribuirPage';
import MisContribucionesPage from './pages/MisContribucionesPage';
import AdminPendientesPage from './pages/AdminPendientesPage';
import CompararPage from './pages/CompararPage';
import { obtenerSesion, limpiarSesion } from './services/authService';
import { MensajeGlobal, SesionUsuario } from './types';

// Función auxiliar que extrae la ruta actual desde el hash de la URL.
// Convierte '#/personajes' en '/personajes' para facilitar el enrutamiento.
// @returns La ruta actual formateada (ej: '/personajes')
function obtenerRuta(): string {
    const hash = window.location.hash || '#/';
    const ruta = hash.replace('#', '');
    return ruta.startsWith('/') ? ruta : `/${ruta}`;
}

// Componente principal que engloba toda la aplicación.
// Contiene el layout general (navbar, banner, contenido, footer)
// y gestiona los estados globales de ruta, sesión y mensajes.
function App() {
    // Estado que almacena la ruta actual para saber qué página renderizar
    const [ruta, setRuta] = useState<string>(obtenerRuta);
    // Estado que guarda la información de sesión del usuario autenticado (null si no hay sesión)
    const [sesion, setSesion] = useState<SesionUsuario | null>(obtenerSesion);
    // Estado para mensajes globales (alertas de éxito, error, información)
    const [mensaje, setMensaje] = useState<MensajeGlobal | null>(null);

    // Efecto que escucha cambios en el hash de la URL para actualizar la navegación.
    // Se ejecuta al montar el componente y se limpia al desmontar.
    useEffect(() => {
        const handler = () => setRuta(obtenerRuta());
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    // Función para navegar a una ruta específica cambiando el hash de la URL.
    // @param destino - Ruta a la que navegar (ej: '/personajes')
    function navegar(destino: string) {
        window.location.hash = destino;
    }

    // Maneja el cierre de sesión: limpia los datos, actualiza el estado y redirige al inicio.
    function handleLogout() {
        limpiarSesion();
        setSesion(null);
        setMensaje({ tipo: 'success', texto: 'Sesión cerrada correctamente.' });
        navegar('/');
    }

    // Renderiza el componente de página correspondiente según la ruta actual.
    // Cada página recibe los props necesarios (sesión, navegación, mensajes).
    // @returns El componente JSX de la página activa
    function renderPagina() {
        switch (ruta) {
            case '/login':
                return (
                    <LoginPage
                        onSesion={setSesion}
                        onNavegar={navegar}
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
                        sesion={sesion}
                        onNavegar={navegar}
                        onMensaje={setMensaje}
                    />
                );
            case '/mis-contribuciones':
                return (
                    <MisContribucionesPage
                        sesion={sesion}
                        onNavegar={navegar}
                        onMensaje={setMensaje}
                    />
                );
            case '/admin/pendientes':
                return (
                    <AdminPendientesPage
                        sesion={sesion}
                        onNavegar={navegar}
                        onMensaje={setMensaje}
                    />
                );
            default:
                return (
                    <InicioPage
                        onNavegar={navegar}
                        onMensaje={setMensaje}
                    />
                );
        }
    }

    // Renderiza el layout completo de la aplicación con sus secciones principales
    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            {/* Barra de navegación superior con enlaces según el estado de sesión */}
            <Navbar
                sesion={sesion}
                onNavegar={navegar}
                onLogout={handleLogout}
            />

            {/* Banner hero que muestra el título y descripción de la página actual */}
            <Banner ruta={ruta} />

            {/* Componente de alertas para mostrar mensajes al usuario */}
            <AlertaMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />

            {/* Contenido principal donde se renderiza la página activa */}
            <main className="flex-grow-1">
                {renderPagina()}
            </main>

            {/* Pie de página con información del portal */}
            <Footer />
        </div>
    );
}

// Exporta el componente App como default para ser usado en index.tsx
export default App;
