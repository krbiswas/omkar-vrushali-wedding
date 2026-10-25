import { motion, AnimatePresence } from "framer-motion";
import { couple, messages } from "../data/wedding";
import { GaneshMotif } from "./Motifs";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { asset } from "../utils/asset";
import styles from "./IntroCover.module.css";

interface IntroCoverProps {
  open: boolean;
  onOpen: () => void;
}

export function IntroCover({ open, onOpen }: IntroCoverProps) {
  const reducedMotion = usePrefersReducedMotion();

  const handleOpen = () => onOpen();
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className={styles.cover}
          role="button"
          tabIndex={0}
          aria-label={messages.openInstruction}
          onClick={handleOpen}
          onKeyDown={handleKey}
          initial={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className={styles.frame}>
            <img className={`${styles.ornament} ${styles.topLeft}`} src={asset("/images/decor/portrait-top-left.webp")} alt="" aria-hidden="true" />
            <img className={`${styles.ornament} ${styles.topRight}`} src={asset("/images/decor/portrait-top-right.webp")} alt="" aria-hidden="true" />
            <img className={`${styles.sideStrip} ${styles.left}`} src={asset("/images/decor/portrait-left-strip.webp")} alt="" aria-hidden="true" />
            <img className={`${styles.sideStrip} ${styles.right}`} src={asset("/images/decor/portrait-right-strip.webp")} alt="" aria-hidden="true" />
            <img className={`${styles.ornament} ${styles.bottomLeft}`} src={asset("/images/decor/portrait-bottom-left.webp")} alt="" aria-hidden="true" />
            <img className={`${styles.ornament} ${styles.bottomRight}`} src={asset("/images/decor/portrait-bottom-right.webp")} alt="" aria-hidden="true" />

            <div className={styles.content}>
              <GaneshMotif className={`${styles.motif} ${reducedMotion ? "" : styles.pulse}`} />
              <p className={`marathi ${styles.blessing}`}>{messages.openingBlessing}</p>
              <h1 className={styles.names}>
                {couple.groom.name}
                <span className={styles.amp}>&amp;</span>
                {couple.bride.name}
              </h1>
              <p className={styles.subtitle}>{messages.invitationSubtitle}</p>
              <p className={styles.instruction}>{messages.openInstruction}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
