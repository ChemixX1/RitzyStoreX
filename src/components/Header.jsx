import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandIcon from './BrandIcon';
import GengarOutline from './GengarOutline';
import '../styles/Header.css';

const navigation = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Plataformas' },
  { id: 'contacto', label: 'Contacto' },
];

const leftNavigation = navigation.slice(0, 2);
const rightNavigation = navigation.slice(2);

export default function Header() {
  const [active, setActive] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (event, id) => {
    event.preventDefault();
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLink = ({ id, label }) => (
    <a
      key={id}
      className={active === id ? 'active' : ''}
      href={`#${id}`}
      aria-current={active === id ? 'page' : undefined}
      onClick={(event) => goTo(event, id)}
    >
      {label}
      <span className="nav-underline" aria-hidden="true" />
    </a>
  );

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-glow" aria-hidden="true" />
      <div className="header-surface">
        <nav className="navbar" aria-label="Navegación principal">
          <div className="nav-cluster nav-cluster--left">
            {leftNavigation.map(navLink)}
          </div>

          <a className="navbar-brand" href="#inicio" onClick={(event) => goTo(event, 'inicio')}>
            <GengarOutline className="brand-outline" showEyes />
            <span className="brand-wordmark">Ritzy<span>StoreX</span></span>
          </a>

          <div className="nav-cluster nav-cluster--right">
            {rightNavigation.map(navLink)}
            <a
              className="nav-contact"
              href="https://wa.me/51931189299?text=Hola%20RitzyStoreX%2C%20quiero%20conocer%20las%20promociones%20disponibles."
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos
              <BrandIcon name="whatsapp" size={17} />
            </a>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <div id="primary-navigation" className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
        {navigation.map(navLink)}
        <a
          className="mobile-contact"
          href="https://wa.me/51931189299?text=Hola%20RitzyStoreX%2C%20quiero%20conocer%20las%20promociones%20disponibles."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Hablemos por WhatsApp
        </a>
      </div>
    </header>
  );
}
