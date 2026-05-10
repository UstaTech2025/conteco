"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_NAV_GROUPS } from "@/lib/siteNav";

export default function Footer() {
  return (
    <footer id="iletisim" className="relative pt-24 pb-10 mt-12 bg-[var(--brand-ink)] border-t border-white/10">
      <div className="glow-bolt -top-32 -left-32 opacity-30" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Image
              src="/images/logo.png"
              alt="ConteEco Charging"
              width={320}
              height={102}
              className="h-24 w-auto object-contain"
            />
            <p className="mt-5 text-white/60 leading-relaxed max-w-sm">
              ConteEco Charging, %100 yenilenebilir enerjiyle çalışan daha akıllı ve
              temiz bir elektrikli mobilite ağı kuruyor.
            </p>

            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              <Link href="/coming-soon" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors">
                <LinkedInIcon />
              </Link>
              <Link href="/coming-soon" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors">
                <InstagramIcon />
              </Link>
              <Link href="/coming-soon" aria-label="X" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors">
                <XIcon />
              </Link>
              <Link href="/coming-soon" aria-label="YouTube" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors">
                <YouTubeIcon />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {FOOTER_NAV_GROUPS.map((s) => (
              <div key={s.baslik} className="text-center lg:text-left">
                <div className="text-xs uppercase tracking-widest gradient-text">
                  {s.baslik}
                </div>
                <ul className="mt-4 space-y-3">
                  {s.linkler.map((l) => (
                    <li key={l}>
                      <Link href="/coming-soon" className="text-sm text-white/70 hover:text-white transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="text-xs uppercase tracking-widest gradient-text">
              Güncel kalın
            </div>
            <p className="mt-3 text-sm text-white/65 max-w-xs">
              Ağ genişlemeleri, uygulama güncellemeleri ve partner haberleri ayda
              bir, spam yok.
            </p>
            <form
              className="mt-5 w-full flex items-center p-1 pl-4 rounded-full border border-white/15 bg-white/[0.03] focus-within:border-[var(--brand-leaf)]/60 transition-colors"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="e-posta@adresiniz.com"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                aria-label="Abone ol"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-leaf)] to-[var(--brand-bolt)] text-black flex items-center justify-center hover:brightness-110"
              >
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 brand-divider" />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 text-center">
          <div>© {new Date().getFullYear()} ConteEco Charging. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-5">
            <Link href="/coming-soon" className="hover:text-white">Kullanım Koşulları</Link>
            <Link href="/coming-soon" className="hover:text-white">Gizlilik</Link>
            <Link href="/coming-soon" className="hover:text-white">Çerezler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05A4.16 4.16 0 0 1 17.5 8.7c4 0 4.74 2.6 4.74 6V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V21H10z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h3l-7.5 8.6L22 22h-6.3l-5-6.5L5 22H2l8-9.2L2 2h6.4l4.5 6 5.1-6z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5 3-5 3z" />
    </svg>
  );
}
