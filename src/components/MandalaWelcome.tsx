import { couple, messages } from "../data/wedding";
import { MandalaMotif } from "./MandalaMotif";
import { LotusMotif } from "./Motifs";
import { Reveal } from "./Reveal";
import styles from "./MandalaWelcome.module.css";

/**
 * A restrained welcome scene. An earlier version used one large mandala
 * centered behind the names — removed per feedback that it felt oversized
 * and competed with the content. Small corner mandalas now provide subtle,
 * slow-rotating ornamentation instead of dominating the composition.
 */
export function MandalaWelcome() {
  return (
    <section id="mandala" className={styles.section}>
      <MandalaMotif className={`${styles.cornerMotif} ${styles.topLeft}`} id="mandala-corner-a" />
      <MandalaMotif className={`${styles.cornerMotif} ${styles.bottomRight}`} id="mandala-corner-b" />

      <Reveal>
        <p className={`marathi ${styles.eyebrow}`}>{messages.mandalaEyebrow}</p>
        <h2 className={styles.names}>
          {couple.groom.name} &amp; {couple.bride.name}
        </h2>
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <LotusMotif className={styles.dividerIcon} />
          <span className={`${styles.dividerLine} ${styles.right}`} />
        </div>
        <p className={styles.caption}>{messages.mandalaCaption}</p>
      </Reveal>
    </section>
  );
}
