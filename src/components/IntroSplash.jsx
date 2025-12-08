import { useState, useEffect } from 'react';
import '../styles/IntroSplash.css';
import Gengar from '../assets/logos/Gengar.png';

const IntroSplash = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = prev > 80 ? 4 : 2;

        if (prev >= 100) {
          clearInterval(interval);

          // Espera 0.5s antes de empezar a desaparecer
          setTimeout(() => {
            setFadeOut(true);

            /* 🔥 NEW: Activamos el fade-in del Home DESDE ACA */
            onComplete("start-fade");

            /* 🔥 NEW: Después de la animación, terminamos y entramos al Home */
            setTimeout(() => onComplete("finish"), 1200);

          }, 500);

          return 100;
        }

        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`intro-splash ${fadeOut ? 'fade-out' : ''}`}>

      <div className="background-decorations">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>

            <path d="M-100 0L200 800" stroke="#a855f7" strokeWidth="1" opacity="0.2"/>
            <path d="M-50 0L250 800" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>
            <path d="M100 0 L300 400" stroke="#a855f7" strokeWidth="0.5" opacity="0.1"/>

            <path d="M1200 0L1300 150L1250 200L1450 800" stroke="#a855f7" strokeWidth="1.5" opacity="0.3"/>
            <path d="M1400 0 L1100 800" stroke="#a855f7" strokeWidth="1" opacity="0.15"/>
            <path d="M1350 400 L1440 600" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>

            <path d="M600 800L700 600" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>
            <path d="M800 0 L850 200" stroke="#a855f7" strokeWidth="1" opacity="0.1"/>
            <path d="M0 600 L1440 200" stroke="#a855f7" strokeWidth="0.5" opacity="0.05"/>
            <path d="M500 0 L550 100 L520 150 L600 300" stroke="#a855f7" strokeWidth="1" opacity="0.15"/>

          </svg>
        </div>

        <div className="grid-container">
          <svg className="grid-svg" width="100%" height="100%">
            <defs>
              <pattern 
                id="grid" 
                width="33vw"
                height="50vh"
                patternUnits="userSpaceOnUse"
              >
                <rect 
                  width="33vw" 
                  height="50vh" 
                  fill="none" 
                  stroke="rgba(156, 163, 175, 0.2)"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="modern-line horizontal" style={{ top: '20%', left: '0', width: '35%' }}></div>
        <div className="modern-line horizontal" style={{ top: '20%', right: '0', width: '30%' }}></div>

        <div className="modern-line horizontal" style={{ top: '75%', left: '0', width: '28%' }}></div>
        <div className="modern-line horizontal" style={{ top: '75%', right: '0', width: '32%' }}></div>

        <div className="modern-line vertical" style={{ top: '15%', left: '18%', height: '25%' }}></div>
        <div className="modern-line vertical" style={{ top: '15%', right: '18%', height: '25%' }}></div>

        <div className="modern-line vertical" style={{ bottom: '15%', left: '22%', height: '30%' }}></div>
        <div className="modern-line vertical" style={{ bottom: '15%', right: '22%', height: '30%' }}></div>

        <div className="modern-line diagonal" style={{ top: '25%', left: '12%', width: '150px', transform: 'rotate(-45deg)' }}></div>
        <div className="modern-line diagonal" style={{ top: '25%', right: '12%', width: '150px', transform: 'rotate(45deg)' }}></div>

        <div className="modern-line diagonal" style={{ bottom: '25%', left: '15%', width: '130px', transform: 'rotate(45deg)' }}></div>
        <div className="modern-line diagonal" style={{ bottom: '25%', right: '15%', width: '130px', transform: 'rotate(-45deg)' }}></div>

      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="electric-aura" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="dilated" />
            <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline" />

            <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="2" result="noise" seed="0">
              <animate attributeName="seed" from="0" to="100" dur="0.8s" repeatCount="indefinite" />
            </feTurbulence>

            <feDisplacementMap in="outline" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" result="distortedEdge" />

            <feFlood floodColor="#e879f9" floodOpacity="1" result="color" />
            <feComposite in="color" in2="distortedEdge" operator="in" result="coloredEdge" />

            <feGaussianBlur in="coloredEdge" stdDeviation="4" result="glow1" />
            <feGaussianBlur in="coloredEdge" stdDeviation="8" result="glow2" />

            <feMerge>
              <feMergeNode in="glow2" />
              <feMergeNode in="glow1" />
              <feMergeNode in="coloredEdge" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="content-wrapper">
        <div className="gengar-container">
          <img src={Gengar} alt="" className="gengar-aura-layer" />
          <img src={Gengar} alt="Gengar" className="gengar-main-layer" />
        </div>

        <h1 className="splash-title">
          <span className="ritzy-text">Ritzy</span>
          <span className="store-text">StoreX</span>
        </h1>

        <div className="loading-container">
          <div className="loading-track-modern">
            <div 
              className="loading-fill-modern"
              style={{ width: `${progress}%` }}
            >
              <span className="loading-percent">{progress}%</span>
            </div>
          </div>

          <p className="loading-text">
            {progress < 100 ? "CARGANDO" : "LISTO"}
          </p>
        </div>
      </div>

    </div>
  );
};

export default IntroSplash;
