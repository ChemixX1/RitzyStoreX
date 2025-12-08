import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import TypewriterBox from './TypewriterBox';
import gengarImage from '../assets/logos/gengar3.png';
import Particles from './Particles';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { left, top } = heroRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section id="inicio" className="gengar-hero" ref={heroRef}>
      <div className="particles-bg-container">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={100}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="hero-lightning-lines">
        <svg viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 0L200 800" stroke="#a855f7" strokeWidth="1" opacity="0.15"/>
          <path d="M1300 0L1100 800" stroke="#a855f7" strokeWidth="1.5" opacity="0.2"/>
          <path d="M400 100 L600 300 L500 400 L800 700" stroke="#a855f7" strokeWidth="1" opacity="0.1" fill="none"/>
        </svg>
      </div>

      <div className="gengar-bg-container-hero">
        <img src={gengarImage} alt="" className="gengar-bg-image-hero" />
      </div>

      <div className="hero-split-container">
        <div className="hero-content-left">
          <h1 className="gengar-title">
            Bienvenido a <br />
            <span className="ritzy-text">Ritzy</span>
            <span className="store-text">StoreX</span>
          </h1>

          <p className="hero-brief">
            Deje de pagar de más. Le ofrezco una solución que reúne entretenimiento en HD,
            herramientas de productividad y un impulso para su presencia social, todo en un solo lugar.
            Acceso Premium por una fracción del costo, respaldado por mi Garantía de Servicio.
          </p>

          <TypewriterBox text="Deeveloper: GeanFranco Calle Silva" />
        </div>

        <div className="hero-visual-right">

          <div className="phantom-hub-container">
            <div className="shadow-core"></div>

            <div className="ghost-card floating-1">
              <div className="card-icon icon-purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M8 5v14l11-7-11-7z" />
                </svg>
              </div>
              <div className="card-info">
                <h4>Streaming</h4>
                <p>Calidad 4K</p>
              </div>
            </div>

            <div className="ghost-card floating-2">
              <div className="card-icon icon-pink">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="card-info">
                <h4>Boost Social</h4>
                <p>Autoridad Real</p>
              </div>
            </div>
            <div className="ghost-card floating-3">
              <div className="card-icon icon-blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="15" x2="22" y2="15" />
                  <path d="M7 19h10" />
                </svg>
              </div>
              <div className="card-info">
                <h4>Herramientas</h4>
                <p>Licencias Pro</p>
              </div>
            </div>
          </div>


          <div className="hero-value-proposition">
            <div className="holo-chips-container">


              <div className="holo-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M5 11V7a5 5 0 1 1 10 0" />
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                </svg>
                Acceso total
              </div>
              <div className="holo-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Máximo ahorro
              </div>
              <div className="holo-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Cero riesgos
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;