// Importa el tipo SesionUsuario para tipado fuerte
import { SesionUsuario } from '../types';

// Clave utilizada para almacenar los datos de sesión en sessionStorage
const CLAVE = 'dbp.sesion';

/**
 * Obtiene los datos de la sesión actual desde sessionStorage
 * @returns {SesionUsuario | null} Los datos de la sesión o null si no existe o es inválida
 */
export function obtenerSesion(): SesionUsuario | null {
    // Obtiene el valor almacenado como texto plano
    const raw = sessionStorage.getItem(CLAVE);
    if (!raw) return null;
    try {
        // Intenta parsear el JSON y devolverlo tipado como SesionUsuario
        return JSON.parse(raw) as SesionUsuario;
    } catch {
        // Si hay error al parsear, elimina la sesión corrupta y devuelve null
        sessionStorage.removeItem(CLAVE);
        return null;
    }
}

/**
 * Guarda los datos de sesión en sessionStorage
 * @param {SesionUsuario} datos Información de la sesión a guardar
 */
export function guardarSesion(datos: SesionUsuario): void {
    // Convierte el objeto a JSON y lo almacena en sessionStorage
    sessionStorage.setItem(CLAVE, JSON.stringify(datos));
}

/**
 * Elimina los datos de sesión de sessionStorage (cierra sesión)
 */
export function limpiarSesion(): void {
    // Remueve completamente la sesión de almacenamiento
    sessionStorage.removeItem(CLAVE);
}

/**
 * Obtiene el token JWT de la sesión actual
 * @returns {string | null} El token JWT o null si no hay sesión
 */
export function obtenerToken(): string | null {
    // Obtiene la sesión y devuelve su token si existe, de lo contrario null
    return obtenerSesion()?.token ?? null;
}
