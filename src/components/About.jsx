import React from 'react';
import '../styles/About.css';
import disneyLogo from '../assets/logos/disney.png';
import netflixLogo from '../assets/logos/netflix.png';
import crunchyrollLogo from '../assets/logos/crunchyroll.png';
import perplexityLogo from '../assets/logos/perplexity.png';
import paramountLogo from '../assets/logos/paramount.png';
import hboLogo from '../assets/logos/hbo.png';
import tiktokLogo from '../assets/logos/tiktok.png';
import robloxLogo from '../assets/logos/roblox.png';
import duolingoLogo from '../assets/logos/duolingo.png';
import gptLogo from '../assets/logos/chatgpt.png';
import canvaLogo from '../assets/logos/canva.png';

const About = () => {
  const brands = [
    { name: 'Netflix',      img: netflixLogo },
    { name: 'Disney+',      img: disneyLogo },
    { name: 'HBO Max',      img: hboLogo },
    { name: 'Paramount+',   img: paramountLogo },
    { name: 'Crunchyroll',  img: crunchyrollLogo },
    { name: 'ChatGPT',      img: gptLogo },
    { name: 'Perplexity',   img: perplexityLogo },
    { name: 'Canva',        img: canvaLogo },
    { name: 'Duolingo',     img: duolingoLogo },
    { name: 'TikTok',       img: tiktokLogo },
    { name: 'Roblox',       img: robloxLogo },
  ];

  return (
    <section className="brands-marquee">
      <div className="marquee-wrapper">
        <div className="fade-overlay fade-left"></div>
        
        <div className="marquee-track">
          
          <div className="marquee-group">
            {brands.map((brand, index) => (
              <div key={`g1-${index}`} className="brand-item">
                <img src={brand.img} alt={brand.name} className="brand-image" />
              </div>
            ))}
          </div>

          <div className="marquee-group">
            {brands.map((brand, index) => (
              <div key={`g2-${index}`} className="brand-item">
                <img src={brand.img} alt={brand.name} className="brand-image" />
              </div>
            ))}
          </div>

           <div className="marquee-group">
            {brands.map((brand, index) => (
              <div key={`g3-${index}`} className="brand-item">
                <img src={brand.img} alt={brand.name} className="brand-image" />
              </div>
            ))}
          </div>

        </div>

        <div className="fade-overlay fade-right"></div>
      </div>
    </section>
  );
};

export default About;