import { useState } from "react";
import { gallery } from "../data/wedding";
import { Reveal } from "./Reveal";
import { PhotoFrame } from "./PhotoFrame";
import { asset } from "../utils/asset";
import section from "../styles/section.module.css";
import styles from "./PhotoGallery.module.css";

export function PhotoGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightboxErrored, setLightboxErrored] = useState(false);
  const active = gallery.find((g) => g.id === activeId) ?? null;

  const openLightbox = (id: string) => {
    setLightboxErrored(false);
    setActiveId(id);
  };

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
                onClick={() => openLightbox(img.id)}
                aria-label={`View photo: ${img.alt}`}
              >
                <PhotoFrame src={img.src} alt={img.alt} />
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setActiveId(null)}>
          {lightboxErrored ? (
            <div className={styles.lightboxFallback} onClick={(e) => e.stopPropagation()}>
              <PhotoFrame src={undefined} alt={active.alt} />
            </div>
          ) : (
            <img
              src={asset(active.src)}
              alt={active.alt}
              onClick={(e) => e.stopPropagation()}
              onError={() => setLightboxErrored(true)}
            />
          )}
          {active.caption && <p className={styles.caption}>{active.caption}</p>}
          <button type="button" className={styles.close} onClick={() => setActiveId(null)} aria-label="Close">
            ×
          </button>
        </div>
      )}
    </section>
  );
}
