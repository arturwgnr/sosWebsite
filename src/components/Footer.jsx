import "../styles/Footer.css";
import toast from "react-hot-toast";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Marca */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="material-symbols-outlined">forklift</span>
              <span className="logo-text">SOS Transpalets</span>
            </div>

            <p className="footer-description">
              Serviços profissionais de manutenção e reparo de equipamentos
              industriais. Compromisso com excelência, agilidade e segurança.
            </p>

            <div className="footer-socials">
              <a href="#" className="social-icon">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                href="comercial@sostranspaletes.com.br?subject=Solicitação de Serviço&body=Olá, gostaria de solicitar um orçamento."
                className="social-icon"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h5 className="footer-title">Serviços</h5>
            <ul className="footer-links">
              <li>
                <a href="#contact">Manutenção de Empilhadeiras</a>
              </li>
              <li>
                <a href="#contact">Paleteiras Elétricas</a>
              </li>
              <li>
                <a href="#contact">Hidráulica Manual</a>
              </li>
              <li>
                <a href="#contact">Peças Emergenciais</a>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h5 className="footer-title">Empresa</h5>
            <ul className="footer-links">
              <li>
                <a href="https://www.google.com/search?sa=X&sca_esv=d7358c9ad4b11281&sxsrf=ANbL-n5h9vts44xR0QdaWbAnxSq619Ye0w:1771083617885&q=SOS+Transpaletes+Avalia%C3%A7%C3%B5es&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDUxMzMzNrM0tzQ2MzQwNjQ2Nt7AyPiKUTbYP1ghpCgxr7ggMSe1JLVYwbEsMScz8fDyw1tTixex4pcHAF0YRcBbAAAA&rldimm=15466636979361031333&tbm=lcl&hl=pt-BR&ved=2ahUKEwjBkaXPqNmSAxWWV0EAHZ77DlQQ9fQKegQIUBAG&biw=1920&bih=919&dpr=1#lkt=LocalPoiReviews">
                  Avaliações
                </a>
              </li>
              <li>
                <a href="#services">Projetos Realizados</a>
              </li>
              <li>
                <a href="#contact">Área de Atendimento</a>
              </li>
              <li>
                <a
                  href="https://wa.me/+553193400419?text=Olá,%20tenho%20interesse%20em%20trabalhar%20na%20SOS%20Transpaletes!%20Como%20posso%20marcar%20uma%20entrevista?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="footer-title">Inscreva-se</h5>
            <p className="footer-description small">
              Receba dicas de manutenção e novidades do setor.
            </p>

            <div className="newsletter">
              <input type="email" placeholder="Seu e-mail" />
              <button
                onClick={() => {
                  toast.loading(
                    "Calma ai!!! Artur Wagner ainda ta trabalhando nisso... 😜",
                    {
                      duration: 2500,
                    },
                  );
                }}
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Artur Wagner. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
