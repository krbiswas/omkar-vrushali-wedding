import { events } from "../data/wedding";
import { Reveal } from "./Reveal";
import section from "../styles/section.module.css";
import styles from "./EventTimeline.module.css";

function formatEventDate(iso: string | null) {
  if (!iso) return "Date TBA";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function EventTimeline() {
  return (
    <section id="events" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>सोहळा वेळापत्रक</p>
        <h2 className={section.heading}>Wedding Functions</h2>
        <div className={section.divider} />
      </Reveal>

      {events.length === 0 ? (
        <Reveal delay={0.1}>
          <p className={section.pendingNote}>
            The full function schedule is being finalized and will appear here soon.
          </p>
        </Reveal>
      ) : (
        <div className={styles.timeline}>
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.1}>
              <article className={styles.card}>
                <h3 className={styles.eventName}>
                  {event.name}
                  {event.nameMarathi && <span className={`marathi ${styles.eventNameMarathi}`}> · {event.nameMarathi}</span>}
                </h3>
                <p className={styles.eventMeta}>{formatEventDate(event.date)}</p>
                {(event.startTime || event.endTime) && (
                  <p className={styles.eventMeta}>
                    {event.startTime ?? "TBA"}
                    {event.endTime ? ` – ${event.endTime}` : ""}
                  </p>
                )}
                {event.venue && <p className={styles.eventMeta}>{event.venue}</p>}
                {event.description && <p className={styles.eventDescription}>{event.description}</p>}
                {event.dressCode && <p className={styles.eventDressCode}>Dress code: {event.dressCode}</p>}
                {event.directionsUrl && (
                  <a className={styles.directions} href={event.directionsUrl} target="_blank" rel="noreferrer">
                    Get Directions
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
