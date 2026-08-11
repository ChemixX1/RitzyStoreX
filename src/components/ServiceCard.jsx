import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Star, X } from 'lucide-react';
import BrandIcon from './BrandIcon';
import '../styles/ServiceCard.css';

const ratings = ['5.0', '4.9', '5.0', '4.8', '4.9', '5.0', '4.9'];

export default function ServiceCard({ service }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(service.options[0] ?? null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const dialogTitleId = `service-title-${service.id}`;

  useEffect(() => {
    if (!service.videoSrc || !cardRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px 0px' },
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [service.videoSrc]);

  useEffect(() => {
    if (!videoRef.current || !shouldLoadVideo) return;
    if (isPreviewing) {
      videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
    }
  }, [isPreviewing, shouldLoadVideo]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', closeOnEscape);
    }
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const openDetails = () => {
    setSelectedOption(service.options[0] ?? null);
    setShouldLoadVideo(true);
    setOpen(true);
  };

  const startPreview = () => {
    if (!service.videoSrc) return;
    setShouldLoadVideo(true);
    setIsPreviewing(true);
  };

  const stopPreview = () => setIsPreviewing(false);

  const getMessage = () => {
    const selection = selectedOption
      ? `${service.name} — ${selectedOption.label} (${selectedOption.price})`
      : service.name;
    return `Hola RitzyStoreX. Estoy interesado en ${selection}. ¿Podrías brindarme más información?`;
  };

  const handleBuyWhatsApp = () => {
    window.open(`https://wa.me/51955422937?text=${encodeURIComponent(getMessage())}`, '_blank', 'noopener,noreferrer');
  };

  const handleBuyTelegram = () => {
    window.open(`https://t.me/Ritzytoe?text=${encodeURIComponent(getMessage())}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <article
        ref={cardRef}
        className="service-card"
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
      >
        <button className="service-card-trigger" type="button" onClick={openDetails}>
          <span className="card-media">
            <img
              src={service.logo}
              alt=""
              className="card-logo"
              width="420"
              height="260"
              loading="lazy"
              decoding="async"
            />
            {service.videoSrc && shouldLoadVideo && (
              <video
                ref={videoRef}
                src={service.videoSrc}
                className={`card-video ${videoReady && isPreviewing ? 'card-video--visible' : ''}`}
                muted
                loop
                playsInline
                preload="metadata"
                poster={service.logo}
                onCanPlay={() => setVideoReady(true)}
              />
            )}
            <span className="card-category">{service.category}</span>
            <span className="card-open-icon" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </span>

          <span className="card-details">
            <span className="card-title-row">
              <span className="card-title">{service.name}</span>
              <span className="card-rating"><Star size={13} fill="currentColor" /> {ratings[service.id % ratings.length]}</span>
            </span>
            <span className="card-price"><small>Desde</small> {service.priceStart}</span>
          </span>
        </button>
      </article>

      {open && createPortal(
        <div className="modal-overlay" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close-btn" type="button" aria-label="Cerrar detalles" onClick={() => setOpen(false)} autoFocus>
              <X size={20} />
            </button>

            <div className="modal-preview">
              {service.videoSrc ? (
                <video
                  src={service.videoSrc}
                  className="modal-media"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={service.logo}
                />
              ) : (
                <img src={service.logo} alt={service.name} className="modal-media" width="520" height="520" />
              )}
              <div className="modal-preview-shade" />
              <span className="modal-category">{service.category}</span>
            </div>

            <div className="modal-content">
              <div>
                <h2 id={dialogTitleId}>{service.name}</h2>
                <p className="modal-description">{service.description}</p>
              </div>

              <div className="modal-options" aria-label="Opciones disponibles">
                <p>Selecciona una opción</p>
                {service.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={selectedOption?.label === option.label ? 'selected' : ''}
                    aria-pressed={selectedOption?.label === option.label}
                    onClick={() => setSelectedOption(option)}
                  >
                    <span>{option.label}</span>
                    <strong>{option.price}</strong>
                  </button>
                ))}
              </div>

              <div className="purchase-area">
                <p>Consulta y compra por tu canal preferido</p>
                <div className="purchase-actions">
                  <button type="button" className="purchase-channel-button purchase-channel-button--whatsapp" onClick={handleBuyWhatsApp}>
                    <BrandIcon name="whatsapp" className="purchase-brand-logo" />
                    <span>WhatsApp</span>
                  </button>
                  <button type="button" className="purchase-channel-button purchase-channel-button--telegram" onClick={handleBuyTelegram} aria-label="Comprar por Telegram">
                    <BrandIcon name="telegram" className="purchase-brand-logo" />
                    <span>Telegram</span>
                  </button>
                  <a className="purchase-channel-button purchase-channel-button--facebook" href="https://www.facebook.com/darktoe" target="_blank" rel="noopener noreferrer" aria-label="Contactar por Facebook">
                    <BrandIcon name="facebook" className="purchase-brand-logo" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
