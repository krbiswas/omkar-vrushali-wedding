import { useState } from "react";
import { ScratchReveal } from "./ScratchReveal";
import { RevealPetalShower } from "./RevealPetalShower";
import { Reveal } from "./Reveal";
import { FloatingPetals } from "./FloatingPetals";
import { SwastikMotif } from "./Motifs";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { couple, messages } from "../data/wedding";
import section from "../styles/section.module.css";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [scratchRevealed, setScratchRevealed] = useState(false);

  return (
    <section id="home" className={`${section.section} ${styles.hero}`}>
      <FloatingPetals />
      <Reveal>
        <SwastikMotif className={styles.swastik} />
        <p className={`marathi ${section.eyebrow}`}>{messages.openingBlessing}</p>
        <h1 className={styles.names}>
          {couple.groom.name} <span className={styles.amp}>&amp;</span> {couple.bride.name}
        </h1>
        <p className={styles.tagline}>{messages.invitationTitle} · {messages.invitationSubtitle}</p>
      </Reveal>
      <Reveal delay={0.15} className={styles.scratchWrap}>
        <ScratchReveal onReveal={() => setScratchRevealed(true)} />
      </Reveal>
      {!reducedMotion && <RevealPetalShower active={scratchRevealed} />}
    </section>
  );
}
