import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/ServiceCard.css";

export default function ServiceCard({ service, isActive, onActivate, onDeactivate }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  useEffect(() => {
    if (open) {
      setSelectedOption(null);
    }
  }, [open]);

  const getRating = (id) => {
    const ratings = ["5.0", "4.9", "5.0", "4.8", "4.9", "5.0", "4.9"];
    return ratings[id % ratings.length];
  };

  const handleBuyWhatsApp = () => {
    const phoneNumber = "51955422937";
    let text;
    
    if (selectedOption) {
      text = `Hola Ritzy! Estoy interesado en adquirir: ${service.name} - ${selectedOption.label}. Espero tu respuesta!`;
    } else {
      text = `Hola Ritzy! Estoy interesado en adquirir el servicio de ${service.name}. Podrias brindarme mas informacion? Gracias!`;
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleBuyTelegram = () => {
    const username = "Ritzytoe";
    let text;
    
    if (selectedOption) {
      text = `Hola Ritzy! 🚀 Estoy interesado en adquirir: ${service.name} - ${selectedOption.label}. ¡Espero tu respuesta! 🙌😎`;
    } else {
      text = `Hola Ritzy! 🚀 Estoy interesado en adquirir el servicio de ${service.name}. ¿Podrías brindarme más información? ¡Gracias! 🙌😎`;
    }
    
    const url = `https://t.me/${username}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        className="card-container"
        onClick={() => setOpen(true)}
        onMouseEnter={onActivate} 
        onMouseLeave={onDeactivate}
        onTouchStart={onActivate} 
      >
        
        <div className="card-media">
          {isActive && service.videoSrc ? (
            <video src={service.videoSrc} className="card-video" autoPlay muted loop playsInline />
          ) : (
            <img src={service.logo} alt={service.name} className="card-logo" />
          )}
        </div>
        <div className="card-info">
          <h3 className="card-title">{service.name}</h3>
          <div className="card-meta">
            <span className="meta-rating">★ {getRating(service.id)}</span>
          </div>
        </div>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-video-header">
              <button className="modal-close-btn" onClick={() => setOpen(false)}>
                <X size={22} color="white" strokeWidth={3} />
              </button>
              <h2 className="modal-title-overlay">{service.name}</h2>
              {service.videoSrc ? (
                 <video src={service.videoSrc} className="modal-hero-media" autoPlay muted loop playsInline />
              ) : (
                 <img src={service.logo} alt={service.name} className="modal-hero-media" />
              )}
              <div className="modal-gradient-overlay"></div>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{service.description}</p>

              <div className="modal-prices">
                {service.options.map((opt, i) => (
                  <div 
                    key={i} 
                    className={`price-row ${selectedOption?.label === opt.label ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    <div className="price-info">
                      <span className="price-label">{opt.label}</span>
                      <span className="price-tag">{opt.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-social-global">

                <p className="social-title">Selecciona tu medio de compra:</p>

                <div className="price-actions">

                  <a 
                    href="https://www.facebook.com/darktoe" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="action-btn fb"
                    title="Facebook"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" 
                      alt="Facebook"
                    />
                  </a>

                  <button 
                    className="action-btn wp"
                    onClick={handleBuyWhatsApp}
                    title="WhatsApp"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                      alt="WhatsApp" 
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>

                  <button 
                    className="action-btn tg"
                    onClick={handleBuyTelegram}
                    title="Telegram"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                      alt="Telegram"
                    />
                  </button>

                </div>
              </div>

              <div className="modal-footer">
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}