import { useState, useRef, useEffect } from "react";
import "../styles/Chatbot.css";

const WHATSAPP_NUMBER = "553193400419";

// Respostas e redirecionamentos em PT-BR
const SERVICE_RESPONSES = {
  empilhadeira: {
    text: "Oferecemos **Reparo de Empilhadeiras** com diagnóstico completo e revisão mecânica (elétricas e a GLP). Posso te levar à seção de serviços ou abrir o WhatsApp para orçamento.",
    action: "services",
    label: "Reparo de Empilhadeiras",
  },
  paleteira: {
    text: "Temos serviço de **Paleteiras**: reforma, pintura, lubrificação e manutenção. Quer que eu mostre todos os serviços ou prefere falar no WhatsApp?",
    action: "services",
    label: "Paleteiras",
  },
  manutencao: {
    text: "Fazemos **Manutenção** com avaliações técnicas para antecipar falhas. Posso te redirecionar para a página de serviços ou para o contato.",
    action: "services",
    label: "Manutenção",
  },
  emergencia: {
    text: "Para **Emergência** temos intervenção no local em até 4 horas (clientes prioritários). Recomendo falar direto no WhatsApp: 31 9340-0419.",
    action: "whatsapp",
    label: "Emergência",
  },
  locacao: {
    text: "Oferecemos **Locação** de empilhadeiras e paleteiras. Quer ver os serviços no site ou já solicitar orçamento pelo WhatsApp?",
    action: "services",
    label: "Locação",
  },
  orcamento: {
    text: "Para orçamento você pode preencher o formulário na seção **Contato** ou falar no WhatsApp (31 9340-0419). Quer que eu te leve ao contato?",
    action: "contact",
    label: "Orçamento",
  },
  contato: {
    text: "Na seção **Contato** você encontra telefones, endereço e formulário. Também atendemos pelo WhatsApp 24/7. Redireciono você para o contato?",
    action: "contact",
    label: "Contato",
  },
  servicos: {
    text: "Temos: Reparo de Empilhadeiras, Paleteiras, Manutenção, Emergência e Locação. Redireciono você para a seção de serviços?",
    action: "services",
    label: "Serviços",
  },
  ajuda: {
    text: "Pra te ajudar melhor digite algo como: **empilhadeira**, **paleteira**, **manutenção**, **emergência**, **locação**, **orçamento** ou **contato**. Ou escolha um dos botões abaixo.",
    action: null,
    label: "Ajuda",
  },
};

// Palavras-chave por intenção (minúsculas, sem acento)
const KEYWORDS = {
  empilhadeira: ["empilhadeira", "empilhadeiras", "forklift"],
  paleteira: ["paleteira", "paleteiras", "pallet", "transpalete"],
  manutencao: ["manutencao", "manutenção", "revisao", "revisão", "plano de manutenção"],
  emergencia: ["emergencia", "emergência", "urgente", "quebrou", "parou", "avaria"],
  locacao: ["locacao", "locação", "aluguel", "alugar", "aluguel de maquinário"],
  orcamento: ["orcamento", "orçamento", "preco", "preço", "valor", "cotação"],
  contato: ["contato", "contato", "telefone", "email", "endereco", "endereço", "falar"],
  servicos: ["servico", "serviços", "servicos", "o que fazem", "quais serviços"],
  ajuda: ["ajuda", "help", "oi", "ola", "olá", "bom dia", "boa tarde", "boa noite", "inicio", "menu"],
};

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function detectIntent(message) {
  const normalized = normalize(message);
  if (!normalized) return "ajuda";

  for (const [intent, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => normalized.includes(normalize(w)))) return intent;
  }
  return "ajuda";
}

function runAction(action) {
  if (action === "services") {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "contact") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  } else if (action === "whatsapp") {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  }
}

function formatMessage(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

// Som de notificação premium (Web Audio API - sem arquivos externos)
function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, startTime, duration) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    playTone(880, 0, 0.08);
    playTone(1100, 0.1, 0.12);
    playTone(1320, 0.22, 0.1);
  } catch (_) {}
}

const QUICK_BUTTONS = [
  { intent: "empilhadeira", label: "Empilhadeiras" },
  { intent: "paleteira", label: "Paleteiras" },
  { intent: "manutencao", label: "Manutenção" },
  { intent: "emergencia", label: "Emergência" },
  { intent: "locacao", label: "Locação" },
  { intent: "orcamento", label: "Orçamento" },
];

const WELCOME_MSG = {
  text: "Olá! Sou o assistente da **SOS Transpaletes**. Em que posso ajudar? Você pode perguntar sobre nossos serviços (empilhadeiras, paleteiras, manutenção, emergência, locação) ou pedir orçamento/contato.",
  action: null,
};

const TYPING_DELAY_MS = 2000;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: WELCOME_MSG.text, action: WELCOME_MSG.action },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  function sendMessage(text) {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setIsTyping(true);

    const intent = detectIntent(trimmed);
    const response = SERVICE_RESPONSES[intent] || SERVICE_RESPONSES.ajuda;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: response.text, action: response.action },
      ]);
      playNotificationSound();
      if (response.action) {
        setTimeout(() => runAction(response.action), 400);
      }
      typingTimeoutRef.current = null;
    }, TYPING_DELAY_MS);
  }

  function handleQuickClick(intent) {
    const response = SERVICE_RESPONSES[intent];
    if (!response) return;
    sendMessage(response.label);
  }

  return (
    <div className="chatbot-widget">
      <div className={`chatbot-panel ${open ? "chatbot-panel--open" : ""}`}>
        <div className="chatbot-header">
          <span className="chatbot-title">SOS Transpaletes</span>
          <p className="chatbot-subtitle">Atendimento Especializado</p>
          <button
            type="button"
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              <div
                className="chatbot-msg-bubble"
                dangerouslySetInnerHTML={{
                  __html: formatMessage(msg.text),
                }}
              />
              {msg.action && msg.role === "bot" && (
                <button
                  type="button"
                  className="chatbot-action-btn"
                  onClick={() => runAction(msg.action)}
                >
                  {msg.action === "services" && "Ver serviços"}
                  {msg.action === "contact" && "Ir ao contato"}
                  {msg.action === "whatsapp" && "Abrir WhatsApp"}
                </button>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-typing-bubble">
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-quick">
          {QUICK_BUTTONS.map((btn) => (
            <button
              key={btn.intent}
              type="button"
              className="chatbot-quick-btn"
              onClick={() => handleQuickClick(btn.intent)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="chatbot-input-wrap">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Digite sua dúvida..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            type="button"
            className="chatbot-send"
            onClick={() => sendMessage()}
            aria-label="Enviar"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`chatbot-toggle ${open ? "chatbot-toggle--hidden" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar chat" : "Abrir chat"}
      >
        <span className="material-symbols-outlined">chat</span>
      </button>
    </div>
  );
}
