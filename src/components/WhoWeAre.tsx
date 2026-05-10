export default function WhoWeAre() {
  return (
    <section id="hakkimizda" className="relative py-24 md:py-32 overflow-hidden bg-gray-50">
      <div className="glow-leaf -bottom-32 -left-32 opacity-60" />
      <div className="glow-bolt -top-20 -right-32 opacity-50" />

      <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[var(--brand-ink-2)] to-[var(--brand-ink)]">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="yolGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7BC142" stopOpacity="0.0" />
                  <stop offset="50%" stopColor="#7BC142" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1EBBEE" stopOpacity="0.6" />
                </linearGradient>
                <radialGradient id="kureGrad" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#1EBBEE" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#1EBBEE" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="250" r="180" fill="url(#kureGrad)" />
              <path
                d="M40 380 Q 200 280 360 380"
                stroke="url(#yolGrad)"
                strokeWidth="40"
                fill="none"
                strokeLinecap="round"
                opacity="0.35"
              />
              <path
                d="M40 380 Q 200 280 360 380"
                stroke="#1EBBEE"
                strokeWidth="2"
                strokeDasharray="14 12"
                fill="none"
              />
              <g transform="translate(135 290)">
                <rect x="10" y="40" width="120" height="35" rx="14" fill="#0c1a18" stroke="#7BC142" strokeWidth="1.5" />
                <path d="M30 40 L 50 18 H 100 L 120 40" fill="#0c1a18" stroke="#7BC142" strokeWidth="1.5" />
                <circle cx="40" cy="78" r="10" fill="#06120F" stroke="#1EBBEE" strokeWidth="1.5" />
                <circle cx="110" cy="78" r="10" fill="#06120F" stroke="#1EBBEE" strokeWidth="1.5" />
                <rect x="20" y="50" width="20" height="14" rx="3" fill="#1EBBEE" opacity="0.5" />
              </g>
              <g opacity="0.8">
                <path d="M70 90 q 25 -25 50 0 q -25 25 -50 0" fill="#7BC142" opacity="0.6" />
                <path d="M310 130 q 20 -20 40 0 q -20 20 -40 0" fill="#A6E36A" opacity="0.5" />
                <path d="M50 200 q 15 -15 30 0 q -15 15 -30 0" fill="#7BC142" opacity="0.4" />
              </g>
            </svg>
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              <div className="text-xs uppercase tracking-widest text-[var(--brand-bolt-soft)]">Bu biz</div>
              <div className="text-3xl font-display font-bold gradient-text">ConteEco.</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="eyebrow" style={{color:"#1EBBEE"}}>Hakkımızda</span>
          <h2 className="display mt-4 text-4xl md:text-5xl text-gray-900">
            <span className="gradient-text">Elektrikli dönüşümü</span> güçlendiriyoruz.
          </h2>
          <p className="mt-6 text-gray-500 text-lg leading-relaxed">
            ConteEco, tek bir ilkel üzerinde yükseliyor: elektrikli araç şarjı akıcı olmalı,
            beklemeyi kısaltmalı ve sürdürülebilir olmayı vaat ettiği kadar gerçek olmalı.
            Büyük şehirleri yüksek güçlü koridorlarla örmek üzere yola çıkıyoruz.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Bağımsız bir operatör olarak köklü altyapı bilgisini yazılımın keskinliğiyle
            bir araya getiriyoruz. Böylece her kilovat, sürücüye ve iş ortağına birlikte
            güvenilirlik, özen ve ölçülebilir performans olarak ulaşıyor.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <div className="font-display font-bold text-3xl tracking-tight gradient-text inline-block pb-1 leading-[1.35]">
                2026
              </div>
              <div className="mt-1 text-sm text-gray-400">Kuruluş yılı</div>
            </div>
            <div>
              <div className="font-display font-bold text-3xl tracking-tight gradient-text inline-block pb-1 leading-[1.35]">
                20+
              </div>
              <div className="mt-1 text-sm text-gray-400">Hizmet verilecek şehir</div>
            </div>
            <div>
              <div className="font-display font-bold text-3xl tracking-tight gradient-text inline-block pb-1 leading-[1.35]">
                10+
              </div>
              <div className="mt-1 text-sm text-gray-400">Ekip üyesi</div>
            </div>
            <div className="min-h-0 overflow-visible">
              {/* gradient-text + bg-clip bazı tarayıcılarda 'g' harfini keser; burada düz marka rengi */}
              <div className="font-display font-bold text-3xl tracking-tight inline-block pb-1 leading-[1.45] text-[var(--brand-bolt)]">
                0 g
              </div>
              <div className="mt-1 text-sm text-gray-400">
                kWh başına CO<sub className="text-[0.85em]">2</sub>
              </div>
            </div>
          </div>

          <a href="#hakkimizda" className="btn-ghost mt-9">
            Daha fazla bilgi
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
