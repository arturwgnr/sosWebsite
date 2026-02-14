import "../styles/CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-text">
          <h2>Pronto para voltar à operação?</h2>
          <p>Solicite agora um orçamento sem compromisso para o seu reparo.</p>
        </div>

        <div className="cta-actions">
          <button
            onClick={() =>
              window.open(
                "https://wa.me/553193400419?text=Olá,%20vim%20pelo%20site%20da%20SOS%20Transpaletes%20e%20gostaria%20de%20solicitar%20um%20orçamento.",
                "_blank",
              )
            }
            className="cta-button"
          >
            Agendar Visita Técnica
          </button>
        </div>
      </div>
    </section>
  );
}
