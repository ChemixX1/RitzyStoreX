import '../styles/About.css';

const brands = [
  { name: 'Netflix', img: '/assets/logos/marquee/netflix.webp' },
  { name: 'Disney+', img: '/assets/logos/marquee/disney.webp' },
  { name: 'HBO Max', img: '/assets/logos/marquee/hbo.webp' },
  { name: 'Paramount+', img: '/assets/logos/marquee/paramount.webp' },
  { name: 'Crunchyroll', img: '/assets/logos/marquee/crunchyroll.webp' },
  { name: 'ChatGPT', img: '/assets/logos/marquee/chatgpt.webp' },
  { name: 'Perplexity', img: '/assets/logos/marquee/perplexity.webp' },
  { name: 'Canva', img: '/assets/logos/marquee/canva.webp' },
  { name: 'Duolingo', img: '/assets/logos/marquee/duolingo.webp' },
  { name: 'TikTok', img: '/assets/logos/marquee/tiktok.webp' },
  { name: 'Roblox', img: '/assets/logos/marquee/roblox.webp' },
];

function BrandGroup({ duplicate = false }) {
  return (
    <div className="brand-group" aria-hidden={duplicate || undefined}>
      {brands.map((brand) => (
        <div className="brand-chip" key={brand.name}>
          <img
            src={brand.img}
            alt={duplicate ? '' : brand.name}
            width="132"
            height="72"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section className="brands-marquee" aria-label="Plataformas destacadas">
      <div className="marquee-window">
        <div className="marquee-track">
          <BrandGroup />
          <BrandGroup duplicate />
        </div>
      </div>
    </section>
  );
}
