import { useEffect, useRef } from "react";
import { gallery, messages } from "../data/wedding";
import { PhotoFrame } from "./PhotoFrame";
import { PeacockMotif } from "./Motifs";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../utils/gsapSetup";
import styles from "./LandscapeScene.module.css";

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
  const photoRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const banner = gallery[3] ?? gallery[0];

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = ensureGsap();

    gsap.set(photoRef.current, { opacity: 0, scale: 0.85, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "center center",
        scrub: 0.6,
      },
    });

    tl.to(photoRef.current, { opacity: 1, scale: 1, y: 0, ease: "none" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="landscape" className={styles.section} aria-label="Koregaon" ref={sectionRef}>
      <div className={styles.treeline}>
        <TreeLine />
      </div>
      <PeacockMotif className={styles.peacockAccent} />

      <div className={styles.photoWrap} ref={photoRef}>
        <PhotoFrame src={banner?.src} alt={banner?.alt ?? "Omkar and Vrushali in Koregaon"} />
      </div>

      <p className={styles.caption}>{messages.landscapeCaption}</p>
      <p className={`marathi ${styles.blessing}`}>{messages.landscapeBlessing}</p>
    </section>
  );
}
