import { useState } from "react";
import { asset } from "../utils/asset";
import { LotusMotif } from "./Motifs";
import styles from "./PhotoFrame.module.css";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  className?: string;
}

/** A photo inside an arch frame, falling back to an illustrated placeholder when the file is missing. */
export function PhotoFrame({ src, alt, className }: PhotoFrameProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <div className={styles.placeholder} aria-hidden={showImage}>
        <LotusMotif className={styles.placeholderMotif} />
      </div>
      {src && (
        <img
          className={styles.image}
          style={{ opacity: showImage ? 1 : 0 }}
          src={asset(src)}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
