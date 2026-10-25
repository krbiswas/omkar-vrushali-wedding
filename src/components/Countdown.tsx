import { useCountdown } from "../hooks/useCountdown";
import { wedding } from "../data/wedding";
import styles from "./Countdown.module.css";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

export function Countdown() {
  const countdown = useCountdown(wedding.date, wedding.defaultCeremonyTime, wedding.timezone);

  if (!countdown.isValid) {
    return <p className={styles.complete}>Wedding date coming soon.</p>;
  }

  if (countdown.isComplete) {
    return <p className={styles.complete}>The celebration has begun — thank you for being part of our journey! 🎉</p>;
  }

  return (
    <div>
      <div className={styles.grid}>
        {UNITS.map((unit) => (
          <div className={styles.unit} key={unit}>
            <span className={styles.value}>{String(countdown[unit]).padStart(2, "0")}</span>
            <span className={styles.label}>{unit}</span>
          </div>
        ))}
      </div>
      <p className={styles.timeNote}>
        Ceremony time shown is provisional (IST) and will be updated once confirmed.
      </p>
    </div>
  );
}
