import { useEffect, useRef } from "react";
import { messages } from "../data/wedding";
import { PeacockMotif } from "./Motifs";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../utils/gsapSetup";
import styles from "./LandscapeScene.module.css";

function MountainLayer({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
      <path
        d="M0,200 L0,120 L80,70 L160,110 L260,40 L340,100 L420,55 L520,115 L600,60 L700,105 L800,80 L800,200 Z"
        fill={color}
      />
    </svg>
  );
}

function TempleSilhouette() {
  return (
    <svg viewBox="0 0 160 220" aria-hidden="true">
      <g fill="var(--color-maroon-900)">
        <rect x="55" y="160" width="50" height="60" />
        <rect x="40" y="140" width="80" height="22" />
        <rect x="50" y="110" width="60" height="32" />
        <rect x="58" y="85" width="44" height="28" />
        <rect x="65" y="62" width="30" height="26" />
        <polygon points="80,30 100,62 60,62" />
        <circle cx="80" cy="22" r="6" />
        <rect x="76" y="6" width="8" height="18" />
      </g>
    </svg>
  );
}

function TreeLine() {
  return (
    <svg viewBox="0 0 800 140" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
      <g fill="var(--color-green-600)" opacity="0.9">
        {Array.from({ length: 14 }).map((_, i) => {
          const x = i * 60 + (i % 2 === 0 ? 0 : 20);
          const h = 70 + (i % 3) * 18;
          return <polygon key={i} points={`${x},140 ${x + 30},140 ${x + 15},${140 - h}`} />;
        })}
      </g>
      <rect y="120" width="800" height="20" fill="var(--color-ink-900)" opacity="0.5" />
    </svg>
  );
}

export function LandscapeScene() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const farRef = useRef<HTMLDivElement | null>(null);
  const nearRef = useRef<HTMLDivElement | null>(null);
  const templeRef = useRef<HTMLDivElement | null>(null);
  const peacockRef = useRef<HTMLDivElement | null>(null);
  const treesRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = ensureGsap();

    gsap.set(templeRef.current, { opacity: 0, y: 24 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    tl.fromTo(farRef.current, { y: -30 }, { y: 30, ease: "none" }, 0)
      .fromTo(nearRef.current, { y: -60 }, { y: 60, ease: "none" }, 0)
      .fromTo(treesRef.current, { y: -90 }, { y: 90, ease: "none" }, 0)
      .fromTo(peacockRef.current, { y: -20, x: -10 }, { y: 20, x: 10, ease: "none" }, 0)
      .to(templeRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.15);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="landscape" className={styles.section} ref={sectionRef} aria-label="Illustrated Maharashtrian landscape">
      <div className={`${styles.layer} ${styles.mountainsFar}`} ref={farRef}>
        <MountainLayer color="rgba(74,13,26,0.35)" />
      </div>
      <div className={`${styles.layer} ${styles.mountainsNear}`} ref={nearRef}>
        <MountainLayer color="rgba(74,13,26,0.6)" />
      </div>
      <div className={`${styles.layer} ${styles.temple}`} ref={templeRef}>
        <TempleSilhouette />
      </div>
      <div className={`${styles.layer} ${styles.peacock}`} ref={peacockRef}>
        <PeacockMotif className={styles.peacock} />
      </div>
      <div className={`${styles.layer} ${styles.trees}`} ref={treesRef}>
        <TreeLine />
      </div>
      <p className={styles.caption}>{messages.landscapeCaption}</p>
    </section>
  );
}
