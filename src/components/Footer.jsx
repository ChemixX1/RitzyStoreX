import React from 'react';
import '../styles/Footer.css';
import gengarImage from '../assets/logos/gengar2.png'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  
  const phone = "51955422937";
  const textWsp = encodeURIComponent("Hola Ritzy!  Vengo de tu web. ¿Podrías decirme las plataformas con las que cuentas y promos vigentes? Gracias!");
  const linkWhatsApp = `https://wa.me/${phone}?text=${textWsp}`;

  const userTelegram = "Ritzytoe";
  const linkTelegram = `https://t.me/${userTelegram}`;

  return (
    <footer id="contacto" className="footer-compact">
      
      <div className="lightning-bg">
        <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 0L200 400" stroke="#a855f7" strokeWidth="1" opacity="0.2"/>
          <path d="M-50 0L250 400" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>
          <path d="M1200 0L1300 150L1250 200L1450 400" stroke="#a855f7" strokeWidth="1.5" opacity="0.3"/>
          <path d="M600 400L700 300" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>
        </svg>
      </div>

      <div className="gengar-bg-container">
        <img src={gengarImage} alt="" className="gengar-bg-image" />
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          
          <div className="brand-column">
            <h3 className="brand-logo">
              <span className="ritzy-text">Ritzy</span>
              <span className="store-text">StoreX</span>
            </h3>
            <p className="brand-text">
              Tu aliado digital estratégico. Calidad, discreción y eficiencia asegurada <strong>para potenciar tu vida digital, estas listo?</strong>
            </p>
            <div className="status-indicator">
              <span className="dot"></span> Disponible 24/7
            </div>
          </div>

          <div className="contact-column">
            <h4 className="column-title">Contacto Directo</h4>
            <ul className="social-links">
              
              <li>
                <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
                  <span className="link-text">WhatsApp</span>
                  <span className="link-handle">+51 955 422 937</span>
                </a>
              </li>

              <li>
                <a href={linkTelegram} target="_blank" rel="noopener noreferrer">
                  <span className="link-text">Telegram</span>
                  <span className="link-handle">@Ritzytoe</span>
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/dark_toe/" target="_blank" rel="noopener noreferrer">
                  <span className="link-text">Instagram</span>
                  <span className="link-handle">@dark_toe</span>
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/darktoe" target="_blank" rel="noopener noreferrer">
                  <span className="link-text">Facebook</span>
                  <span className="link-handle">/darktoe</span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {currentYear} RitzyStoreX</span>
          <span className="dev-credit">Dev by Geanfranco Calle 🇵🇪</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;