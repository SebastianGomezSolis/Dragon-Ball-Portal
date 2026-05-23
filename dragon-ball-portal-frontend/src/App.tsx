import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalBanner from './components/GlobalBanner';
import AlertaMensaje from './components/AlertaMensaje';
import ProtectedRoute from './components/ProtectedRoute';
import InicioPage from './pages/InicioPage';
import LoginPage from './pages/LoginPage';
import PersonajesPage from './pages/PersonajesPage';
import SagasPage from './pages/SagasPage';
import RazasPage from './pages/RazasPage';
import ContribuirPage from './pages/ContribuirPage';
import MisContribucionesPage from './pages/MisContribucionesPage';
import AdminPendientesPage from './pages/AdminPendientesPage';

interface MensajeGlobal {
    tipo: 'success' | 'danger';
    texto: string;
}

function AppContent() {
    const [mensaje, setMensaje] = useState<MensajeGlobal | null>(null);

    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            <Header />

            <GlobalBanner />

            <AlertaMensaje mensaje={mensaje} onCerrar={() => setMensaje(null)} />

            <main className="flex-grow-1">
                <Routes>
                    <Route path="/login" element={<LoginPage onMensaje={setMensaje} />} />
                    <Route path="/personajes" element={<PersonajesPage />} />
                    <Route path="/sagas" element={<SagasPage />} />
                    <Route path="/razas" element={<RazasPage />} />
                    <Route path="/" element={<InicioPage onMensaje={setMensaje} />} />

                    <Route path="/contribuir" element={
                        <ProtectedRoute><ContribuirPage onMensaje={setMensaje} /></ProtectedRoute>
                    } />
                    <Route path="/mis-contribuciones" element={
                        <ProtectedRoute><MisContribucionesPage onMensaje={setMensaje} /></ProtectedRoute>
                    } />
                    <Route path="/admin/pendientes" element={
                        <ProtectedRoute rol="ADMIN"><AdminPendientesPage onMensaje={setMensaje} /></ProtectedRoute>
                    } />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
