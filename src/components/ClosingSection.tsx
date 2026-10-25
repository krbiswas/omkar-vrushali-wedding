import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { couple, messages, shareConfig, rsvp, gallery } from "../data/wedding";
import { Reveal } from "./Reveal";
import { MandalaMotif } from "./MandalaMotif";
import { PhotoFrame } from "./PhotoFrame";
import section from "../styles/section.module.css";
import styles from "./ClosingSection.module.css";

export function ClosingSection() {
  const [copied, setCopied] = useState(false);
  const closingPhoto = gallery[4];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareConfig.shareText} ${shareUrl}`)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="closing" className={`${section.section} ${styles.section}`}>
      <MandalaMotif className={styles.backdrop} id="closing-mandala" />

      <Reveal>
        {closingPhoto && (
          <div className={styles.closingPhoto}>
            <PhotoFrame src={closingPhoto.src} alt={closingPhoto.alt} />
          </div>
        )}
        <p className={`marathi ${styles.blessing}`}>{messages.closingBlessing}</p>
        <h2 className={section.heading}>
          {couple.groom.name} &amp; {couple.bride.name}
        </h2>
        <p className={section.body}>{messages.closingNote}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className={styles.actions}>
          <a className={styles.shareButton} href={whatsappUrl} target="_blank" rel="noreferrer">
            <Share2 size={18} /> Share on WhatsApp
          </a>
          <button type="button" className={styles.copyButton} onClick={handleCopy}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </Reveal>

      {(rsvp.contactName || rsvp.contactPhone || rsvp.contactEmail) && (
        <Reveal delay={0.25}>
          <div className={styles.rsvp}>
            <h3>RSVP</h3>
            {rsvp.contactName && <p>{rsvp.contactName}</p>}
            {rsvp.contactPhone && <p>{rsvp.contactPhone}</p>}
            {rsvp.contactEmail && <p>{rsvp.contactEmail}</p>}
          </div>
        </Reveal>
      )}
    </section>
  );
}
