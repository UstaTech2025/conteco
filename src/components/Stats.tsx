const MADDELER = [
  {
    baslik: "Yenilenebilir Enerji",
    aciklama:
      "Her şarj noktamız sertifikalı yenilenebilir kaynaklardan beslenir. Sıfır karbon, tam performans.",
  },
  {
    baslik: "Doğa ile Uyum",
    aciklama:
      "Şarj altyapımızı doğal alanlara, dağ yollarına ve kırsal destinasyonlara da taşıyoruz.",
  },
  {
    baslik: "Geleceğe Yatırım",
    aciklama:
      "Her kurulan istasyon, elektrikli mobiliteye geçişi hızlandıran ve emisyonu azaltan bir adımdır.",
  },
];

/* ─── SVG path helpers ─────────────────────────────────────── */
function arcPath(
  cx: number, cy: number, r: number,
  a1Deg: number, a2Deg: number,
): string {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(a1Deg));
  const y1 = cy + r * Math.sin(rad(a1Deg));
  const x2 = cx + r * Math.cos(rad(a2Deg));
  const y2 = cy + r * Math.sin(rad(a2Deg));
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function arrowAt(
  cx: number, cy: number, r: number,
  deg: number, sz = 11,
): string {
  const rad = (d: number) => (d * Math.PI) / 180;
  const t = rad(deg);
  const tx = cx + r * Math.cos(t);
  const ty = cy + r * Math.sin(t);
  // clockwise tangent in SVG (y-down)
  const dtx = -Math.sin(t);
  const dty = Math.cos(t);
  const px = -dty;
  const py = dtx;
  const hw = sz * 0.55;
  const bx = tx - dtx * sz;
  const by = ty - dty * sz;
  return (
    `M ${tx.toFixed(2)} ${ty.toFixed(2)} ` +
    `L ${(bx + px * hw).toFixed(2)} ${(by + py * hw).toFixed(2)} ` +
    `L ${(bx - px * hw).toFixed(2)} ${(by - py * hw).toFixed(2)} Z`
  );
}

function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = (d: number) => (d * Math.PI) / 180;
  return {
    x: +(cx + r * Math.cos(rad(deg))).toFixed(2),
    y: +(cy + r * Math.sin(rad(deg))).toFixed(2),
  };
}
/* ─────────────────────────────────────────────────────────── */

export default function Stats() {
  const cx = 160, cy = 160;
  const rO = 128, rI = 82;

  // Outer ring: 3 arcs of 110° with 10° gaps, starting from top (−90°)
  const outer = [
    { s: -90, e: 20,  stroke: "#A6E36A", arrow: "#C5EF8A" },
    { s: 30,  e: 140, stroke: "#22c8b4", arrow: "#40E0D0" },
    { s: 150, e: 260, stroke: "#67D6F5", arrow: "#8AEAFF" },
  ];

  // Inner ring: 3 arcs of 110° offset by 60° (counter-rotation)
  const inner = [
    { s: -30, e: 80,  stroke: "#7BC142" },
    { s: 90,  e: 200, stroke: "#0e9e8e" },
    { s: 210, e: 320, stroke: "#1EBBEE" },
  ];

  // Node circles at the START of each outer arc (equilateral triangle)
  const nodes = [-90, 30, 150].map((deg) => pt(cx, cy, rO, deg));

  const spinCW: React.CSSProperties = {
    transformBox: "view-box",
    transformOrigin: "50% 50%",
    animation: "spin-cw 12s linear infinite",
  };
  const spinCCW: React.CSSProperties = {
    transformBox: "view-box",
    transformOrigin: "50% 50%",
    animation: "spin-ccw 18s linear infinite",
  };

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #7BC142 0%, #0e9e8e 50%, #1EBBEE 100%)",
      }}
    >
      <div className="container-x max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text ── */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5 bg-white/20 text-white">
              Sürdürülebilirlik
            </span>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Sürdürülebilir bir<br />
              <span className="text-white/80">gelecek için şarj</span>.
            </h2>
            <p className="mt-6 text-white/75 text-lg leading-relaxed max-w-xl">
              ConteEco, her şarj noktasını gezegenimize duyduğumuz sorumluluğun bir
              yansıması olarak kuruyor. Temiz enerji, temiz havalı sokaklar ve
              elektrikli araçların doğayla buluştuğu anlar.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5">
              {MADDELER.map((m, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{m.baslik}</div>
                    <div className="text-white/65 text-sm mt-1 leading-relaxed">{m.aciklama}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: rotating SVG animation ── */}
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 320 320"
              className="w-64 h-64 sm:w-72 sm:h-72 lg:w-[360px] lg:h-[360px]"
              aria-hidden="true"
              overflow="visible"
            >
              {/* Static faint guide rings */}
              <circle cx={cx} cy={cy} r={rO} fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
              <circle cx={cx} cy={cy} r={rI} fill="none" stroke="white" strokeWidth="1" opacity="0.08" />
              {/* Outer pulsing halo */}
              <circle cx={cx} cy={cy} r={rO + 18} fill="none" stroke="white" strokeWidth="1" opacity="0.05">
                <animate attributeName="opacity" values="0.04;0.14;0.04" dur="3.2s" repeatCount="indefinite" />
              </circle>

              {/* ── Outer ring — clockwise ── */}
              <g style={spinCW}>
                {outer.map((a, i) => (
                  <g key={i}>
                    <path
                      d={arcPath(cx, cy, rO, a.s, a.e)}
                      fill="none"
                      stroke={a.stroke}
                      strokeWidth="12"
                      strokeLinecap="round"
                      opacity="0.92"
                    />
                    <path d={arrowAt(cx, cy, rO, a.e, 11)} fill={a.arrow} />
                  </g>
                ))}
                {/* Junction nodes at arc starts */}
                {nodes.map((n, i) => (
                  <circle key={i} cx={n.x} cy={n.y} r="7" fill="white" opacity="0.9" />
                ))}
              </g>

              {/* ── Inner ring — counter-clockwise ── */}
              <g style={spinCCW}>
                {inner.map((a, i) => (
                  <g key={i}>
                    <path
                      d={arcPath(cx, cy, rI, a.s, a.e)}
                      fill="none"
                      stroke={a.stroke}
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                    <path d={arrowAt(cx, cy, rI, a.e, 7)} fill={a.stroke} opacity="0.75" />
                  </g>
                ))}
              </g>

              {/* ── Center ── */}
              <defs>
                {/* Fill clip: rect expands bottom→top, holds, then resets */}
                <clipPath id="boltFill">
                  <rect x="148" width="24" y="176" height="0">
                    <animate
                      attributeName="y"
                      values="176;146;146;176"
                      keyTimes="0;0.55;0.82;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="height"
                      values="0;30;30;0"
                      keyTimes="0;0.55;0.82;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </clipPath>
              </defs>

              <circle cx={cx} cy={cy} r="48" fill="white" opacity="0.06" />
              <circle cx={cx} cy={cy} r="36" fill="white" opacity="0.1" />
              {/* Center circle — pulses cyan as bolt fills */}
              <circle cx={cx} cy={cy} r="27" fill="rgba(6,18,15,0.55)">
                <animate
                  attributeName="fill"
                  values="rgba(6,18,15,0.55);rgba(30,187,238,0.28);rgba(6,18,15,0.55)"
                  keyTimes="0;0.55;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Bolt outline — always dim */}
              <path
                d="M 163 146 L 154 163 L 161 163 L 157 176 L 168 159 L 161 159 Z"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.28"
              />
              {/* Bolt fill — animates bottom→top */}
              <path
                d="M 163 146 L 154 163 L 161 163 L 157 176 L 168 159 L 161 159 Z"
                fill="white"
                opacity="0.92"
                clipPath="url(#boltFill)"
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
