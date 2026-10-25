import { motion, AnimatePresence } from "framer-motion";
import { couple, messages } from "../data/wedding";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./IntroCover.module.css";

interface IntroCoverProps {
  open: boolean;
  onOpen: () => void;
}

function SwastikIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 12 L32 52" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 32 L52 32" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 12 L43 12" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 32 L52 43" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 52 L21 52" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 32 L12 21" stroke="var(--color-saffron-500)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="2.5" fill="var(--color-maroon-500)" opacity="0.6" />
      <circle cx="42" cy="22" r="2.5" fill="var(--color-maroon-500)" opacity="0.6" />
      <circle cx="42" cy="42" r="2.5" fill="var(--color-maroon-500)" opacity="0.6" />
      <circle cx="22" cy="42" r="2.5" fill="var(--color-maroon-500)" opacity="0.6" />
    </svg>
  );
}

function FloralCorner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Leaves */}
      <path d="M8 110 Q6 70 25 45 Q12 65 15 95 Z" fill="var(--color-green-600)" opacity="0.7" />
      <path d="M0 115 Q-2 55 35 18 Q15 50 12 95 Z" fill="var(--color-green-600)" opacity="0.5" />
      <path d="M20 100 Q22 60 50 35 Q35 55 30 85 Z" fill="var(--color-green-600)" opacity="0.4" />
      {/* Main flower */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse key={i} cx="42" cy="30" rx="6" ry="14" fill="var(--color-maroon-500)" opacity={0.7} transform={`rotate(${angle} 42 30)`} />
      ))}
      <circle cx="42" cy="30" r="9" fill="var(--color-saffron-500)" />
      <circle cx="42" cy="30" r="5" fill="var(--color-gold-500)" />
      <circle cx="42" cy="30" r="2.5" fill="var(--color-gold-300)" />
      {/* Second flower */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={i} cx="18" cy="55" rx="4" ry="10" fill="var(--color-saffron-500)" opacity={0.6} transform={`rotate(${angle} 18 55)`} />
      ))}
      <circle cx="18" cy="55" r="6" fill="var(--color-maroon-700)" opacity="0.8" />
      <circle cx="18" cy="55" r="3" fill="var(--color-gold-500)" />
      {/* Small buds */}
      <circle cx="60" cy="16" r="5" fill="var(--color-saffron-500)" opacity="0.6" />
      <circle cx="60" cy="16" r="2.5" fill="var(--color-gold-300)" />
      <circle cx="10" cy="78" r="4" fill="var(--color-maroon-500)" opacity="0.5" />
      <circle cx="10" cy="78" r="2" fill="var(--color-saffron-300)" />
      <circle cx="55" cy="42" r="3.5" fill="var(--color-saffron-500)" opacity="0.45" />
      <circle cx="55" cy="42" r="1.8" fill="var(--color-gold-300)" />
      {/* Leaf veins */}
      <path d="M6 95 Q10 75 22 55" stroke="var(--color-green-600)" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M4 105 Q8 70 30 35" stroke="var(--color-green-600)" strokeWidth="0.5" fill="none" opacity="0.3" />
    </svg>
  );
}

function GarlandStrip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 8 Q75 35 150 8 Q225 35 300 8" fill="none" stroke="var(--color-gold-500)" strokeWidth="1" opacity="0.5" />
      {[30, 75, 120, 150, 180, 225, 270].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={12 + (i % 2) * 14} r={3 + (i % 3)} fill={i % 2 === 0 ? "var(--color-saffron-500)" : "var(--color-maroon-500)"} opacity="0.7" />
          <circle cx={x} cy={12 + (i % 2) * 14} r={1.5 + (i % 2)} fill="var(--color-gold-300)" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function PetalShower() {
  const petals = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 5 + ((i * 31 + 7) % 90),
    size: 8 + (i % 4) * 3,
    delay: i * 1.8,
    duration: 7 + (i % 3) * 3,
    color: i % 3 === 0 ? "#b3273a" : i % 3 === 1 ? "#d94f5c" : "#e8762c",
  }));

  return (
    <div className={styles.petalShower} aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.id}
          className={styles.coverPetal}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0 C13 3 14 9 8 16 C2 9 3 3 8 0 Z" fill={p.color} opacity="0.7" />
        </svg>
      ))}
    </div>
  );
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
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {!reducedMotion && <PetalShower />}

          <div className={styles.card}>
            <FloralCorner className={`${styles.corner} ${styles.topLeft}`} />
            <FloralCorner className={`${styles.corner} ${styles.topRight}`} />
            <FloralCorner className={`${styles.corner} ${styles.bottomLeft}`} />
            <FloralCorner className={`${styles.corner} ${styles.bottomRight}`} />

            <GarlandStrip className={styles.garlandTop} />

            <div className={styles.innerBorder}>
              <div className={styles.content}>
                <SwastikIcon className={styles.swastik} />

                <p className={`marathi ${styles.blessing}`}>
                  {messages.openingBlessing}
                </p>

                <div className={styles.divider} />

                <h1 className={styles.names}>
                  <span className={styles.groom}>{couple.groom.name}</span>
                  <span className={styles.amp}>&amp;</span>
                  <span className={styles.bride}>{couple.bride.name}</span>
                </h1>

                <div className={styles.divider} />

                <p className={`marathi ${styles.subtitle}`}>
                  लग्न पत्रिका
                </p>
                <p className={styles.subtitleEn}>
                  {messages.invitationSubtitle}
                </p>

                <button
                  type="button"
                  className={`${styles.ctaButton} ${reducedMotion ? "" : styles.ctaPulse}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                >
                  {messages.openInstruction}
                </button>
              </div>
            </div>

            <GarlandStrip className={styles.garlandBottom} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
