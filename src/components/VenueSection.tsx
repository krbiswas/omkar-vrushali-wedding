import { MapPin } from "lucide-react";
import { wedding } from "../data/wedding";
import { Reveal } from "./Reveal";
import { asset } from "../utils/asset";
import section from "../styles/section.module.css";
import styles from "./VenueSection.module.css";

function ArchFrame() {
  return (
    <svg className={styles.arch} viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20,220 L20,110 C20,45 80,15 160,15 C240,15 300,45 300,110 L300,220"
        fill="none"
        stroke="var(--color-gold-500)"
        strokeWidth="3"
      />
      <path
        d="M36,220 L36,112 C36,55 90,30 160,30 C230,30 284,55 284,112 L284,220"
        fill="none"
        stroke="var(--color-gold-300)"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <circle cx="160" cy="34" r="5" fill="var(--color-gold-500)" />
    </svg>
  );
}

export function VenueSection() {
  const { venue } = wedding;

  return (
    <section id="venue" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>स्थळ</p>
        <h2 className={section.heading}>Venue</h2>
        <div className={section.divider} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.archWrap}>
          <ArchFrame />
          <div className={styles.archContent}>
            <p className={styles.venueName}>
              <MapPin size={20} aria-hidden="true" /> {venue.name}
            </p>
            <p className={styles.address}>{venue.fullAddress ?? "Full address to be announced soon"}</p>

            {venue.mapUrl ? (
              <a className={styles.directionsButton} href={venue.mapUrl} target="_blank" rel="noreferrer">
                Get Directions
              </a>
            ) : (
              <button type="button" className={styles.directionsButtonDisabled} disabled>
                Directions coming soon
              </button>
            )}
          </div>
        </div>

        {venue.photo && (
          <img className={styles.venuePhoto} src={asset(venue.photo)} alt={`${venue.name} venue`} loading="lazy" />
        )}
        {venue.travelInfo && <p className={section.body}>{venue.travelInfo}</p>}
        {venue.parkingInfo && <p className={section.body}>{venue.parkingInfo}</p>}
      </Reveal>
    </section>
  );
}
