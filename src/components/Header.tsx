"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/scrollTo";
import { SITE_NAV_ITEMS, SITE_NAV_MORE_LABELS } from "@/lib/siteNav";

const DILLER = ["Türkçe", "English"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dilAcik, setDilAcik] = useState(false);
  const [dil, setDil] = useState("Türkçe");
  const [dahaAcik, setDahaAcik] = useState(false);
  const dahaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Hash navigasyonu sonrası sayfanın üstüne dönüldüğünde state'i sıfırla
    const onVisibilityChange = () => { if (!document.hidden) onScroll(); };
    const onPageShow = () => requestAnimationFrame(onScroll);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!dilAcik) return;
    const id = window.setTimeout(() => setDilAcik(false), 3000);
    return () => window.clearTimeout(id);
  }, [dilAcik]);

  return (
    <header
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "top-3 pt-0" : "top-0 pt-0"
      }`}
    >
      <div
        className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "w-[88%] h-[72px] px-8 mt-2 rounded-2xl bg-[rgba(6,18,15,0.88)] backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
            : "w-full h-20 px-8 mt-0 rounded-none bg-transparent border-b border-white/0"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0 lg:shrink mx-auto lg:mx-0">
          <Image
            src="/images/logo.png"
            alt="ConteEco Charging"
            width={400}
            height={80}
            priority
            className="h-20 w-auto object-contain scale-125 origin-center lg:origin-left"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href="/coming-soon"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {/* Daha Fazla dropdown */}
          <div ref={dahaRef} className="relative">
            <button
              onClick={() => setDahaAcik((v) => !v)}
              onBlur={() => setTimeout(() => setDahaAcik(false), 150)}
              className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Daha Fazla
              <ChevronDown />
            </button>
            {dahaAcik && (
              <div className="absolute left-0 mt-3 w-52 rounded-2xl border border-white/10 bg-[rgba(12,26,24,0.97)] backdrop-blur-xl py-2 shadow-2xl">
                {SITE_NAV_MORE_LABELS.map((item) => (
                  <Link
                    key={item}
                    href="/coming-soon"
                    className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDilAcik((v) => !v)}
              className="flex items-center gap-1 text-xs text-white/75 hover:text-white px-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-colors"
            >
              <GlobeIcon />
              {dil}
              <ChevronDown />
            </button>
            {dilAcik && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-[rgba(12,26,24,0.95)] backdrop-blur-xl py-2 shadow-2xl">
                {DILLER.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDil(d);
                      setDilAcik(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${
                      d === dil ? "text-[var(--brand-leaf-soft)]" : "text-white/80"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/coming-soon"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--brand-leaf)] to-[var(--brand-bolt)] text-[var(--brand-ink)] transition-all hover:brightness-105 hover:-translate-y-px"
          >
            Uygulamayı İndir
          </Link>
        </div>

        <button
          aria-label="Menüyü aç/kapat"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex flex-col justify-center items-center w-10 h-10"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white mt-1 transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-5 h-0.5 bg-white mt-1 transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] mx-3 rounded-2xl border border-white/10 bg-[rgba(6,18,15,0.97)] backdrop-blur-2xl shadow-2xl lg:hidden z-50 max-h-[calc(100vh-90px)] overflow-y-auto">
          <div className="px-6 py-5 flex flex-col gap-1">
            {SITE_NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href="/coming-soon"
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-white/80 border-b border-white/5 last:border-0 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {SITE_NAV_MORE_LABELS.map((item) => (
              <Link
                key={item}
                href="/coming-soon"
                onClick={() => setOpen(false)}
                className="py-3 text-base text-white/60 border-b border-white/5 last:border-0 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/coming-soon"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-3"
            >
              Uygulamayı İndir
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}
