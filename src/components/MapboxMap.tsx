"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export type Istasyon = {
  ad: string;
  sehir: string;
  guc: string;
  konnekter: string;
  lng: number;
  lat: number;
  tur: "dusuk" | "orta" | "yuksek";
};

const TUR_RENK: Record<string, string> = {
  dusuk: "#7BC142",
  orta: "#1EBBEE",
  yuksek: "#0e7fb8",
};

// Pin SVG marker - logolu teardrop
function pinSvg(renk: string, idx: number) {
  const clipId = `logo-clip-${idx}`;
  const shadowId = `pin-shadow-${idx}`;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="50" viewBox="0 0 38 50">
    <defs>
      <filter id="${shadowId}" x="-30%" y="-10%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
      <clipPath id="${clipId}">
        <circle cx="19" cy="18" r="13"/>
      </clipPath>
    </defs>
    <path d="M19 0C9.611 0 2 7.611 2 17c0 11.84 15.37 30.3 16.25 31.36a1.02 1.02 0 0 0 1.5 0C20.63 47.3 36 28.84 36 17 36 7.611 28.389 0 19 0z"
      fill="${renk}" stroke="white" stroke-width="1.5" filter="url(#${shadowId})"/>
    <circle cx="19" cy="18" r="13" fill="#0a1a10"/>
    <image href="/images/logo.png" x="6" y="5" width="26" height="26" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;
}

// Türkiye illerinin merkez koordinatları
const ILLER: Record<string, [number, number]> = {
  "Adana": [35.3213, 37.0],
  "Adıyaman": [38.2766, 37.7648],
  "Afyonkarahisar": [30.5391, 38.7507],
  "Ağrı": [43.0503, 39.7191],
  "Aksaray": [34.0289, 38.3687],
  "Amasya": [35.8333, 40.6499],
  "Ankara": [32.8541, 39.9208],
  "Antalya": [30.7133, 36.8969],
  "Ardahan": [42.7022, 41.1105],
  "Artvin": [41.8183, 41.1828],
  "Aydın": [27.8456, 37.8444],
  "Balıkesir": [27.8859, 39.6484],
  "Bartın": [32.3375, 41.6344],
  "Batman": [41.1327, 37.8812],
  "Bayburt": [40.2249, 40.2552],
  "Bilecik": [29.9792, 40.1500],
  "Bingöl": [40.4982, 38.8855],
  "Bitlis": [42.1232, 38.4007],
  "Bolu": [31.6061, 40.7350],
  "Burdur": [30.2886, 37.7260],
  "Bursa": [29.0610, 40.1885],
  "Çanakkale": [26.4041, 40.1553],
  "Çankırı": [33.6139, 40.6013],
  "Çorum": [34.9556, 40.5506],
  "Denizli": [29.0875, 37.7765],
  "Diyarbakır": [40.2306, 37.9144],
  "Düzce": [31.1565, 40.8438],
  "Edirne": [26.5557, 41.6818],
  "Elazığ": [39.2264, 38.6810],
  "Erzincan": [39.4903, 39.7500],
  "Erzurum": [41.2700, 39.9055],
  "Eskişehir": [30.5206, 39.7767],
  "Gaziantep": [37.3833, 37.0662],
  "Giresun": [38.3894, 40.9128],
  "Gümüşhane": [39.4814, 40.4386],
  "Hakkari": [43.7408, 37.5744],
  "Hatay": [36.1614, 36.4018],
  "Iğdır": [44.0459, 39.9167],
  "Isparta": [30.5541, 37.7648],
  "İstanbul": [29.0126, 41.0796],
  "İzmir": [27.1428, 38.4192],
  "Kahramanmaraş": [36.9371, 37.5858],
  "Karabük": [32.6284, 41.1971],
  "Karaman": [33.2151, 37.1759],
  "Kars": [43.0975, 40.6013],
  "Kastamonu": [33.7757, 41.3887],
  "Kayseri": [35.4826, 38.7312],
  "Kırıkkale": [33.5154, 39.8468],
  "Kırklareli": [27.2253, 41.7333],
  "Kırşehir": [34.1628, 39.1425],
  "Kilis": [37.1153, 36.7184],
  "Kocaeli": [29.9213, 40.7654],
  "Konya": [32.4900, 37.9162],
  "Kütahya": [29.9833, 39.4167],
  "Malatya": [38.3194, 38.3552],
  "Manisa": [27.4292, 38.6191],
  "Mardin": [40.7245, 37.3212],
  "Mersin": [34.6415, 36.8000],
  "Muğla": [28.3665, 37.2153],
  "Muş": [41.4936, 38.7432],
  "Nevşehir": [34.7242, 38.6939],
  "Niğde": [34.6796, 37.9667],
  "Ordu": [37.8797, 40.9839],
  "Osmaniye": [36.2479, 37.0742],
  "Rize": [40.5234, 41.0201],
  "Sakarya": [30.4034, 40.7731],
  "Samsun": [36.3300, 41.2867],
  "Siirt": [41.9408, 37.9333],
  "Sinop": [35.1551, 42.0231],
  "Sivas": [37.0144, 39.7477],
  "Şanlıurfa": [38.7955, 37.1591],
  "Şırnak": [42.4619, 37.4187],
  "Tekirdağ": [27.5139, 40.9781],
  "Tokat": [36.5544, 40.3167],
  "Trabzon": [39.7178, 41.0015],
  "Tunceli": [39.5479, 39.1079],
  "Uşak": [29.4058, 38.6823],
  "Van": [43.3800, 38.4891],
  "Yalova": [29.2776, 40.6500],
  "Yozgat": [34.8072, 39.8181],
  "Zonguldak": [31.7963, 41.4564],
};

type Props = {
  istasyonlar: Istasyon[];
  aktifTurler: string[];
};

export default function MapboxMap({ istasyonlar, aktifTurler }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [adres, setAdres] = useState("");
  const [seciliIl, setSeciliIl] = useState("");
  const [oneriList, setOneriList] = useState<{ place_name: string; center: [number, number] }[]>([]);
  const [oneriAcik, setOneriAcik] = useState(false);

  // Harita yükle
  useEffect(() => {
    if (!containerRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [35.2, 39.0],
      zoom: 5.2,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Markerları güncelle
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const addMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      istasyonlar
        .filter((s) => aktifTurler.includes(s.tur))
        .forEach((s, idx) => {
          const renk = TUR_RENK[s.tur];
          const el = document.createElement("div");
          el.innerHTML = pinSvg(renk, idx);
          el.style.cssText = "cursor:pointer; display:flex; align-items:flex-end; width:32px; height:42px;";

          const popup = new mapboxgl.Popup({
            offset: [0, -40],
            closeButton: false,
            className: "conteco-popup",
          }).setHTML(`
            <div style="font-family:'Inter',sans-serif;padding:2px 0;max-width:220px">
              <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;font-weight:500">${s.sehir}</div>
              <div style="font-size:14px;font-weight:700;color:#111827;margin-top:2px">${s.ad}</div>
              <p style="margin:10px 0 0;font-size:13px;line-height:1.45;color:#374151">
                <strong style="color:#0e7c6e">Çok yakında geleceğiz.</strong> Bu istasyonda hizmete başlamak için çalışıyoruz; güncellemeler için bizi takip edin.
              </p>
            </div>
          `);

          const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
            .setLngLat([s.lng, s.lat])
            .setPopup(popup)
            .addTo(map);

          markersRef.current.push(marker);
        });
    };

    if (map.isStyleLoaded()) {
      addMarkers();
    } else {
      map.once("load", addMarkers);
    }
  }, [istasyonlar, aktifTurler]);

  // İl seçilince zoom
  const ilSecHandler = useCallback((il: string) => {
    setSeciliIl(il);
    setAdres("");
    setOneriList([]);
    setOneriAcik(false);
    const coords = ILLER[il];
    if (coords && mapRef.current) {
      mapRef.current.flyTo({ center: coords, zoom: 9, duration: 1400, essential: true });
    }
  }, []);

  // Adres arama (Mapbox Geocoding)
  const adresAra = useCallback(async (val: string) => {
    setAdres(val);
    setOneriAcik(true);
    if (val.length < 2) { setOneriList([]); return; }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(val)}.json?country=tr&language=tr&access_token=${token}&limit=5`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      setOneriList(
        (json.features ?? []).map((f: { place_name: string; center: [number, number] }) => ({
          place_name: f.place_name,
          center: f.center,
        }))
      );
    } catch {
      setOneriList([]);
    }
  }, []);

  const oneriSec = useCallback((item: { place_name: string; center: [number, number] }) => {
    setAdres(item.place_name);
    setOneriList([]);
    setOneriAcik(false);
    mapRef.current?.flyTo({ center: item.center, zoom: 13, duration: 1400, essential: true });
  }, []);

  return (
    <>
      <style>{`
        .conteco-popup .mapboxgl-popup-content {
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          border: 1px solid #e5e7eb;
          min-width: 180px;
        }
        .conteco-popup .mapboxgl-popup-tip { display: none; }
        .mapboxgl-ctrl-group { border-radius: 10px !important; overflow: hidden; border: 1px solid #e5e7eb !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important; }
        .mapboxgl-ctrl-group button { border: none !important; }
      `}</style>

      <div className="relative w-full h-full">
        {/* Arama paneli - sol üst */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2" style={{ minWidth: 240, maxWidth: 300 }}>
          {/* Adres arama */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 shadow-md px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Adres ara..."
                value={adres}
                onChange={(e) => adresAra(e.target.value)}
                onFocus={() => adres && setOneriAcik(true)}
                onBlur={() => setTimeout(() => setOneriAcik(false), 150)}
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {adres && (
                <button onClick={() => { setAdres(""); setOneriList([]); }} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            {oneriAcik && oneriList.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                {oneriList.map((item, i) => (
                  <button
                    key={i}
                    onMouseDown={() => oneriSec(item)}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <span className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="leading-snug">{item.place_name}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* İl seçici */}
          <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 shadow-md px-3 py-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l9-18 9 18M9 12h6"/>
            </svg>
            <select
              value={seciliIl}
              onChange={(e) => ilSecHandler(e.target.value)}
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
            >
              <option value="">İl seçin...</option>
              {Object.keys(ILLER).sort().map((il) => (
                <option key={il} value={il}>{il}</option>
              ))}
            </select>
          </div>
        </div>

        <div ref={containerRef} className="w-full h-full" />
      </div>
    </>
  );
}
