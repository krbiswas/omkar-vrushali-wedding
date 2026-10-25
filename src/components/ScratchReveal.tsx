import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding, messages, couple } from "../data/wedding";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./ScratchReveal.module.css";

const REVEAL_THRESHOLD = 0.5;
const BRUSH_RADIUS = 42;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  life: number;
  maxLife: number;
  hue: "gold" | "ivory";
}

function drawStar(ctx: CanvasRenderingContext2D, size: number, rotation: number) {
  ctx.save();
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const outerX = Math.cos(angle) * size;
    const outerY = Math.sin(angle) * size;
    const innerAngle = angle + Math.PI / 4;
    const innerX = Math.cos(innerAngle) * size * 0.35;
    const innerY = Math.sin(innerAngle) * size * 0.35;
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

const MARATHI_MONTHS = [
  "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
  "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
];

const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function toDevanagariNumeral(n: number): string {
  return String(n).split("").map((d) => DEVANAGARI_DIGITS[Number(d)] ?? d).join("");
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const monthMarathi = MARATHI_MONTHS[date.getUTCMonth()];
  return { day, year, marathiDate: `${toDevanagariNumeral(day)} ${monthMarathi} ${toDevanagariNumeral(year)}` };
}

function FloralDecor({ position }: { position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" }) {
  const isRight = position.includes("Right");
  const isBottom = position.includes("bottom");
  return (
    <svg
      className={`${styles.floralDecor} ${styles[position]}`}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: `scale(${isRight ? -1 : 1}, ${isBottom ? -1 : 1})` }}
    >
      <path d="M5 75 Q4 40 20 20 Q10 40 12 65 Z" fill="var(--color-green-600)" opacity="0.6" />
      <path d="M0 80 Q0 30 30 8 Q12 35 10 70 Z" fill="var(--color-green-600)" opacity="0.4" />
      {[0, 51, 102, 153, 204, 255, 306].map((angle, i) => (
        <ellipse key={i} cx="30" cy="20" rx="4" ry="10" fill="var(--color-maroon-500)" opacity={0.65} transform={`rotate(${angle} 30 20)`} />
      ))}
      <circle cx="30" cy="20" r="6" fill="var(--color-saffron-500)" />
      <circle cx="30" cy="20" r="3" fill="var(--color-gold-500)" />
      <circle cx="12" cy="42" r="4" fill="var(--color-saffron-500)" opacity="0.5" />
      <circle cx="12" cy="42" r="2" fill="var(--color-gold-300)" />
      <circle cx="42" cy="10" r="3" fill="var(--color-maroon-500)" opacity="0.4" />
    </svg>
  );
}

function SmallPetals() {
  const petals = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: 10 + ((i * 29) % 80),
    top: 15 + ((i * 37) % 70),
    size: 6 + (i % 3) * 2,
    rotation: (i * 67) % 360,
    color: i % 3 === 0 ? "#b3273a" : i % 3 === 1 ? "#d94f5c" : "#e8762c",
    opacity: 0.15 + (i % 4) * 0.08,
  }));

  return (
    <>
      {petals.map((p) => (
        <svg
          key={p.id}
          className={styles.scatteredPetal}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8 0 C13 3 14 9 8 16 C2 9 3 3 8 0 Z" fill={p.color} />
        </svg>
      ))}
    </>
  );
}

export interface ScratchRevealRef {
  revealed: boolean;
}

export function ScratchReveal({ onReveal }: { onReveal?: () => void }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const sampleCounterRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const particleAnimRef = useRef<number | null>(null);

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { marathiDate } = formatDate(wedding.date);

  const doReveal = useCallback(() => {
    setRevealed(true);
    onReveal?.();
  }, [onReveal]);

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
    ctx.font = `600 ${Math.max(20, rect.width * 0.095)}px "Tiro Devanagari Marathi", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("शुभविवाह", rect.width / 2, rect.height / 2 - 24);

    ctx.font = `${Math.max(13, rect.width * 0.045)}px "Tiro Devanagari Marathi", serif`;
    const words = messages.scratchInstruction.split(" ");
    const maxWidth = rect.width - 48;
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    const lineHeight = Math.max(13, rect.width * 0.045) * 1.4;
    const startY = rect.height / 2 + 14;
    lines.forEach((line, i) => {
      ctx.fillText(line, rect.width / 2, startY + i * lineHeight);
    });
  }, []);

  const sizeParticleCanvas = useCallback(() => {
    const canvas = particleCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrapper.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    drawCover();
    sizeParticleCanvas();
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!revealed) drawCover();
      });
    }
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      if (!revealed) {
        drawCover();
        sizeParticleCanvas();
      }
    });
    observer.observe(wrapper);
    return () => {
      observer.disconnect();
      if (particleAnimRef.current) cancelAnimationFrame(particleAnimRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runParticleLoop = useCallback(() => {
    const canvas = particleCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = wrapper.getBoundingClientRect();

    const step = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.rotation += p.vr;
        const t = p.life / p.maxLife;
        if (t >= 1) { particles.splice(i, 1); continue; }
        const alpha = t < 0.3 ? t / 0.3 : 1 - (t - 0.3) / 0.7;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = p.hue === "gold" ? "#e3c878" : "#fdf8ef";
        ctx.shadowColor = p.hue === "gold" ? "#e3c878" : "#fdf8ef";
        ctx.shadowBlur = 6;
        drawStar(ctx, p.size, p.rotation);
        ctx.restore();
      }
      if (particles.length > 0) {
        particleAnimRef.current = requestAnimationFrame(step);
      } else {
        particleAnimRef.current = null;
      }
    };
    if (particleAnimRef.current === null) {
      particleAnimRef.current = requestAnimationFrame(step);
    }
  }, []);

  const spawnGlitter = useCallback(
    (x: number, y: number) => {
      if (reducedMotion) return;
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.2;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          size: 2 + Math.random() * 3,
          rotation: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: 28 + Math.random() * 18,
          hue: Math.random() > 0.4 ? "gold" : "ivory",
        });
      }
      if (particlesRef.current.length > 240) {
        particlesRef.current.splice(0, particlesRef.current.length - 240);
      }
      runParticleLoop();
    },
    [reducedMotion, runParticleLoop]
  );

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
    if (prev) { ctx.moveTo(prev.x, prev.y); ctx.lineTo(x, y); }
    else { ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2); }
    ctx.stroke();
    ctx.fill();
    lastPointRef.current = { x, y };
  };

  const measureProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const strideX = Math.max(1, Math.floor(canvas.width / 60));
    const strideY = Math.max(1, Math.floor(canvas.height / 60));
    let total = 0;
    let transparent = 0;
    for (let yy = 0; yy < canvas.height; yy += strideY) {
      for (let xx = 0; xx < canvas.width; xx += strideX) {
        total++;
        if (data.data[(yy * canvas.width + xx) * 4 + 3] < 16) transparent++;
      }
    }
    const pct = total > 0 ? transparent / total : 0;
    setProgress(pct);
    if (pct >= REVEAL_THRESHOLD) doReveal();
  }, [doReveal]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    isScratchingRef.current = true;
    lastPointRef.current = null;
    canvasRef.current?.setPointerCapture(e.pointerId);
    const { x, y } = getRelativePoint(e.clientX, e.clientY);
    scratchAt(x, y);
    spawnGlitter(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || revealed) return;
    const { x, y } = getRelativePoint(e.clientX, e.clientY);
    scratchAt(x, y);
    spawnGlitter(x, y);
    sampleCounterRef.current += 1;
    if (sampleCounterRef.current % 4 === 0) measureProgress();
  };

  const handlePointerUp = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    measureProgress();
  };

  useEffect(() => {
    if (revealed && particleAnimRef.current) {
      cancelAnimationFrame(particleAnimRef.current);
      particleAnimRef.current = null;
      particlesRef.current = [];
    }
  }, [revealed]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <motion.div
        className={styles.revealLayer}
        initial={false}
        animate={revealed && !reducedMotion ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50% 45%" }}
      >
        {/* Floral corners */}
        <FloralDecor position="topLeft" />
        <FloralDecor position="topRight" />
        <FloralDecor position="bottomLeft" />
        <FloralDecor position="bottomRight" />

        {/* Scattered petals on the card */}
        <SmallPetals />

        {/* Gold inner border */}
        <div className={styles.innerBorder} />

        {/* Content */}
        <div className={styles.revealContent}>
          <svg className={styles.revealSwastik} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 8 L20 32" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 20 L32 20" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 8 L27 8" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 20 L32 27" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 32 L13 32" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 20 L8 13" stroke="var(--color-saffron-500)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="1.5" fill="var(--color-maroon-500)" opacity="0.6" />
            <circle cx="26" cy="14" r="1.5" fill="var(--color-maroon-500)" opacity="0.6" />
            <circle cx="26" cy="26" r="1.5" fill="var(--color-maroon-500)" opacity="0.6" />
            <circle cx="14" cy="26" r="1.5" fill="var(--color-maroon-500)" opacity="0.6" />
          </svg>

          <p className={`marathi ${styles.shubhVivah}`}>शुभविवाह</p>

          <div className={styles.goldLine} />

          <p className={styles.coupleNames}>
            <span className={styles.groomName}>{couple.groom.name}</span>
            <span className={styles.ampSymbol}>&amp;</span>
            <span className={styles.brideName}>{couple.bride.name}</span>
          </p>

          <div className={styles.goldLine} />

          <p className={`marathi ${styles.dateLabel}`}>{marathiDate}</p>

          <p className={`marathi ${styles.message}`}>{messages.scratchRevealMessage}</p>
        </div>
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
          <canvas ref={particleCanvasRef} className={styles.particleCanvas} aria-hidden="true" />
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${Math.min(progress / REVEAL_THRESHOLD, 1) * 100}%` }} />
          </div>
          <button
            type="button"
            className={styles.revealButton}
            onClick={() => doReveal()}
          >
            Reveal invitation
          </button>
        </>
      )}
    </div>
  );
}
