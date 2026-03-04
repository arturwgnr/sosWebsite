import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-EWtUCGZ4KnYwKBqDmVjWRvrC0v-KpS0lXjQK5l4VlO5gr7OWcjZo6ot1yhmcFRTtHaUzo7c5nAvqfRoev1O7RzrMmoksWPcSDJ4xqenyL3x-T2F7ee39BF7o-B7xSOmJejnKhBsLQ2Fj0BPNtoScrWnBQk1DKOfZ6_CJkk0ZOHXL7vLIJ-a9oq98Du328nWZDUXOFYB_REeArwM9qrIyNMouF6zwpNVDXod38z7l2--8Dp7SAjxU1DxtuKZ-X8BaLCU84KaFPJVo"
          alt="Industrial Warehouse"
          className="hero-image"
        />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            Excelencia Industrial
          </span>

          <h1 className="hero-title">
            Resposta Rápida, <span className="highlight">Máxima</span>{" "}
            Eficiência.
          </h1>

          <p className="hero-description">
            Conserto rápido de Empilhadeiras e Paleteiras. Sua operação não pode
            esperar.
          </p>

          <div className="hero-buttons">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="primary-btn"
            >
              <span className="material-symbols-outlined">construction</span>
              Agendar Serviço
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/553193400419?text=Olá,%20vim%20pelo%20site%20da%20SOS%20Transpaletes%20e%20gostaria%20de%20solicitar%20um%20atendimento.",
                  "_blank",
                )
              }
              className="whatsapp-btn"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.159-.173.348-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.088.275.073.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.158.058 1.011.477 1.184.564.173.087.289.129.332.202.043.073.043.419-.101.824z" />
              </svg>
              WhatsApp
            </button>
          </div>
          <div className="hero-trust">
            Atendimento em até 24h • Técnicos Especializados • Peças Originais
          </div>
        </div>
      </div>
    </section>
  );
}
