"use client";

import { useEffect, useRef, useState } from "react";
import DotLottie from "./DotLottie";

const ADIMLAR = [
  {
    n: "01",
    baslik: "İstasyon bul ve rezervasyon yap",
    aciklama: "Canlı haritayı incele, güç ve konnektör tipine göre filtrele, dakikalar içinde slot rezervasyonu yap — doğrudan telefonundan.",
    lottie: "https://lottie.host/7747844d-3063-414a-911f-eddefc95035d/YuPdCOH0hN.lottie",
  },
  {
    n: "02",
    baslik: "Tara ve şarjı başlat",
    aciklama: "QR kodu okut ya da RFID kartını yaklaştır. Oturumun anında başlar, ekstra kurulum veya evrak gerekmez.",
    lottie: "https://lottie.host/9d3cc547-8d9c-4d8b-9ba2-2a5463f646b3/4g1Sp4Lsx8.lottie",
  },
  {
    n: "03",
    baslik: "Takip et, öde ve yola çık",
    aciklama: "Şarj hızını gerçek zamanlı izle, dolduğunda bildirim al, sorunsuz ödeme yap ve yolculuğuna devam et.",
    lottie: "https://lottie.host/c49863b9-2bbc-429b-9979-197c9161c4c7/Hsj7rLWjtj.lottie",
  },
];

export default function AppSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="suruculer" className="relative py-24 md:py-32 bg-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: "linear-gradient(90deg,#7BC142,#1EBBEE)", color: "#fff" }}
          >
            Uygulamayı İndir
          </span>
          <h2 className="display mt-2 text-4xl md:text-5xl text-gray-900">
            İhtiyacın olan her şey{" "}
            <span style={{ color: "#1EBBEE" }}>tek uygulamada, Yakında</span>.
          </h2>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#7BC142] to-[#1EBBEE]" />
          <p className="mt-5 text-gray-500 text-lg leading-relaxed">
            Aldığımız her ürün kararı ve yazdığımız her satır kod tek bir amaca hizmet eder.
            Sürücülere taviz vermeden mükemmel bir şarj deneyimi sunmak. İşte ConteEco farkı bu.
          </p>
        </div>

        <div ref={sectionRef} className="mt-14 grid md:grid-cols-3 gap-5">
          {ADIMLAR.map((s, i) => (
            <div
              key={s.n}
              className="group relative rounded-2xl p-7 bg-transparent border border-gray-100 hover:shadow-lg flex flex-col items-start"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(48px)",
                transition: `opacity 0.6s ease, transform 0.6s ease`,
                transitionDelay: visible ? `${i * 180}ms` : "0ms",
              }}
            >
              <span
                className="self-end font-display text-5xl font-bold"
                style={{ color: "#7BC142", opacity: 0.25 }}
              >
                {s.n}
              </span>

              <div className="-mt-4">
                <DotLottie src={s.lottie} width={130} height={130} />
              </div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">{s.baslik}</h3>
              <p className="mt-3 text-gray-500 leading-relaxed">{s.aciklama}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 h-px bg-gray-200" />

        <div id="indir" className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 items-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-900 shadow-sm justify-center sm:justify-start"
          >
            <AppleIcon />
            <span className="text-left leading-tight">
              <span className="block text-[11px] text-gray-500">İndir</span>
              <span className="block text-base font-semibold">App Store</span>
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-900 shadow-sm justify-center sm:justify-start"
          >
            <GooglePlayIcon />
            <span className="text-left leading-tight">
              <span className="block text-[11px] text-gray-500">İndir</span>
              <span className="block text-base font-semibold">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.3-.9s2 .9 3.3.8c1.4 0 2.3-1.2 3.1-2.5.7-1 1-2 1.4-3-1.7-.7-2.7-2.3-2.8-3.8zM13.7 4.5c.7-.8 1.1-2 1-3.1-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.8-1.4z" />
    </svg>
  );
}
function GooglePlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 2.5C3.2 2.7 3 3.1 3 3.7v16.6c0 .6.2 1 .6 1.2l9.7-9.7L3.6 2.5zm10.7 9.7 2.6-2.6L5.5 2.7l8.8 9.5zm0 0L5.5 21.3l11.4-6.9-2.6-2.7zm6-3.5-3 1.7 2.7 2.8 3-1.7c.8-.5 1-1.4 0-1.9l-2.7-1.6c-1-.5 0 .7 0 .7z" />
    </svg>
  );
}
