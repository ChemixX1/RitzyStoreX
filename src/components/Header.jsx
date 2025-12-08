import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom"; 
import { Home, Gamepad2, Mail } from "lucide-react"; 
import "../styles/Header.css";

const Header = () => {
  const [active, setActive] = useState("inicio");
  const isManualScroll = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if ((windowHeight + scrollY) >= docHeight - 50) {
        setActive("contacto");
        return;
      }

      const scrollPosition = scrollY + 250; 
      const sections = [
        { id: "inicio" },
        { id: "servicios" },
        { id: "contacto" }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          if (scrollPosition >= section.offsetTop) {
            setActive(sections[i].id);
            break; 
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    isManualScroll.current = true;
    setActive(id); 

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80; 
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      timeoutRef.current = setTimeout(() => {
        isManualScroll.current = false;
        timeoutRef.current = null;
      }, 1200);
    }
  };

  // --- SOLUCIÓN: Usamos createPortal PERO SIN estilos inline conflictivos ---
  // Dejamos que el archivo Header.css controle la posición (top)
  return createPortal(
    <header className="header">
      <nav className="pill-nav">
        
        <button
          className={`pill-item ${active === "inicio" ? "active" : ""}`}
          onClick={() => scrollToSection("inicio")}
        >
          <Home size={18} className="nav-icon" /> 
          <span>Inicio </span>
        </button>

        <button
          className={`pill-item ${active === "servicios" ? "active" : ""}`}
          onClick={() => scrollToSection("servicios")}
        >
          <Gamepad2 size={18} className="nav-icon" /> 
          <span>Plataformas </span>
        </button>

        <button
          className={`pill-item ${active === "contacto" ? "active" : ""}`}
          onClick={() => scrollToSection("contacto")}
        >
          <Mail size={18} className="nav-icon" /> 
          <span>Contacto </span>
        </button>

      </nav>
    </header>,
    document.body
  );
};

export default Header;