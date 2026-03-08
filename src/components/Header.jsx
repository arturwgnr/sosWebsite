import "../styles/Header.css";
import sos from "../assets/images/sos_logo_png.png";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
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
            <span className="mobile-menu mobile-menu--disabled" aria-hidden="true">
              <span className="material-symbols-outlined">menu</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
