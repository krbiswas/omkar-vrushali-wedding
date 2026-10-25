import { useEffect, useRef } from "react";
import { couple, messages } from "../data/wedding";
import { MandalaMotif } from "./MandalaMotif";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../utils/gsapSetup";
import styles from "./MandalaWelcome.module.css";

export function MandalaWelcome() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    const rings = section.querySelectorAll(".mandala-ring");
    const petals = section.querySelectorAll(".mandala-petal");
    const core = section.querySelector(".mandala-core");

    if (reducedMotion) {
      rings.forEach((el) => el.setAttribute("style", "stroke-dashoffset: 0;"));
      petals.forEach((el) => el.setAttribute("style", "opacity: 0.85; transform: scale(1);"));
      overlay.style.opacity = "1";
      return;
    }

    const { gsap } = ensureGsap();

    rings.forEach((el) => {
      gsap.set(el, { strokeDasharray: 100, strokeDashoffset: 100 });
    });
    petals.forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 0.4 });
    });
    gsap.set(overlay, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "center center",
        scrub: 0.6,
      },
    });

    tl.to(rings, { strokeDashoffset: 0, stagger: 0.15, ease: "none" })
      .to(petals, { opacity: 0.85, scale: 1, stagger: 0.02, ease: "power1.out" }, "<0.1")
      .to(core, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 }, ">-0.2")
      .to(overlay, { opacity: 1, y: 0, duration: 0.3 }, ">-0.2");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="mandala" className={styles.section} ref={sectionRef}>
      <div className={styles.stage}>
        <MandalaMotif className={styles.mandala} id="mandala" />
        <div className={styles.overlay} ref={overlayRef}>
          <p className={`marathi ${styles.eyebrow}`}>{messages.mandalaEyebrow}</p>
          <h2 className={styles.names}>
            {couple.groom.name} &amp; {couple.bride.name}
          </h2>
          <p className={styles.caption}>{messages.mandalaCaption}</p>
        </div>
      </div>
    </section>
  );
}
