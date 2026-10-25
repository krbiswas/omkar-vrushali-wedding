import { useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { music } from "../data/wedding";
import styles from "./MusicPlayer.module.css";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  if (!music.src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={music.src} loop onEnded={() => setPlaying(false)} />
      <button
        type="button"
        className={styles.button}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
      >
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </button>
      {error && <span className={styles.error}>Tap again to play</span>}
    </div>
  );
}
