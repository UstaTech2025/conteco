import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppSteps from "@/components/AppSteps";
import Stats from "@/components/Stats";
import MapSection from "@/components/MapSection";
import WhoWeAre from "@/components/WhoWeAre";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <AppSteps />
      <Stats />
      <MapSection />
      <WhoWeAre />
      <Partners />
      <Footer />
      <ChatBot />
    </main>
  );
}
