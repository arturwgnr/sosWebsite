import { useState, useRef, useEffect } from "react";
import "../styles/Chatbot.css";

const WHATSAPP_NUMBER = "553193400419";

// Respostas, redirecionamento na página e mensagem personalizada para WhatsApp
const SERVICE_RESPONSES = {
  empilhadeira: {
    text: "Oferecemos **Reparo de Empilhadeiras** com diagnóstico completo e revisão mecânica (elétricas e a GLP). Abra o WhatsApp para orçamento ou acompanhe a seção de serviços na página.",
    action: "services",
    label: "Reparo de Empilhadeiras",
    whatsappMessage: "Olá! Vim pelo site e gostaria de solicitar orçamento para *reparo de empilhadeira*.",
  },
  paleteira: {
    text: "Temos serviço de **Paleteiras**: reforma, pintura, lubrificação e manutenção. Abra o WhatsApp para falar com a equipe ou veja a seção de serviços na página.",
    action: "services",
    label: "Paleteiras",
    whatsappMessage: "Olá! Vim pelo site e gostaria de informações sobre *serviço de paleteiras* (reforma, pintura, manutenção).",
  },
  manutencao: {
    text: "Fazemos **Manutenção** com avaliações técnicas para antecipar falhas. Abra o WhatsApp ou acompanhe a seção de serviços na página.",
    action: "services",
    label: "Manutenção",
    whatsappMessage: "Olá! Vim pelo site e gostaria de saber mais sobre *plano de manutenção*.",
  },
  emergencia: {
    text: "Para **Emergência** temos intervenção no local em até 4 horas (clientes prioritários). Abra o WhatsApp para atendimento urgente.",
    action: "whatsapp",
    label: "Emergência",
    whatsappMessage: "Olá! Preciso de *atendimento de emergência* – equipamento parado. (contato pelo site)",
  },
  locacao: {
    text: "Oferecemos **Locação** de empilhadeiras e paleteiras. Abra o WhatsApp para orçamento ou veja a seção de serviços na página.",
    action: "services",
    label: "Locação",
    whatsappMessage: "Olá! Vim pelo site e gostaria de orçamento para *locação de empilhadeira ou paleteira*.",
  },
  orcamento: {
    text: "Para orçamento você pode falar no WhatsApp ou ver a seção Contato na página. Abra o WhatsApp com uma mensagem pronta.",
    action: "contact",
    label: "Orçamento",
    whatsappMessage: "Olá! Vim pelo site e gostaria de solicitar um *orçamento*.",
  },
  contato: {
    text: "Na seção **Contato** você encontra telefones, endereço e formulário. Abra o WhatsApp para falar com a equipe.",
    action: "contact",
    label: "Contato",
    whatsappMessage: "Olá! Vim pelo site e gostaria de falar com a equipe.",
  },
  servicos: {
    text: "Temos: Reparo de Empilhadeiras, Paleteiras, Manutenção, Emergência e Locação. Abra o WhatsApp ou acompanhe a seção de serviços na página.",
    action: "services",
    label: "Serviços",
    whatsappMessage: "Olá! Vim pelo site e gostaria de conhecer os *serviços* oferecidos.",
  },
  ajuda: {
    text: "Pra te ajudar melhor digite algo como: **empilhadeira**, **paleteira**, **manutenção**, **emergência**, **locação**, **orçamento** ou **contato**. Ou escolha um dos botões abaixo.",
    action: null,
    label: "Ajuda",
    whatsappMessage: "Olá! Vim pelo site e gostaria de mais informações.",
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
  }
}

function openWhatsApp(message) {
  const text = message || "Olá! Vim pelo site e gostaria de mais informações.";
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
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
  whatsappMessage: "Olá! Vim pelo site e gostaria de mais informações.",
};

const TYPING_DELAY_MS = 2000;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: WELCOME_MSG.text,
      action: WELCOME_MSG.action,
      whatsappMessage: WELCOME_MSG.whatsappMessage,
    },
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
        {
          role: "bot",
          text: response.text,
          action: response.action,
          whatsappMessage: response.whatsappMessage ?? null,
        },
      ]);
      playNotificationSound();
      if (response.action) setTimeout(() => runAction(response.action), 400);
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
              {msg.role === "bot" && msg.whatsappMessage && (
                <button
                  type="button"
                  className="chatbot-action-btn chatbot-action-btn--whatsapp"
                  onClick={() => openWhatsApp(msg.whatsappMessage)}
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp
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
