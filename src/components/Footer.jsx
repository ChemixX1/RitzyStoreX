import { Facebook, Instagram, Send } from 'lucide-react';
import BrandIcon from './BrandIcon';
import '../styles/Footer.css';

const contactLinks = [
  {
    label: 'WhatsApp',
    detail: '+51 931 189 299',
    href: 'https://wa.me/51931189299?text=Hola%20RitzyStoreX%2C%20quiero%20conocer%20las%20plataformas%20y%20promociones%20disponibles.',
    icon: BrandIcon,
  },
  { label: 'Telegram', detail: '@ChemixX7', href: 'https://t.me/ChemixX7', icon: Send },
  { label: 'Instagram', detail: '@j0semanuelmejia', href: 'https://www.instagram.com/j0semanuelmejia/', icon: Instagram },
  { label: 'Facebook', detail: 'Jose Manuel Mejia Medina', href: 'https://www.facebook.com/jose.manuel.mejia.medina.2025?locale=es_LA', icon: Facebook },
];

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <img className="footer-gengar" src="/assets/branding/gengar-footer.webp" alt="" width="512" height="512" loading="lazy" decoding="async" />
      <div className="footer-shell">
        <div className="footer-callout">
          <div>
            <h2>¿Listo para mejorar tu experiencia digital?</h2>
            <p>Escríbeme y encuentra la opción que mejor se adapta a lo que necesitas.</p>
          </div>
          <a
            href="https://wa.me/51931189299?text=Hola%20RitzyStoreX%2C%20quiero%20recibir%20asesoría."
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon name="whatsapp" size={19} /> Iniciar conversación
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-wordmark"><span>Ritzy</span>StoreX</div>
            <p>Servicios digitales, atención cercana y una experiencia simple de principio a fin.</p>
            <span className="footer-status"><i /> Disponible para consultas</span>
          </div>

          <div className="footer-contacts">
            <p className="footer-column-title">Canales de contacto</p>
            <div className="contact-grid">
              {contactLinks.map(({ label, detail, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <span className="contact-icon"><Icon size={18} /></span>
                  <span><small>{label}</small><strong>{detail}</strong></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RitzyStoreX</span>
          <span>Diseñado y desarrollado por <strong>JOSE MANUEL MEJIA MEDINA</strong></span>
        </div>
      </div>
    </footer>
  );
}
