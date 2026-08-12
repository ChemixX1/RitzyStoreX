// Modo temporal para grabar la web sin mostrar informacion comercial sensible.
// Cambiar a false para restaurar todos los textos al terminar el video.
export const VIDEO_CAPTURE_MODE = false;

// Oculta temporalmente solo la palabra "Boost" durante la grabacion.
export const HIDE_BOOST_LABEL = false;

export const getCaptureSafeServiceName = (name) => (
  VIDEO_CAPTURE_MODE || HIDE_BOOST_LABEL ? name.replace(/\s+Boost$/i, '') : name
);
