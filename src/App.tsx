import { useState } from "react";
import { IntroCover } from "./components/IntroCover";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { CoupleIntroduction } from "./components/CoupleIntroduction";
import { CountdownSection } from "./components/CountdownSection";
import { EventTimeline } from "./components/EventTimeline";
import { DressCode } from "./components/DressCode";
import { PhotoGallery } from "./components/PhotoGallery";
import { VenueSection } from "./components/VenueSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { ClosingSection } from "./components/ClosingSection";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <IntroCover open={opened} onOpen={() => setOpened(true)} />
      <Navigation />
      <main>
        <HeroSection />
        <CoupleIntroduction />
        <CountdownSection />
        <EventTimeline />
        <DressCode />
        <PhotoGallery />
        <VenueSection />
        <ClosingSection />
      </main>
      <MusicPlayer />
    </>
  );
}

export default App;
