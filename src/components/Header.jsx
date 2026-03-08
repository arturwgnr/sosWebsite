import { useState, useEffect } from "react";
import "../styles/Header.css";
import sos from "../assets/images/sos_logo_png.png";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">
              <img src={sos} alt="sos_logo" className="logo-image" />
            </div>
            <span href="#" className="logo-text">
              SOS Transpaletes
            </span>
          </div>

          <nav className="header-nav">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#services" className="nav-link">
              Serviços
            </a>
            <a href="#about" className="nav-link">
              Sobre
            </a>
            <a href="#contact" className="nav-link">
              Contato
            </a>
          </nav>

          <div className="header-actions">
            <button
              className="header-cta-button"
              onClick={scrollToContact}
            >
              Solicitar Serviço
            </button>
            <button
              type="button"
              className="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay ${menuOpen ? "mobile-menu-overlay--open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>
            Home
          </a>
          <a href="#services" className="mobile-nav-link" onClick={closeMenu}>
            Serviços
          </a>
          <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
            Sobre
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>
            Contato
          </a>
          <button
            type="button"
            className="mobile-nav-cta"
            onClick={() => {
              closeMenu();
              scrollToContact();
            }}
          >
            Solicitar Serviço
          </button>
        </nav>
      </div>
    </header>
  );
}
