import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import section from "../styles/section.module.css";

export function CountdownSection() {
  return (
    <section id="countdown" className={section.section}>
      <Reveal>
        <p className={`marathi ${section.eyebrow}`}>काउंटडाउन</p>
        <h2 className={section.heading}>Counting Down to Forever</h2>
        <div className={section.divider} />
      </Reveal>
      <Reveal delay={0.1}>
        <Countdown />
      </Reveal>
    </section>
  );
}
