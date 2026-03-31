import { useRef } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";
import { MapSection } from "./components/MapSection";
import { AboutSection } from "./components/AboutSection";
import { SourcesSection } from "./components/SourcesSection";
import { HowToUseSection } from "./components/HowToUseSection";
import { Footer } from "./components/Footer";

export default function App() {
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-[#E8E3D6]">
        {/* Hero Section */}
        <HeroSection onStartClick={handleStartClick} />

        {/* Map Section - интерактивная карта с объектами */}
        <div id="map" ref={mapSectionRef}>
          <MapSection />
        </div>

        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* How to Use Section */}
        <div id="how-to">
          <HowToUseSection />
        </div>

        {/* Sources Section */}
        <div id="sources">
          <SourcesSection />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
