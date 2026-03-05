import { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    company: "",
    service: "Reparo de Empilhadeira",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const phoneNumber = "553193400419";

    const text = `
*_⟹ Solicitação de Serviço (website):_*

*Empresa:* ${formData.company}
*Serviço:* ${formData.service}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}

*Mensagem:*
${formData.message}
    `;

    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-content">
          {/* Informações de Contato */}
          <div className="contact-info">
            <h2>Entre em Contato</h2>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="info-label">Telefones Oficiais</p>
                  <p className="info-highlight">31 9340-0419</p>
                  <p className="info-highlight">31 2559-3533</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div>
                  <p className="info-label">Endereço </p>
                  <p className="info-text">
                    Rua Sinval Alves da Cunha, 126 - Jardim Bandeirantes,
                    Contagem - MG, 32371-330
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon whatsapp">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div>
                  <p className="info-label">Atendimento Online</p>
                  <p className="info-text">
                    WhatsApp ativo 24/7 para suporte urgente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome da Empresa</label>
                <input
                  required
                  type="text"
                  name="company"
                  placeholder="Industrial Corp."
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Serviço Necessário</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option>Reparo de Empilhadeira</option>
                  <option>Reparo de Paleteira</option>
                  <option>Plano de Manutenção</option>
                  <option>Peças de Reposição</option>
                  <option>Aluguel de Maquinário</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Endereço de E-mail</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="exemplo@hotmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Número de Telefone</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="+55 (31) 0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Mensagem / Detalhes do Problema</label>
                <textarea
                  required
                  rows="4"
                  name="message"
                  placeholder="Descreva o problema..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="full-width">
                <button type="submit" className="submit-btn">
                  Enviar Solicitação de Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
