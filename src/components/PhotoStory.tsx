import { couple, gallery, messages } from "../data/wedding";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";
import section from "../styles/section.module.css";
import styles from "./PhotoStory.module.css";

export function PhotoStory() {
  const photoA = gallery[0];
  const photoB = gallery[1];
  const photoC = gallery[2] ?? gallery[0];

  return (
    <section id="story" className={styles.wrap}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>{"वर-वधू"}</p>
        <h2 className={section.heading}>
          {couple.groom.name} &amp; {couple.bride.name}
        </h2>
      </Reveal>

      <div className={styles.gallery}>
        <Reveal delay={0.1} className={styles.photoSlot}>
          <PhotoFrame
            className={styles.photo}
            src={photoA?.src}
            alt={photoA?.alt ?? couple.groom.name}
          />
        </Reveal>
        <Reveal delay={0.25} className={styles.photoSlot}>
          <PhotoFrame
            className={styles.photo}
            src={photoB?.src}
            alt={photoB?.alt ?? couple.bride.name}
          />
        </Reveal>
        <Reveal delay={0.4} className={styles.photoSlot}>
          <PhotoFrame
            className={styles.photo}
            src={photoC?.src}
            alt={photoC?.alt ?? `${couple.groom.name} and ${couple.bride.name}`}
          />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className={styles.caption}>{messages.welcomeMessage}</p>
        <p className={`marathi ${styles.captionMarathi}`}>
          {messages.welcomeMessageMarathi}
        </p>
      </Reveal>
    </section>
  );
}
