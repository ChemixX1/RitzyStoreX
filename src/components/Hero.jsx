import { Gamepad2 } from 'lucide-react';
import BrandIcon from './BrandIcon';
import '../styles/Hero.css';

const heroTiles = [
  '/assets/logos/cards/canva.webp',
  '/assets/logos/cards/hbo.webp',
  '/assets/logos/cards/tiktok.webp',
  '/assets/logos/cards/netflix.webp',
  '/assets/logos/cards/disney.webp',
  '/assets/logos/cards/duolingo.webp',
  '/assets/logos/cards/chatgpt.webp',
  '/assets/logos/cards/instagram.webp',
  '/assets/logos/cards/paramount.webp',
  '/assets/logos/cards/crunchyroll.webp',
  '/assets/logos/cards/roblox.webp',
  '/assets/logos/cards/perplexity.webp',
  '/assets/logos/cards/facebook.webp',
  '/assets/logos/cards/capcut.webp',
];

const floatDirections = [-4, 3, 5, -2, 4, -5, 2];
const tileFloatStyles = heroTiles.map((_, index) => {
  const rotation = ((index % 5) - 2) * 0.22;

  return {
    '--float-x': `${floatDirections[index % floatDirections.length]}px`,
    '--float-y': `${-(6 + (index % 5))}px`,
    '--float-rotate-start': `${rotation}deg`,
    '--float-rotate-end': `${rotation * -1.25}deg`,
    '--float-duration': `${(4.35 + index * 0.17).toFixed(2)}s`,
    '--float-delay': `${-(0.45 + index * 0.57).toFixed(2)}s`,
  };
});

export default function Hero() {
  const handleTilePointerMove = (event) => {
    if (event.pointerType === 'touch') return;

    const tile = event.currentTarget;
    const bounds = tile.getBoundingClientRect();
    const pointerX = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
    const pointerY = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);

    tile.style.setProperty('--pointer-x', `${pointerX * 100}%`);
    tile.style.setProperty('--pointer-y', `${pointerY * 100}%`);
    tile.style.setProperty('--hover-rotate-x', `${(0.5 - pointerY) * 7}deg`);
    tile.style.setProperty('--hover-rotate-y', `${(pointerX - 0.5) * 7}deg`);
  };

  const handleTilePointerLeave = (event) => {
    const tile = event.currentTarget;
    tile.style.setProperty('--pointer-x', '50%');
    tile.style.setProperty('--pointer-y', '50%');
    tile.style.setProperty('--hover-rotate-x', '0deg');
    tile.style.setProperty('--hover-rotate-y', '0deg');
  };

  return (
    <section id="inicio" className="hero-section">
      <img
        className="hero-space-image"
        src="/assets/backgrounds/space-hero.webp"
        alt=""
        width="1536"
        height="1024"
        decoding="async"
        fetchPriority="high"
      />

      <div className="hero-mosaic" aria-hidden="true">
        {heroTiles.map((logo, index) => (
          <div
            className={`mosaic-float mosaic-float--${index + 1}`}
            key={`${logo}-${index}`}
            style={tileFloatStyles[index]}
          >
            <div
              className={`mosaic-tile mosaic-tile--${index + 1}`}
              onPointerMove={handleTilePointerMove}
              onPointerLeave={handleTilePointerLeave}
            >
              <img src={logo} alt="" width="180" height="180" decoding="async" />
            </div>
          </div>
        ))}
      </div>

      <div className="hero-space-overlay" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="hero-shell">
        <div className="hero-copy">
          <h1>
            <span className="hero-title-line">Las plataformas</span>
            <span className="hero-title-line">que amas a un precio</span>
            <span className="hero-title-line hero-title-accent">que te encantará</span>
          </h1>

          <p className="hero-description">
            Streaming, herramientas Pro, inteligencia artificial y gaming en un solo lugar,
            con una experiencia simple.
          </p>

          <div className="hero-actions">
            <a className="primary-action" href="#servicios">
              Ver plataformas
              <Gamepad2 size={20} strokeWidth={2.2} />
            </a>
            <a
              className="secondary-action"
              href="https://wa.me/51955422937?text=Hola%20RitzyStoreX%2C%20quiero%20información%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandIcon name="whatsapp" size={19} />
              Hablar por WhatsApp
            </a>
          </div>

          <div className="owner-signature">
            <small>Developer</small>
            <strong>JOSE MANUEL MEJIA MEDINA</strong>
          </div>
        </div>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}
