"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Animasyonlu parçacık arka planı */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "123,193,66" : "30,187,238",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--brand-ink)]">
      {/* Parçacık canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Glow efektleri */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--brand-leaf)] opacity-[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--brand-bolt)] opacity-[0.07] blur-[120px] pointer-events-none" />

      {/* İçerik */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="ConteEco Charging"
            width={280}
            height={90}
            priority
            className="h-16 w-auto object-contain mb-12 hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Başlık */}
        <h1 className="display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
          <span className="block text-white">Çok Yakında</span>
          <span className="block gradient-text">Hizmetinizdeyiz</span>
        </h1>

        {/* Açıklama */}
        <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-lg">
          ConteEco Charging platformunu sizin için hazırlıyoruz. Elektrikli araç şarjını
          yeniden tanımlayan ağımız çok yakında aktif olacak.
        </p>

        {/* Ayırıcı çizgi */}
        <div className="w-24 h-px bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] mb-12 opacity-60" />

        {/* Geri dön butonu */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] text-[var(--brand-ink)] hover:brightness-110 hover:-translate-y-px transition-all duration-200"
        >
          <ArrowLeft />
          Ana Sayfaya Dön
        </Link>
      </div>

      {/* Alt yazı */}
      <p className="absolute bottom-8 text-xs text-white/25 tracking-widest">
        © {new Date().getFullYear()} ConteEco Charging
      </p>
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
