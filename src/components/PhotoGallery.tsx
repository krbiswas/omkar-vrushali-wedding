import { useState } from "react";
import { gallery } from "../data/wedding";
import { Reveal } from "./Reveal";
import section from "../styles/section.module.css";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = gallery.find((g) => g.id === activeId) ?? null;

  return (
    <section id="gallery" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>छायाचित्रे</p>
        <h2 className={section.heading}>Gallery</h2>
        <div className={section.divider} />
      </Reveal>

      {gallery.length === 0 ? (
        <Reveal delay={0.1}>
          <p className={section.pendingNote}>Photos will be added here soon — stay tuned!</p>
        </Reveal>
      ) : (
        <div className={styles.grid}>
          {gallery.map((img, i) => (
            <Reveal key={img.id} delay={(i % 6) * 0.07}>
              <button
                type="button"
                className={styles.item}
                onClick={() => setActiveId(img.id)}
                aria-label={`View photo: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setActiveId(null)}>
          <img src={active.src} alt={active.alt} />
          {active.caption && <p className={styles.caption}>{active.caption}</p>}
          <button type="button" className={styles.close} onClick={() => setActiveId(null)} aria-label="Close">
            ×
          </button>
        </div>
      )}
    </section>
  );
}
