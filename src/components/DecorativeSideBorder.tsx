import { BrassLampMotif, FlowerGarlandMotif, PaisleyMotif, PeacockLotusCluster } from "./Motifs";
import { MandalaMotif } from "./MandalaMotif";
import styles from "./DecorativeSideBorder.module.css";

/**
 * Fixed decorative framing for wide desktop viewports: a brass lamp, flower
 * garland, a large partly-cropped side mandala, and a peacock-and-lotus
 * cluster down each edge. Hidden below 1180px so it never competes with
 * content or causes mobile overflow. Mirrors the wide reference's side
 * panels without ever sitting behind the central couple-name scene.
 */
export function DecorativeSideBorder() {
  return (
    <>
      <div className={`${styles.side} ${styles.left}`} aria-hidden="true">
        <MandalaMotif className={styles.sideMandala} id="side-mandala-left" />
        <div className={styles.column}>
          <BrassLampMotif className={styles.lamp} />
          <FlowerGarlandMotif className={styles.garland} />
          <PaisleyMotif className={styles.paisley} />
          <PeacockLotusCluster className={styles.peacockCluster} />
        </div>
      </div>
      <div className={`${styles.side} ${styles.right}`} aria-hidden="true">
        <MandalaMotif className={styles.sideMandala} id="side-mandala-right" />
        <div className={styles.column}>
          <BrassLampMotif className={styles.lamp} />
          <FlowerGarlandMotif className={styles.garland} />
          <PaisleyMotif className={styles.paisley} />
          <PeacockLotusCluster className={styles.peacockCluster} />
        </div>
      </div>
    </>
  );
}
