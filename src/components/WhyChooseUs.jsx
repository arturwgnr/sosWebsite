import "../styles/WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="why-container">
        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon">
              <span className="material-symbols-outlined">airport_shuttle</span>
            </div>
            <h4>Atendimento Rápido</h4>
            <p>
              Tempos de resposta que definem o padrão do setor. Seu tempo é
              valioso.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h4>Assistência no Local</h4>
            <p>
              Vamos até você. Oficinas móveis totalmente equipadas para qualquer
              reparo.
            </p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h4>Suporte Confiável</h4>
            <p>Gestores dedicados para contratos B2B e atendimento a frotas.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h4>Preços Competitivos</h4>
            <p>
              Orçamentos transparentes, sem taxas ocultas ou cobranças
              inesperadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
