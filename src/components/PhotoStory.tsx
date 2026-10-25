import { useEffect, useRef } from "react";
import { couple, gallery, messages } from "../data/wedding";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ensureGsap } from "../utils/gsapSetup";
import section from "../styles/section.module.css";
import styles from "./PhotoStory.module.css";

export function PhotoStory() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const photoARef = useRef<HTMLDivElement | null>(null);
  const photoBRef = useRef<HTMLDivElement | null>(null);
  const photoCRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const photoA = gallery[0];
  const photoB = gallery[1];
  const photoC = gallery[2] ?? gallery[0];

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const { gsap } = ensureGsap();

    gsap.set(photoARef.current, { x: "-120%", y: 20, rotate: -6, opacity: 0 });
    gsap.set(photoBRef.current, { x: "120%", y: -10, rotate: 5, opacity: 0 });
    gsap.set(photoCRef.current, { scale: 0.7, opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 24 });
    gsap.set(captionRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: stage,
      },
    });

    tl.to(photoARef.current, { x: "-28%", y: 0, rotate: -2, opacity: 1, duration: 1, ease: "power2.out" })
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.6 }, "<0.2")
      .to(photoARef.current, { x: "-55%", scale: 0.85, opacity: 0.35, duration: 1 }, "+=0.4")
      .to(photoBRef.current, { x: "28%", y: 0, rotate: 2, opacity: 1, duration: 1, ease: "power2.out" }, "<")
      .to(textRef.current, { opacity: 0, y: -16, duration: 0.5 }, "<")
      .to(photoBRef.current, { x: "55%", scale: 0.85, opacity: 0.3, duration: 1 }, "+=0.4")
      .to(photoCRef.current, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, "<")
      .to(captionRef.current, { opacity: 1, duration: 0.6 }, "<0.3");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="story" className={styles.staticWrap}>
        <Reveal>
          <p className={`marathi ${section.eyebrow}`}>{"वधू-वर"}</p>
          <h2 className={section.heading}>
            {couple.groom.name} &amp; {couple.bride.name}
          </h2>
          <p className={section.body}>{messages.welcomeMessage}</p>
          {couple.coupleStory && <p className={section.body}>{couple.coupleStory}</p>}
        </Reveal>
        <div className={styles.staticPhotos}>
          {[photoA, photoB, gallery[2]].filter(Boolean).map((photo, i) => (
            <Reveal key={photo?.id ?? i} delay={i * 0.1}>
              <PhotoFrame className={styles.staticPhoto} src={photo?.src} alt={photo?.alt ?? `${couple.groom.name} and ${couple.bride.name}`} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="story" className={styles.track} ref={trackRef}>
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.photoA} ref={photoARef}>
          <PhotoFrame src={photoA?.src} alt={photoA?.alt ?? couple.groom.name} />
        </div>
        <div className={styles.photoB} ref={photoBRef}>
          <PhotoFrame src={photoB?.src} alt={photoB?.alt ?? couple.bride.name} />
        </div>
        <div className={styles.photoC} ref={photoCRef}>
          <PhotoFrame src={photoC?.src} alt={photoC?.alt ?? `${couple.groom.name} and ${couple.bride.name}`} />
        </div>

        <div className={styles.textBlock} ref={textRef}>
          <p className={`marathi ${styles.eyebrow}`}>{"वधू-वर"}</p>
          <h2 className={styles.names}>
            {couple.groom.name} &amp; {couple.bride.name}
          </h2>
          {couple.coupleStory && <p className={styles.story}>{couple.coupleStory}</p>}
        </div>

        <p className={`marathi ${styles.finalCaption}`} ref={captionRef}>
          {messages.welcomeMessage}
        </p>
      </div>
    </section>
  );
}
