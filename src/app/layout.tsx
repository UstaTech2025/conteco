import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConteEco Charging — Sürdürülebilir EV Şarjı, Her Yerde.",
  description:
    "ConteEco Charging, akıllı ve %100 yenilenebilir enerjili elektrikli araç şarj ağı kuruyor. Tak, şarj et, yola çık — temiz enerjiyle.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
          type="module"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
