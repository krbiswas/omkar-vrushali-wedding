import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding, messages } from "../data/wedding";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./ScratchReveal.module.css";

const REVEAL_THRESHOLD = 0.5;
const BRUSH_RADIUS = 28;

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDate();
  const month = date.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  const year = date.getUTCFullYear();
  return { day, month, year };
}

export function ScratchReveal() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const sampleCounterRef = useRef(0);

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { day, month, year } = formatDate(wedding.date);

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrapper.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#8a1c30");
    gradient.addColorStop(1, "#4a0d1a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(227, 200, 120, 0.6)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, rect.width - 20, rect.height - 20);

    ctx.fillStyle = "#e3c878";
    ctx.font = `600 ${Math.max(18, rect.width * 0.09)}px Marcellus, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch", rect.width / 2, rect.height / 2 - 14);
    ctx.font = `${Math.max(13, rect.width * 0.045)}px "Cormorant Garamond", serif`;
    ctx.fillText(messages.scratchInstruction, rect.width / 2, rect.height / 2 + 22);
  }, []);

  useEffect(() => {
    drawCover();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      if (!revealed) drawCover();
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRelativePoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratchAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    const prev = lastPointRef.current;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.beginPath();
    if (prev) {
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.fill();
    lastPointRef.current = { x, y };
  };

  const measureProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sampleW = 60;
    const sampleH = 60;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Downsample by striding for performance.
    const strideX = Math.max(1, Math.floor(canvas.width / sampleW));
    const strideY = Math.max(1, Math.floor(canvas.height / sampleH));
    let total = 0;
    let transparent = 0;
    for (let yy = 0; yy < canvas.height; yy += strideY) {
      for (let xx = 0; xx < canvas.width; xx += strideX) {
        const idx = (yy * canvas.width + xx) * 4 + 3;
        total++;
        if (data.data[idx] < 16) transparent++;
      }
    }
    const pct = total > 0 ? transparent / total : 0;
    setProgress(pct);
    if (pct >= REVEAL_THRESHOLD) {
      setRevealed(true);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    isScratchingRef.current = true;
    lastPointRef.current = null;
    canvasRef.current?.setPointerCapture(e.pointerId);
    const { x, y } = getRelativePoint(e.clientX, e.clientY);
    scratchAt(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || revealed) return;
    const { x, y } = getRelativePoint(e.clientX, e.clientY);
    scratchAt(x, y);
    sampleCounterRef.current += 1;
    if (sampleCounterRef.current % 4 === 0) {
      measureProgress();
    }
  };

  const handlePointerUp = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    measureProgress();
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <motion.div
        className={styles.revealLayer}
        initial={false}
        animate={
          revealed && !reducedMotion
            ? { scale: 1.08 }
            : { scale: 1 }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50% 45%" }}
      >
        <p className={styles.dateLabel}>
          {month} <span className={styles.dateDay}>{day}</span>
          {year}
        </p>
        <p className={`marathi ${styles.message}`}>{messages.scratchRevealMessage}</p>
      </motion.div>

      {!revealed && (
        <>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            role="img"
            aria-label={messages.scratchInstruction}
          />
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${Math.min(progress / REVEAL_THRESHOLD, 1) * 100}%` }} />
          </div>
          <button
            type="button"
            className={styles.revealButton}
            style={{ position: "absolute", bottom: "var(--space-3)", left: "50%", transform: "translateX(-50%)" }}
            onClick={() => setRevealed(true)}
          >
            Reveal invitation
          </button>
        </>
      )}
    </div>
  );
}
