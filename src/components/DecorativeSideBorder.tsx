import { useEffect, useRef } from "react";
import { asset } from "../utils/asset";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../utils/gsapSetup";
import styles from "./DecorativeSideBorder.module.css";

/**
 * Fixed decorative framing for wide desktop viewports, built from the actual
 * reference artwork (cropped left/right columns — mandala, garlands, lamps,
 * peacock and lotus) rather than flat icon-style SVG. Hidden below 1180px so
 * it never competes with content or causes mobile overflow. Each side drifts
 * at a slightly different, slow scroll-linked rate for subtle depth.
 */
export function DecorativeSideBorder() {
  const leftRef = useRef<HTMLImageElement | null>(null);
  const rightRef = useRef<HTMLImageElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const { gsap } = ensureGsap();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });
    tl.fromTo(leftRef.current, { y: -40 }, { y: 40, ease: "none" }, 0);
    tl.fromTo(rightRef.current, { y: 30 }, { y: -30, ease: "none" }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <>
      <div className={`${styles.side} ${styles.left}`} aria-hidden="true">
        <img ref={leftRef} className={styles.frameImage} src={asset("/images/decor/wide-left-frame.webp")} alt="" />
      </div>
      <div className={`${styles.side} ${styles.right}`} aria-hidden="true">
        <img ref={rightRef} className={styles.frameImage} src={asset("/images/decor/wide-right-frame.webp")} alt="" />
      </div>
    </>
  );
}
