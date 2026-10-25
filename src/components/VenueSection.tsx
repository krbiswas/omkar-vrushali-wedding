import { MapPin } from "lucide-react";
import { wedding } from "../data/wedding";
import { Reveal } from "./Reveal";
import { KalashMotif } from "./Motifs";
import { asset } from "../utils/asset";
import section from "../styles/section.module.css";
import styles from "./VenueSection.module.css";

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
        <KalashMotif className={styles.motif} />
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

        {venue.photo && (
          <img className={styles.venuePhoto} src={asset(venue.photo)} alt={`${venue.name} venue`} loading="lazy" />
        )}
        {venue.travelInfo && <p className={section.body}>{venue.travelInfo}</p>}
        {venue.parkingInfo && <p className={section.body}>{venue.parkingInfo}</p>}
      </Reveal>
    </section>
  );
}
