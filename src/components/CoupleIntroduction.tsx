import { couple, messages } from "../data/wedding";
import { Reveal } from "./Reveal";
import { LotusMotif } from "./Motifs";
import { asset } from "../utils/asset";
import section from "../styles/section.module.css";
import styles from "./CoupleIntroduction.module.css";

function PortraitSlot({ src, label }: { src: string | null; label: string }) {
  return (
    <div className={styles.portrait}>
      {src ? (
        <img src={asset(src)} alt={label} loading="lazy" />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={`${label} photo coming soon`}>
          <LotusMotif className={styles.placeholderMotif} />
        </div>
      )}
      <span className={styles.portraitCaption}>{label}</span>
    </div>
  );
}

export function CoupleIntroduction() {
  return (
    <section id="couple" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>वधू-वर</p>
        <h2 className={section.heading}>
          {couple.groom.name} &amp; {couple.bride.name}
        </h2>
        <div className={section.divider} />
        <p className={section.body}>{messages.welcomeMessage}</p>
      </Reveal>

      {couple.photos.couplePhoto && (
        <Reveal delay={0.1}>
          <div className={styles.featuredPhoto}>
            <img src={asset(couple.photos.couplePhoto)} alt={`${couple.groom.name} and ${couple.bride.name}`} loading="lazy" />
          </div>
        </Reveal>
      )}

      <div className={styles.portraits}>
        <Reveal delay={0.15}>
          <PortraitSlot src={couple.photos.groomPortrait} label={couple.groom.name} />
        </Reveal>
        <Reveal delay={0.25}>
          <PortraitSlot src={couple.photos.bridePortrait} label={couple.bride.name} />
        </Reveal>
      </div>

      {couple.coupleStory && (
        <Reveal delay={0.3}>
          <p className={section.body}>{couple.coupleStory}</p>
        </Reveal>
      )}
    </section>
  );
}
