// ── Auth / Sesión ────────────────────────────────────────────────────────────

// Tipo que representa los roles disponibles en el sistema.
// ADMIN: puede aprobar/rechazar contribuciones y acceder al panel de administración.
// USER: puede crear contribuciones y ver su historial.
export type Rol = 'ADMIN' | 'USER';

// Interfaz que representa los datos de la sesión del usuario actual.
// Almacena la información devuelta por el backend tras un login exitoso.
export interface SesionUsuario {
  // Identificador único del usuario en la base de datos.
  id: number;
  // Nombre de usuario para mostrar en la interfaz.
  username: string;
  // Rol del usuario para controlar permisos de acceso.
  rol: Rol;
  // Token JWT que debe enviarse en las peticiones autenticadas.
  token: string;
}

// ── Entidades ────────────────────────────────────────────────────────────────

// Interfaz que representa un personaje de Dragon Ball en el sistema.
// Los personajes pueden ser creados por usuarios y aprobados por administradores.
export interface Personaje {
  // Identificador único del personaje en la base de datos.
  id: number;
  // Nombre del personaje (ej: Goku, Vegeta, etc.).
  nombre: string;
  // Contenido HTML con la información detallada del personaje.
  contenidoHtml: string;
  // URL opcional de la imagen del personaje (actualmente no usado en backend).
  imagenUrl?: string;
  // Indica si el personaje está publicado y visible para todos los usuarios.
  publicado: boolean;
  // Permite acceder dinámicamente a propiedades adicionales (flexibilidad de datos).
  [key: string]: unknown;
}

// Interfaz que representa una saga de Dragon Ball en el sistema.
// Cada saga agrupa contenido relacionado temporalmente en la historia.
export interface Saga {
  // Identificador único de la saga en la base de datos.
  id: number;
  // Nombre de la saga (ej: Saga de Cell, Saga de Buu, etc.).
  nombre: string;
  // Contenido HTML con la información detallada de la saga.
  contenidoHtml: string;
  // Indica si la saga está publicada y visible para todos los usuarios.
  publicado: boolean;
  // Permite acceder dinámicamente a propiedades adicionales (flexibilidad de datos).
  [key: string]: unknown;
}

// Interfaz que representa una raza de Dragon Ball en el sistema.
// Las razas definen las especies de los personajes (Saiyan, Namekiano, etc.).
export interface Raza {
  // Identificador único de la raza en la base de datos.
  id: number;
  // Nombre de la raza (ej: Saiyan, Namekiano, Terrícola, etc.).
  nombre: string;
  // Contenido HTML con la información detallada de la raza.
  contenidoHtml: string;
  // Indica si la raza está publicada y visible para todos los usuarios.
  publicado: boolean;
  // Permite acceder dinámicamente a propiedades adicionales (flexibilidad de datos).
  [key: string]: unknown;
}

// ── Contribuciones ───────────────────────────────────────────────────────────

// Tipo que representa los estados posibles de una contribución.
// PENDIENTE: recién creada, esperando revisión de un administrador.
// APROBADA: revisada y aceptada, crea la entidad correspondiente.
// RECHAZADA: revisada y denegada, no se crea ninguna entidad.
export type EstadoContribucion = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

// Interfaz que representa una contribución enviada por un usuario.
// Puede ser una teoría, fanart, fanfic u otra creación sobre Dragon Ball.
export interface Contribucion {
  // Identificador único de la contribución en la base de datos.
  id: number;
  // Tipo de contribución (ej: teoría, fanart, fanfic, etc.).
  tipo: string;
  // Título de la contribución proporcionado por el usuario.
  titulo: string;
  // Contenido HTML de la contribución (descripción, imágenes, etc.).
  contenidoHtml: string;
  // Estado actual de la contribución en el sistema de revisión.
  estado: EstadoContribucion;
  // Observación opcional del administrador al aprobar/rechazar.
  observacionAdmin?: string;
  // Fecha y hora en formato ISO cuando se creó la contribución.
  fechaCreacion: string;
  // Usuario que creó la contribución (puede no incluirse en algunas respuestas).
  usuario?: { id: number; username?: string };
}

// Interfaz que define la estructura del cuerpo de la petición para crear una contribución.
export interface ContribucionRequest {
  // Tipo de contenido que está enviando (ej: PERSONAJE, SAGA, RAZA).
  tipo: string;
  // Título descriptivo de la contribución.
  titulo: string;
  // Contenido en formato HTML que será revisado por un administrador.
  contenidoHtml: string;
}

// ── Mensajes globales ────────────────────────────────────────────────────────

// Interfaz para mostrar mensajes temporales en la interfaz (alertas, notificaciones).
export interface MensajeGlobal {
  // Tipo de mensaje que determina el estilo visual de la alerta.
  // success: mensaje verde de operación exitosa.
  // danger: mensaje rojo de error o peligro.
  tipo: 'success' | 'danger';
  // Texto del mensaje que se mostrará al usuario.
  texto: string;
}
