"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["merhaba", "selam", "hey", "merhabalar", "iyi günler", "iyi akşamlar"],
    answer:
      "Merhaba! ConteEco Charging asistanına hoş geldiniz. Şarj istasyonları, uygulama, fiyatlandırma veya iş ortaklığı hakkında yardımcı olabilirim.",
  },
  {
    keywords: ["istasyon", "nerede", "konum", "lokasyon", "harita", "yakın"],
    answer:
      "Şarj istasyonlarımız yakında 20'den fazla şehirde aktif olacak. Uygulamadaki canlı harita ile en yakın istasyonu saniyeler içinde bulabilirsiniz.",
  },
  {
    keywords: ["şarj", "ne kadar süre", "hız", "güç", "kw", "hızlı"],
    answer:
      "İstasyonlarımız farklı güç kademelerinde hizmet verecek. Hızlı şarj noktalarımızda aracınızı çok kısa sürede yola hazır hale getirebilirsiniz.",
  },
  {
    keywords: ["uygulama", "app", "mobil", "indir", "ios", "android", "store", "play"],
    answer:
      "ConteEco uygulaması çok yakında App Store ve Google Play'de yayınlanacak. Bildirim almak için bültenimize abone olabilirsiniz.",
  },
  {
    keywords: ["fiyat", "ücret", "tarife", "maliyet", "ne kadar", "ödeme"],
    answer:
      "Rekabetçi fiyatlandırma detaylarımız lansman öncesinde paylaşılacak. Ödeme; uygulama üzerinden kredi kartı, banka kartı veya dijital cüzdan ile yapılabilecek.",
  },
  {
    keywords: ["yenilenebilir", "enerji", "çevre", "sürdürülebilir", "karbon", "yeşil", "temiz"],
    answer:
      "Tüm ConteEco istasyonları %100 sertifikalı yenilenebilir enerji ile çalışır. Her şarj işlemi sıfır karbon ayak iziyle gerçekleşir.",
  },
  {
    keywords: ["ortak", "iş ortaklığı", "partner", "iş birliği", "yatırım", "franchise"],
    answer:
      "Gayrimenkul sahipleri, filo operatörleri ve kurumsal müşteriler için özel iş ortaklığı çözümlerimiz mevcut. İletişim formumuzdan ulaşabilirsiniz.",
  },
  {
    keywords: ["rezervasyon", "rezerve", "yer ayır", "slot"],
    answer:
      "Uygulama üzerinden dakikalar içinde istasyon rezervasyonu yapabilirsiniz. Canlı haritada uygun bir slot seçin, QR ile şarjı başlatın.",
  },
  {
    keywords: ["konnektör", "tip", "plug", "tesla", "ccs", "chademo", "type2"],
    answer:
      "İstasyonlarımız en yaygın konnektör tipleri ile uyumlu olacak. Desteklenen tipler hakkında detaylı bilgi uygulama lansman öncesinde paylaşılacak.",
  },
  {
    keywords: ["destek", "sorun", "yardım", "şikâyet", "arıza"],
    answer:
      "Destek ekibimiz 7/24 hizmetinizdedir. Web sitemizdeki iletişim formu veya uygulama içi destek kanalından bize ulaşabilirsiniz.",
  },
  {
    keywords: ["iletişim", "telefon", "mail", "e-posta", "ulaş", "contact"],
    answer:
      "Bize web sitesindeki iletişim formu aracılığıyla ulaşabilirsiniz. En kısa sürede size geri döneceğiz.",
  },
  {
    keywords: ["hakkında", "kimsiniz", "ne yapıyorsunuz", "conteco", "şirket"],
    answer:
      "ConteEco Charging, Türkiye genelinde %100 yenilenebilir enerjili akıllı EV şarj altyapısı kuruyor. Misyonumuz: elektrikli mobiliteyi herkes için erişilebilir kılmak.",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "");
  for (const qa of QA) {
    if (qa.keywords.some((k) => lower.includes(k))) return qa.answer;
  }
  return "Bu konuda şu an yeterli bilgiye sahip değilim. Daha fazlası için iletişim formumuzdan bize ulaşabilirsiniz — en kısa sürede dönüş yapacağız!";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "bot",
      text: "Merhaba! Ben ConteEco asistanıyım ⚡ Şarj istasyonları, uygulama veya iş ortaklığı hakkında soru sorabilirsiniz.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", text: getResponse(trimmed) },
        ]);
        setTyping(false);
      },
      900 + Math.random() * 500,
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat panel — mobilde tam ekran, masaüstünde 350px panel */}
      <div
        className={`
          fixed sm:relative
          inset-0 sm:inset-auto
          sm:mb-4 sm:w-[350px]
          rounded-none sm:rounded-2xl
          border-0 sm:border sm:border-white/10
          bg-[rgba(6,18,15,0.99)] sm:bg-[rgba(6,18,15,0.97)]
          backdrop-blur-2xl shadow-2xl overflow-hidden
          transition-all duration-300
          sm:origin-bottom-right
          flex flex-col
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-ink)]/30 flex items-center justify-center">
              <BotIcon />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--brand-ink)]">ConteEco Asistan</div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--brand-ink)]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-ink)] opacity-70 inline-block animate-pulse" />
                Çevrimiçi
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[var(--brand-ink)] opacity-60 hover:opacity-100 transition-opacity"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 sm:flex-none sm:h-72 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] text-[var(--brand-ink)] font-medium rounded-br-sm"
                    : "bg-white/[0.08] text-white/85 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="px-4 py-3 border-t border-white/10 flex gap-2 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--brand-leaf)]/60 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim() || typing}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] flex items-center justify-center text-[var(--brand-ink)] hover:brightness-110 disabled:opacity-40 transition-all shrink-0"
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Floating toggle button — mobilde panel açıkken gizlenir (panel kendi X'ini gösterir) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Sohbeti aç/kapat"
        className={`relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-leaf)] to-[var(--brand-bolt)] items-center justify-center shadow-xl hover:brightness-110 hover:scale-105 transition-all duration-200 ${open ? "hidden sm:flex" : "flex"}`}
      >
        {/* Masaüstü: chat ↔ X değişimi */}
        <span className={`absolute hidden sm:block transition-all duration-200 ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}>
          <ChatIcon />
        </span>
        <span className={`absolute hidden sm:block transition-all duration-200 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}>
          <CloseIcon />
        </span>
        {/* Mobil: her zaman chat ikonu */}
        <span className="sm:hidden">
          <ChatIcon />
        </span>
      </button>
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────────── */
function BotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-ink)]">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M12 2a3 3 0 0 1 3 3v6H9V5a3 3 0 0 1 3-3z" />
      <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" />
      <line x1="12" y1="16" x2="12" y2="16" strokeWidth="3" />
      <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-ink)]">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-[var(--brand-ink)]">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-ink)]">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
