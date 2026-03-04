import "../styles/About.css";
import PaulaEdmar from "../assets/images/edmar_paula4.jpeg";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          {/* Lado da Imagem */}
          <div className="about-image-wrapper">
            <div className="decor decor-top"></div>
            <div className="decor decor-bottom"></div>

            <img
              src={PaulaEdmar}
              alt="Equipe Técnica"
              className="about-image"
            />

            <div className="about-badge">
              <p className="badge-number">30+</p>
              <p className="badge-text">Anos de Excelência Técnica</p>
            </div>
          </div>

          {/* Lado do Texto */}
          <div className="about-text">
            <h2>
              Especialistas em Manter o Seu Negócio em Pleno Funcionamento
            </h2>

            <p className="about-description">
              Há mais de 3 décadas, a SOS Transpaletes é referência em
              manutenção, venda e locação de equipamentos de movimentação de
              carga em Minas Gerais. Sabemos que uma paleteira parada não é
              apenas um reparo, é um gargalo que afeta toda a sua operação. Por
              isso, unimos engenharia de precisão, logística ágil e uma equipe
              altamente capacitada para manter seu negócio sempre em movimento.
            </p>

            <ul className="about-list">
              <li>
                <span className="material-symbols-outlined">check_circle</span>
                Venda de Peças e Acessórios Multimarcas
              </li>

              <li>
                <span className="material-symbols-outlined">check_circle</span>
                Manutenção em Empilhadeiras, Paleteiras, etc
              </li>

              <li>
                <span className="material-symbols-outlined">check_circle</span>
                Locação de Empilhadeira e Paleteiras
              </li>

              <li>
                <span className="material-symbols-outlined">check_circle</span>
                Venda de Empilhadeiras novas da marca UN Forklift e Paletrans
              </li>

              <li>
                <span className="material-symbols-outlined">check_circle</span>
                Especialistas em equipamentos Paletrans
              </li>
            </ul>

            <button
              onClick={() => {
                window.open(
                  "https://www.instagram.com/sostranspaletes/",
                  "_blank",
                );
              }}
              className="about-button"
            >
              Saiba Mais Sobre Nós
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
