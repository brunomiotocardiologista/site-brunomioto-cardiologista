import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente virtual do Dr. Bruno Mahler Mioto. Posso ajudá-lo com informações sobre consultas, avaliações cardiovasculares, agendamentos e muito mais. Como posso ajudá-lo hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo telefone (11) 3063-4890." },
      ]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || sendMessage.isPending) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    sendMessage.mutate({ message: userMessage, history: messages });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-2xl flex flex-col"
          style={{ background: "var(--cream)", border: "1px solid var(--border-fine)", maxHeight: "480px" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "var(--medical-blue)", color: "white" }}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <div>
                <div className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Assistente Virtual
                </div>
                <div className="text-xs opacity-75" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Dr. Bruno Mahler Mioto
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0, maxHeight: "320px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center"
                  style={{
                    background: msg.role === "assistant" ? "var(--medical-blue-pale)" : "var(--medical-blue)",
                    color: msg.role === "assistant" ? "var(--medical-blue)" : "white",
                  }}
                >
                  {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div
                  className="px-3 py-2 text-sm leading-relaxed max-w-[80%]"
                  style={{
                    background: msg.role === "assistant" ? "var(--cream-dark)" : "var(--medical-blue)",
                    color: msg.role === "assistant" ? "var(--ink)" : "white",
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: "2px",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {sendMessage.isPending && (
              <div className="flex gap-2">
                <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center" style={{ background: "var(--medical-blue-pale)", color: "var(--medical-blue)" }}>
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="px-3 py-2 text-sm" style={{ background: "var(--cream-dark)", color: "var(--ink-muted)", fontFamily: "'Inter', sans-serif" }}>
                  Digitando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid var(--border-fine)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua pergunta..."
              className="flex-1 px-3 py-2 text-sm"
              style={{
                border: "1px solid var(--border-fine)",
                background: "var(--cream-dark)",
                color: "var(--ink)",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sendMessage.isPending}
              className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ background: "var(--medical-blue)", color: "white" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: "var(--medical-blue)", color: "white" }}
        title="Assistente Virtual"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}
