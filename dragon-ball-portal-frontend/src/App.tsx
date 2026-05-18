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

function obtenerRuta(): string {
    return window.location.pathname || '/';
}

function App() {
    const [ruta, setRuta] = useState<string>(obtenerRuta);
    const [sesion, setSesion] = useState<{ id: number; username: string; rol: string; token: string } | null>(obtenerSesion);
    const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

    useEffect(() => {
        const handler = () => setRuta(obtenerRuta());
        window.addEventListener('popstate', handler);
        return () => window.removeEventListener('popstate', handler);
    }, []);

    function navegar(destino: string) {
        window.history.pushState(null, '', destino);
        setRuta(destino);
    }

    function handleLogout() {
        limpiarSesion();
        setSesion(null);
        setMensaje({ tipo: 'success', texto: 'Sesión cerrada correctamente.' });
        navegar('/');
    }

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

    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            <Navbar
                sesion={sesion}
                onNavegar={navegar}
                onLogout={handleLogout}
            />

            <Banner ruta={ruta} />

            <AlertaMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />

            <main className="flex-grow-1">
                {renderPagina()}
            </main>

            <Footer />
        </div>
    );
}

export default App;
