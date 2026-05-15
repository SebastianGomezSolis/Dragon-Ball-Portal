// Servicio de autenticación que maneja el almacenamiento local de la sesión del usuario.
// Utiliza sessionStorage para persistir los datos de sesión durante la navegación.
import { SesionUsuario } from '../types';

// Clave utilizada para guardar los datos de sesión en sessionStorage
const CLAVE = 'dbp.sesion';

// Lee y devuelve los datos de la sesión actual desde sessionStorage.
// Si el JSON está corrupto, lo elimina y retorna null.
// @returns SesionUsuario si hay sesión válida, null en caso contrario
export function obtenerSesion(): SesionUsuario | null {
    // Obtiene el valor almacenado como texto plano
    const raw = sessionStorage.getItem(CLAVE);
    if (!raw) return null;

    try {
        // Intenta parsear el JSON y devolverlo tipado
        return JSON.parse(raw) as SesionUsuario;
    } catch {
        // Si el JSON está corrupto, elimina la sesión dañada y devuelve null
        sessionStorage.removeItem(CLAVE);
        return null;
    }
}

// Guarda los datos de sesión en sessionStorage para persistir la autenticación.
// @param datos - Objeto con la información de sesión del usuario
export function guardarSesion(datos: SesionUsuario): void {
    // Convierte el objeto a JSON y lo almacena
    sessionStorage.setItem(CLAVE, JSON.stringify(datos));
}

// Elimina los datos de sesión de sessionStorage, cerrando efectivamente la sesión.
export function limpiarSesion(): void {
    // Remueve la entrada completa del almacenamiento
    sessionStorage.removeItem(CLAVE);
}

// Devuelve únicamente el token JWT de la sesión actual, o null si no hay sesión activa.
// Utilizado por api.ts para agregar el header de autorización en cada solicitud.
// @returns Token JWT o null
export function obtenerToken(): string | null {
    // Obtiene la sesión y extrae solo el token
    return obtenerSesion()?.token ?? null;
}
