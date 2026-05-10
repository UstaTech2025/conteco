"use client";

import dynamic from "next/dynamic";
import type { Istasyon } from "./MapboxMap";

const MapboxMap = dynamic(() => import("./MapboxMap"), { ssr: false });

const AKTIF_TURLER = ["dusuk", "orta", "yuksek"] as const;

const ISTASYONLAR: Istasyon[] = [
  { ad: "Levent Hub", sehir: "İstanbul", guc: "8 × 400 kW", konnekter: "DC CCS", lng: 29.0126, lat: 41.0796, tur: "yuksek" },
  { ad: "Çeşme Marina", sehir: "İzmir", guc: "2 × 60 kW", konnekter: "DC CCS", lng: 26.3024, lat: 38.3237, tur: "orta" },
  { ad: "Kızılay Plaza", sehir: "Ankara", guc: "4 × 22 kW", konnekter: "AC Tip 2", lng: 32.8541, lat: 39.9208, tur: "dusuk" },
  { ad: "Antalya Sahil", sehir: "Antalya", guc: "2 × 180 kW", konnekter: "DC CCS", lng: 30.7133, lat: 36.8969, tur: "yuksek" },
  { ad: "Bursa Otosan", sehir: "Bursa", guc: "6 × 60 kW", konnekter: "DC CCS", lng: 29.0610, lat: 40.1885, tur: "orta" },
  { ad: "Trabzon Liman", sehir: "Trabzon", guc: "2 × 60 kW", konnekter: "DC CCS", lng: 39.7178, lat: 41.0015, tur: "orta" },
  { ad: "Gaziantep Park", sehir: "Gaziantep", guc: "4 × 22 kW", konnekter: "AC Tip 2", lng: 37.3833, lat: 37.0662, tur: "dusuk" },
  { ad: "Bodrum Sahil", sehir: "Muğla", guc: "2 × 180 kW", konnekter: "DC CCS", lng: 27.4305, lat: 37.0344, tur: "yuksek" },
  { ad: "Eskişehir Tepe", sehir: "Eskişehir", guc: "2 × 60 kW", konnekter: "DC CCS", lng: 30.5206, lat: 39.7767, tur: "orta" },
  { ad: "Konya Selçuklu", sehir: "Konya", guc: "2 × 60 kW", konnekter: "DC CCS", lng: 32.4900, lat: 37.9162, tur: "orta" },
  { ad: "Samsun Karadeniz", sehir: "Samsun", guc: "1 × 180 kW", konnekter: "DC CCS", lng: 36.3300, lat: 41.2867, tur: "yuksek" },
  { ad: "Adana Çukurova", sehir: "Adana", guc: "4 × 60 kW", konnekter: "DC CCS", lng: 35.3213, lat: 37.0000, tur: "orta" },
];

export default function MapSection() {
  return (
    <section id="harita" className="relative py-24 md:py-32 bg-gray-50">
      <div className="container-x">
        <div className="mb-8 max-w-3xl">
          <span className="eyebrow" style={{ color: "#1EBBEE" }}>Canlı ağ</span>
          <h2 className="display mt-4 text-4xl md:text-5xl text-gray-900">
            Bir sonraki{" "}
            <span className="gradient-text">şarj durağını</span> bul.
          </h2>
          <p className="mt-5 text-gray-500 text-lg leading-relaxed">
            ConteEco ağı her hafta genişliyor. İstasyonları bul, canlı müsaitliği
            kontrol et ve yolculuğunu birkaç dokunuşla planla.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 520 }}>
          <MapboxMap istasyonlar={ISTASYONLAR} aktifTurler={[...AKTIF_TURLER]} />
        </div>
      </div>
    </section>
  );
}
