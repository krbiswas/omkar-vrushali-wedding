import { dressCode } from "../data/wedding";
import { Reveal } from "./Reveal";
import section from "../styles/section.module.css";
import styles from "./DressCode.module.css";

export function DressCode() {
  return (
    <section id="dress-code" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>पोशाख सूचना</p>
        <h2 className={section.heading}>Dress Code</h2>
        <div className={section.divider} />
      </Reveal>

      {dressCode.length === 0 ? (
        <Reveal delay={0.1}>
          <p className={section.pendingNote}>Dress code suggestions will be shared closer to the date.</p>
        </Reveal>
      ) : (
        <div className={styles.grid}>
          {dressCode.map((entry, i) => (
            <Reveal key={entry.audience} delay={i * 0.1}>
              <div className={styles.card}>
                <h3 className={styles.audience}>{entry.audience}</h3>
                <p className={styles.description}>{entry.description}</p>
                {entry.colors && entry.colors.length > 0 && (
                  <div className={styles.swatches}>
                    {entry.colors.map((c) => (
                      <span key={c} className={styles.swatch} style={{ background: c }} title={c} />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
