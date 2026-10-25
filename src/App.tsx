import { useState } from "react";
import { IntroCover } from "./components/IntroCover";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { MandalaWelcome } from "./components/MandalaWelcome";
import { PhotoStory } from "./components/PhotoStory";
import { PhotoGallery } from "./components/PhotoGallery";
import { LandscapeScene } from "./components/LandscapeScene";
import { CountdownSection } from "./components/CountdownSection";
import { EventTimeline } from "./components/EventTimeline";
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
        <MandalaWelcome />
        <PhotoStory />
        <PhotoGallery />
        <LandscapeScene />
        <CountdownSection />
        <EventTimeline />
        <VenueSection />
        <ClosingSection />
      </main>
      <MusicPlayer />
    </>
  );
}

export default App;
