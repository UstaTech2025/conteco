const KART_SAYISI = 8;

export default function Partners() {
  const dongu = Array.from({ length: KART_SAYISI * 2 }, (_, i) => i);

  return (
    <section className="relative py-24 md:py-28 bg-gray-50">
      {/* SVG blur filtresi — kart içindeki soyut şekle uygulanır (isim/metin yok) */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <filter id="partner-card-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow" style={{ color: "#1EBBEE" }}>
            Birlikte çalıştıklarımız
          </span>
          <h2 className="display mt-4 text-4xl md:text-5xl text-gray-900">
            Gerçek ortaklıklar. <span className="gradient-text">Ortak başarı.</span>
          </h2>
          <p className="mt-5 text-gray-500 leading-relaxed">
            Perakende, konaklama, gayrimenkul ve mobilite alanlarında öncü markalar,
            şarj deneyimlerini güçlendirmek için ConteEco&apos;ya güveniyor.
          </p>
        </div>

        <div className="mt-12 relative overflow-hidden select-none" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-10 marquee-track" style={{ width: "200%" }}>
            {dongu.map((i) => (
              <div
                key={i}
                className="shrink-0 relative min-w-[200px] h-20 rounded-2xl overflow-hidden border border-gray-200/70 bg-white/70 shadow-sm"
              >
                {/* Üst cam katmanı */}
                <div className="absolute inset-0 backdrop-blur-xl bg-white/35" />
                {/* Soyut renk — SVG blur ile yumuşatılmış; DOM&apos;da metin yok */}
                <div
                  className="absolute inset-3 rounded-xl opacity-90 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(123,193,66,0.35) 0%, rgba(30,187,238,0.28) 50%, rgba(14,124,158,0.22) 100%)",
                    filter: "url(#partner-card-blur)",
                  }}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
