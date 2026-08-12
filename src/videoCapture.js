// Modo temporal para grabar la web sin mostrar informacion comercial sensible.
// Cambiar a false para restaurar todos los textos al terminar el video.
export const VIDEO_CAPTURE_MODE = false;

export const getCaptureSafeServiceName = (name) => (
  VIDEO_CAPTURE_MODE ? name.replace(/\s+Boost$/i, '') : name
);
