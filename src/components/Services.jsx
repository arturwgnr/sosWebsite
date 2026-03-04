import "../styles/Services.css";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2>Especialistas em Reparos de Alta Performance</h2>
          <p>
            Serviços especializados para equipamentos de grande porte,
            priorizando segurança, precisão e conformidade regulatória.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <span className="material-symbols-outlined">forklift</span>
            </div>
            <h3>Reparo de Empilhadeiras</h3>
            <p>
              Diagnóstico completo e revisão mecânica para unidades elétricas e
              a GLP.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <span className="material-symbols-outlined">
                precision_manufacturing
              </span>
            </div>
            <h3>Paleteiras</h3>
            <p>Reforma, Pintura, Lubrificação e Manutenção nos equipamentos</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h3>Manutenção</h3>
            <p>
              Avaliações técnicas estratégicas para antecipar e neutralizar
              falhas de alto impacto.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <h3>Emergência</h3>
            <p>
              Intervenção crítica no local em até 4 horas para clientes
              prioritários.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <span className="material-symbols-outlined">settings</span>
            </div>
            <h3>Locação</h3>
            <p>
              Locação de Empilhadeiras e Paleteiras, garantindo continuidade
              operacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
