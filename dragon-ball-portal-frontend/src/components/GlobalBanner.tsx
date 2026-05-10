// Componente de banner global con diseño más elaborado que incluye botón de acción.
// Muestra contenido diferente según la ruta actual con un diseño en capas (overlay).
import React from 'react';

// Configuración de cada banner (similar a Banner.tsx pero con más elementos)
interface BannerConfig {
  // Texto pequeño superior que indica la categoría
  eyebrow: string;
  // Título principal del banner
  title: string;
  // Descripción más larga de la página
  description: string;
  // Texto del botón call-to-action
  buttonLabel: string;
  // Ruta a la que navega el botón
  buttonRoute: string;
  // Ruta de la imagen del banner
  image: string;
  // Texto alternativo de la imagen
  imageAlt: string;
}

// Mapeo de configuraciones por ruta de la aplicación
const bannerConfig: Record<string, BannerConfig> = {
  // Banner para inicio
  '/': {
    eyebrow: 'Dragon Ball Portal',
    title: 'Tu enciclopedia del universo Dragon Ball.',
    description: 'Consultá personajes, sagas y razas; iniciá sesión para enviar contenido y administrá revisiones desde el panel correspondiente.',
    buttonLabel: 'Explorar personajes',
    buttonRoute: '/personajes',
    image: '/images/pages/inicio.jpg',
    imageAlt: 'Goku Ultra Instinto',
  },
  // Banner para personajes
  '/personajes': {
    eyebrow: 'Personajes',
    title: 'Héroes, villanos y guerreros legendarios.',
    description: 'Revisá fichas publicadas, buscá por nombre y consultá el contenido completo de cada personaje.',
    buttonLabel: 'Ver catálogo',
    buttonRoute: '/personajes',
    image: '/images/pages/personajes.png',
    imageAlt: 'Equipo de personajes de Dragon Ball',
  },
  // Banner para sagas
  '/sagas': {
    eyebrow: 'Sagas',
    title: 'Las historias más importantes de la franquicia.',
    description: 'Recorré las distintas sagas y su contenido publicado dentro del portal.',
    buttonLabel: 'Ver sagas',
    buttonRoute: '/sagas',
    image: '/images/pages/sagas.jpg',
    imageAlt: 'Escena grupal de Dragon Ball',
  },
  // Banner para razas
  '/razas': {
    eyebrow: 'Razas',
    title: 'Descubrí el origen de cada guerrero.',
    description: 'Explorá las razas del universo Dragon Ball y sus características más representativas.',
    buttonLabel: 'Ver razas',
    buttonRoute: '/razas',
    image: '/images/pages/goku.jpg',
    imageAlt: 'Retrato de Goku',
  },
  // Banner para contribuir
  '/contribuir': {
    eyebrow: 'Contribuciones',
    title: 'Agregá nuevo contenido al portal.',
    description: 'Enviá aportes para que los administradores los revise y publique.',
    buttonLabel: 'Mis contribuciones',
    buttonRoute: '/mis-contribuciones',
    image: '/images/pages/contribuir.jpg',
    imageAlt: 'Personajes de Dragon Ball',
  },
  // Banner para mis contribuciones
  '/mis-contribuciones': {
    eyebrow: 'Mi actividad',
    title: 'Seguimiento de tus aportes.',
    description: 'Consultá el estado de cada envío y las observaciones del administrador.',
    buttonLabel: 'Enviar aporte',
    buttonRoute: '/contribuir',
    image: '/images/pages/mis-contribuciones.jpg',
    imageAlt: 'Goku Ultra Instinto',
  },
  // Banner para pendientes (admin)
  '/admin/pendientes': {
    eyebrow: 'Panel administrativo',
    title: 'Revisión y moderación de contribuciones.',
    description: 'Aprobá o rechazá los contenidos pendientes para mantener actualizado el portal.',
    buttonLabel: 'Ver inicio',
    buttonRoute: '/',
    image: '/images/pages/pendientes.jpg',
    imageAlt: 'Saga Dragon Ball',
  },
  // Banner para login
  '/login': {
    eyebrow: 'Acceso',
    title: 'Ingresá al portal.',
    description: 'Autenticáte para enviar contribuciones, revisar tu panel personal o administrar contenido.',
    buttonLabel: 'Volver al inicio',
    buttonRoute: '/',
    image: '/images/pages/login.jpg',
    imageAlt: 'Goku',
  },
};

// Función auxiliar para obtener la configuración según la ruta
// Si no existe configuración para la ruta, retorna la de inicio por defecto
function resolverConfig(ruta: string): BannerConfig {
  return bannerConfig[ruta] ?? bannerConfig['/'];
}

// Props del componente GlobalBanner
interface Props {
  // Ruta actual para determinar qué configuración usar
  route: string;
  // Función para navegar a diferentes rutas
  navigate: (ruta: string) => void;
}

// Componente funcional que renderiza un banner completo con botón de acción.
// Incluye overlay oscuro sobre la imagen de fondo para mejorar legibilidad del texto.
function GlobalBanner({ route, navigate }: Props) {
  // Obtiene la configuración según la ruta actual
  const config = resolverConfig(route);

  return (
    // Sección principal del banner con imagen de fondo
    <section className="global-banner text-white">
      {/* Capa de overlay semitransparente sobre la imagen de fondo */}
      <div className="banner-overlay">
        <div className="container py-5">
          {/* Layout de dos columnas: texto/botón izquierda, imagen derecha */}
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              {/* Texto eyebrow (categoría) */}
              <div className="text-warning fw-semibold text-uppercase mb-2">{config.eyebrow}</div>
              {/* Título principal */}
              <h1 className="display-5 fw-bold mb-3">{config.title}</h1>
              {/* Descripción de la página */}
              <p className="lead mb-4 banner-copy">{config.description}</p>
              {/* Botón call-to-action que navega a la ruta configurada */}
              <button className="btn btn-warning btn-lg fw-semibold" onClick={() => navigate(config.buttonRoute)}>
                {config.buttonLabel}
              </button>
            </div>
            {/* Columna derecha con imagen del banner */}
            <div className="col-lg-5">
              {/* Tarjeta con sombra para la imagen */}
              <div className="banner-image-card shadow-lg">
                <img src={config.image} alt={config.imageAlt} className="img-fluid w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default GlobalBanner;
