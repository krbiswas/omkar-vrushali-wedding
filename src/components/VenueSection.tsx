import { MapPin } from "lucide-react";
import { wedding } from "../data/wedding";
import { Reveal } from "./Reveal";
import { AnimatedPandit } from "./AnimatedPandit";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import section from "../styles/section.module.css";
import styles from "./VenueSection.module.css";

export function VenueSection() {
  const { venue } = wedding;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="venue" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>स्थळ</p>
        <h2 className={section.heading}>Venue</h2>
        <div className={section.divider} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.venueLayout}>
          <div className={styles.panditScene}>
            <AnimatedPandit reducedMotion={reducedMotion} />
          </div>

          <div className={styles.venueCard}>
            <div className={styles.cardInner}>
              <div className={styles.topBorder} />
              <p className={styles.venueName}>
                <MapPin size={18} aria-hidden="true" />
                {venue.name}
              </p>
              <p className={styles.address}>
                {venue.fullAddress ?? "Full address to be announced soon"}
              </p>
              {venue.mapUrl ? (
                <a className={styles.directionsButton} href={venue.mapUrl} target="_blank" rel="noreferrer">
                  <MapPin size={14} aria-hidden="true" />
                  Get Directions
                </a>
              ) : (
                <button type="button" className={styles.directionsButtonDisabled} disabled>
                  Directions coming soon
                </button>
              )}
              <div className={styles.bottomBorder} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
