// Importaciones necesarias para el servicio de API
import { obtenerToken } from './authService';
import { SesionUsuario, Personaje, Saga, Raza, Contribucion, ContribucionRequest } from '../types';

// URL base de la API backend
const BASE = 'http://localhost:8080/api';

// Función genérica para realizar solicitudes HTTP a la API.
// Agrega automáticamente el header de autorización con token JWT si existe una sesión activa.
async function solicitar<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    // Obtiene el token JWT si el usuario tiene una sesión activa
    const token = obtenerToken();

    // Configura los headers base para la solicitud
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(opciones.headers as Record<string, string> || {}),
    };

    // Si hay token, lo agrega como autorización Bearer
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Realiza la solicitud HTTP al backend
    const respuesta = await fetch(`${BASE}${ruta}`, { ...opciones, headers });

    // Obtiene el texto crudo de la respuesta
    const texto = await respuesta.text();
    let datos: unknown = null;

    // Intenta parsear como JSON; si falla, conserva el texto plano
    try {
        datos = texto ? JSON.parse(texto) : null;
    } catch {
        datos = texto;
    }

    // Si la respuesta HTTP no fue exitosa, lanza un error con el mensaje del servidor
    if (!respuesta.ok) {
        const msg = typeof datos === 'string'
            ? datos
            : (datos as any)?.message ?? 'Error en la solicitud';
        throw new Error(msg);
    }

    // Retorna los datos con el tipo genérico correspondiente
    return datos as T;
}

// Objeto que expone todos los métodos disponibles para interactuar con la API backend.
// Cada método está tipado y listo para ser usado desde cualquier componente.
export const api = {
    // ==========================================
    // ENDPOINTS DE AUTENTICACIÓN
    // ==========================================

    // Inicia sesión con username y password, devuelve los datos de sesión del usuario
    login: (cuerpo: { username: string; password: string }) =>
        solicitar<SesionUsuario>('/auth/login', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // Registra un nuevo usuario en el sistema
    register: (cuerpo: { username: string; password: string }) =>
        solicitar<string>('/auth/register', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // ==========================================
    // ENDPOINTS DE CATÁLOGOS PÚBLICOS
    // ==========================================

    // Obtiene personajes, con filtro opcional por nombre
    getPersonajes: (nombre?: string) =>
        solicitar<Personaje[]>(`/personajes${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // Obtiene sagas, con filtro opcional por nombre
    getSagas: (nombre?: string) =>
        solicitar<Saga[]>(`/sagas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // Obtiene razas, con filtro opcional por nombre
    getRazas: (nombre?: string) =>
        solicitar<Raza[]>(`/razas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // ==========================================
    // ENDPOINTS DE CONTRIBUCIONES DE USUARIO
    // ==========================================

    // Crea una nueva contribución (tipo, título y contenido HTML)
    crearContribucion: (cuerpo: ContribucionRequest) =>
        solicitar<string>('/contribuciones', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // Obtiene todas las contribuciones realizadas por el usuario autenticado
    getMisContribuciones: () =>
        solicitar<Contribucion[]>('/contribuciones/mias'),

    // ==========================================
    // ENDPOINTS DE ADMINISTRACIÓN
    // ==========================================

    // Obtiene todas las contribuciones pendientes de revisión (solo administradores)
    getPendientes: () =>
        solicitar<Contribucion[]>('/admin/pendientes'),

    // Aprueba una contribución pendiente (solo administradores)
    aprobar: (id: number, observacionAdmin: string) =>
        solicitar<string>(`/admin/contribuciones/${id}/aprobar`, {
            method: 'POST',
            body: JSON.stringify({ observacionAdmin }),
        }),

    // Rechaza una contribución pendiente (solo administradores)
    rechazar: (id: number, observacionAdmin: string) =>
        solicitar<string>(`/admin/contribuciones/${id}/rechazar`, {
            method: 'POST',
            body: JSON.stringify({ observacionAdmin }),
        }),
};
