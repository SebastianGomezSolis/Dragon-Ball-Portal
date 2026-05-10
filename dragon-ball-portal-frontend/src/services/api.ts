// Importaciones necesarias para el servicio de API
import { obtenerToken } from './authService';
import { SesionUsuario, Personaje, Saga, Raza, Contribucion, ContribucionRequest } from '../types';

// URL base de la API backend
const BASE = 'http://localhost:8080/api';

/**
 * Función genérica para realizar solicitudes HTTP a la API
 * Agrega automáticamente el header de autorización con token JWT si existe una sesión activa
 * @param ruta Endpoint de la API a llamar (sin el BASE)
 * @param opciones Opciones de configuración para fetch (method, body, headers, etc.)
 * @returns Promise que resuelve con los datos de la respuesta tipados como T
 */
async function solicitar<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
    // Obtiene el token JWT del almacenamiento local si existe una sesión activa
    const token = obtenerToken();

    // Configura los headers por defecto para la solicitud
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(opciones.headers as Record<string, string> || {}),
    };

    // Agrega el header de autorización si hay un token disponible
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Realiza la solicitud fetch a la API con la configuración especificada
    const respuesta = await fetch(`${BASE}${ruta}`, { ...opciones, headers });

    // Obtiene el texto de la respuesta para manejar tanto JSON como texto plano
    const texto = await respuesta.text();
    let datos: unknown = null;
    try { 
        // Intenta parsear la respuesta como JSON si tiene contenido
        datos = texto ? JSON.parse(texto) : null; 
    } catch { 
        // Si falla el parseo, mantiene el texto como está
        datos = texto; 
    }

    // Si la respuesta no es exitosa (código HTTP fuera del rango 200-299), lanza un error
    if (!respuesta.ok) {
        // Extrae el mensaje de error de la respuesta (puede ser texto o JSON)
        const msg = typeof datos === 'string'
            ? datos
            : (datos as any)?.message ?? 'Error en la solicitud';
        throw new Error(msg);
    }

    // Retorna los datos tipados según el parámetro genérico T
    return datos as T;
}

// Objeto que expone todos los métodos disponibles para interactuar con la API backend
export const api = {
    // ======================
    // ENDPOINTS DE AUTENTICACIÓN
    // ======================
    
    // Inicia sesión con credenciales y devuelve la información de sesión
    // @param cuerpo Objeto con username y password
    // @returns Promesa que resuelve con la información de la sesión de usuario
    login: (cuerpo: { username: string; password: string }) =>
        solicitar<SesionUsuario>('/auth/login', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // Registra un nuevo usuario en el sistema
    // @param cuerpo Objeto con username y password
    // @returns Promesa que resuelve con un mensaje de éxito o error
    register: (cuerpo: { username: string; password: string }) =>
        solicitar<string>('/auth/register', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // ======================
    // ENDPOINTS DE CATÁLOGOS PÚBLICOS
    // ======================
    
    // Obtiene la lista de personajes, opcionalmente filtrada por nombre
    // @param nombre Parámetro opcional para filtrar personajes por nombre (búsqueda parcial)
    // @returns Promesa que resuelve con un array de personajes
    getPersonajes: (nombre?: string) =>
        solicitar<Personaje[]>(`/personajes${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // Obtiene la lista de sagas, opcionalmente filtrada por nombre
    // @param nombre Parámetro opcional para filtrar sagas por nombre (búsqueda parcial)
    // @returns Promesa que resuelve con un array de sagas
    getSagas: (nombre?: string) =>
        solicitar<Saga[]>(`/sagas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // Obtiene la lista de razas, opcionalmente filtrada por nombre
    // @param nombre Parámetro opcional para filtrar razas por nombre (búsqueda parcial)
    // @returns Promesa que resuelve con un array de razas
    getRazas: (nombre?: string) =>
        solicitar<Raza[]>(`/razas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`),

    // ======================
    // ENDPOINTS DE CONTRIBUCIONES DE USUARIO
    // ======================
    
    // Crea una nueva contribución en el sistema
    // @param cuerpo Datos de la contribución a crear (tipo, título, contenido HTML)
    // @returns Promesa que resuelve con un mensaje de éxito o error de validación
    crearContribucion: (cuerpo: ContribucionRequest) =>
        solicitar<string>('/contribuciones', { method: 'POST', body: JSON.stringify(cuerpo) }),

    // Obtiene todas las contribuciones realizadas por el usuario autenticado
    // @returns Promesa que resuelve con un array de contribuciones del usuario
    getMisContribuciones: () =>
        solicitar<Contribucion[]>('/contribuciones/mias'),

    // ======================
    // ENDPOINTS DE ADMINISTRACIÓN
    // ======================
    
    // Obtiene todas las contribuciones pendientes de revisión (solo para administradores)
    // @returns Promesa que resuelve con un array de contribuciones pendientes
    getPendientes: () =>
        solicitar<Contribucion[]>('/admin/pendientes'),

    // Aprueba una contribución específica (solo para administradores)
    // @param id Identificador único de la contribución a aprobar
    // @param observacionAdmin Comentario opcional del administrador sobre la aprobación
    // @returns Promesa que resuelve con un mensaje de éxito o error
    aprobar: (id: number, observacionAdmin: string) =>
        solicitar<string>(`/admin/contribuciones/${id}/aprobar`, {
            method: 'POST',
            body: JSON.stringify({ observacionAdmin }),
        }),

    // Rechaza una contribución específica (solo para administradores)
    // @param id Identificador único de la contribución a rechazar
    // @param observacionAdmin Comentario opcional del administrador sobre el rechazo
    // @returns Promesa que resuelve con un mensaje de éxito o error
    rechazar: (id: number, observacionAdmin: string) =>
        solicitar<string>(`/admin/contribuciones/${id}/rechazar`, {
            method: 'POST',
            body: JSON.stringify({ observacionAdmin }),
        }),
};
