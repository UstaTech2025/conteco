"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-ink)]">
      {/* Header boşluk örtüsü */}
      <div className="absolute inset-x-0 top-0 h-28 bg-[var(--brand-ink)] z-[1]" />
      <div className="glow-leaf -bottom-20 -left-20 opacity-40" />

      {/* Tüm ekranlarda absolute sağ görsel */}
      <div className="absolute right-0 top-[-6%] bottom-[8%] w-[78%] lg:top-0 lg:bottom-0 lg:w-[65%]">
        <Image
          src="/images/Adsız tasarım (2) (1).png"
          alt="ConteEco şarj istasyonu"
          fill
          priority
          className="object-contain object-right object-top lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-ink)] via-[rgba(6,18,15,0.2)] to-transparent" />
      </div>

      <div
        className="container-x relative z-10"
        style={{ paddingTop: "100px", paddingBottom: "40px", minHeight: "100vh" }}
      >
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-12 items-center min-h-[calc(100vh-100px)]">

          {/* İçerik */}
          <div>
            {/* Eyebrow sadece sm+ ekranlarda */}
            <span className="eyebrow hidden sm:inline-block">Akıllı · Sürdürülebilir · Kesintisiz</span>
            <h1 className="display mt-3 sm:mt-5 text-[2.55rem] sm:text-5xl md:text-6xl lg:text-[5.2rem] leading-[1.1]">
              <span className="block text-white">Tak.</span>
              <span className="block gradient-text">Şarj et.</span>
              <span className="block text-white">Yola çık.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed hidden sm:block">
              ConteEco Charging, elektrikli araç şarjını yeni bir boyuta
              taşıyor — %100 yenilenebilir enerjiyle çalışan, akıllı ve hızlı
              şarj noktaları ağıyla şehirleri, otoyolları ve destinasyonları
              birbirine bağlıyoruz.
            </p>
            {/* Kısa açıklama sadece küçük mobil */}
            <p className="mt-3 text-sm text-white/60 leading-relaxed sm:hidden">
              %100 yenilenebilir enerjiyle akıllı şarj ağı.
            </p>

            <div className="mt-4 sm:mt-8 flex flex-row flex-wrap items-center gap-2 sm:gap-4">
              <Link href="/coming-soon" className="btn-primary">
                Ağı Keşfet
              </Link>
              <Link href="/coming-soon" className="btn-ghost">
                <PlayIcon />
                Uygulamayı İndir
              </Link>
            </div>

            <div className="mt-6 hidden sm:flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckBadge />
                %100 yenilenebilir enerji
              </div>
              <div className="flex items-center gap-2">
                <CheckBadge />
                7/24 sürücü desteği
              </div>
            </div>
          </div>

          {/* Desktop boş kolon */}
          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--background)]" />
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function CheckBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--brand-leaf)] shrink-0" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
