import React from 'react';
import styles from './AnimatedPandit.module.css';

interface AnimatedPanditProps {
  className?: string;
  reducedMotion?: boolean;
}

export const AnimatedPandit: React.FC<AnimatedPanditProps> = ({
  className,
  reducedMotion = false,
}) => {
  const containerClass = [
    styles.container,
    reducedMotion ? styles.reducedMotion : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <svg
        viewBox="0 0 240 200"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Pandit performing havan puja ceremony"
      >
        {/* ── Havan Kund (fire altar) ── */}
        <g>
          {/* Kund base – trapezoidal terracotta altar */}
          <polygon
            points="115,168 155,168 162,185 108,185"
            fill="#8a5a3a"
            stroke="#6b4530"
            strokeWidth="1"
          />
          {/* Kund inner rim */}
          <rect x="118" y="163" width="34" height="6" rx="1" fill="#a06840" />
          {/* Kund decorative line */}
          <line
            x1="112"
            y1="178"
            x2="158"
            y2="178"
            stroke="#6b4530"
            strokeWidth="0.6"
          />
          {/* Small base platform */}
          <rect x="105" y="185" width="60" height="4" rx="1" fill="#7a4e32" />
        </g>

        {/* ── Fire / Flames ── */}
        <g>
          {/* Main center flame */}
          <path
            className={styles.flame1}
            d="M135,165 Q132,150 135,140 Q138,150 135,165 Z"
            fill="#e8762c"
            opacity="0.95"
          />
          {/* Right flame */}
          <path
            className={styles.flame2}
            d="M142,166 Q140,154 143,146 Q146,154 142,166 Z"
            fill="#ff6b35"
            opacity="0.85"
          />
          {/* Left flame */}
          <path
            className={styles.flame3}
            d="M128,166 Q125,155 129,148 Q132,155 128,166 Z"
            fill="#c89b3c"
            opacity="0.8"
          />
          {/* Inner bright core */}
          <ellipse cx="135" cy="162" rx="6" ry="4" fill="#ffd966" opacity="0.6" />
        </g>

        {/* ── Smoke wisps ── */}
        <g>
          <path
            className={styles.smoke1}
            d="M134,138 Q131,132 133,126 Q136,130 134,138 Z"
            fill="#b0a89a"
            opacity="0.3"
          />
          <path
            className={styles.smoke2}
            d="M138,136 Q140,129 137,123 Q135,129 138,136 Z"
            fill="#c0b8aa"
            opacity="0.25"
          />
        </g>

        {/* ── Sparks / embers ── */}
        <g>
          <circle
            className={styles.spark1}
            cx="133"
            cy="142"
            r="1"
            fill="#ffd966"
          />
          <circle
            className={styles.spark2}
            cx="139"
            cy="144"
            r="0.8"
            fill="#ff6b35"
          />
          <circle
            className={styles.spark3}
            cx="136"
            cy="140"
            r="0.7"
            fill="#e8762c"
          />
        </g>

        {/* ── Body – seated cross-legged ── */}
        <g>
          {/* Cross-legged lower body / dhoti */}
          <ellipse cx="95" cy="170" rx="30" ry="14" fill="#fdf8ef" />
          {/* Dhoti fabric folds */}
          <path
            d="M70,168 Q80,175 95,178 Q110,175 120,168"
            fill="none"
            stroke="#e0d8c8"
            strokeWidth="0.6"
          />
          <path
            d="M75,172 Q85,178 95,180 Q105,178 115,172"
            fill="none"
            stroke="#e0d8c8"
            strokeWidth="0.5"
          />
          {/* Torso */}
          <path
            d="M82,160 L82,105 Q88,95 100,93 Q112,95 118,105 L118,160 Z"
            fill="#c4915c"
          />
          {/* Angavastra (upper garment) draped over left shoulder */}
          <path
            d="M85,105 Q80,108 78,120 L78,155 Q82,160 90,162 L95,110 Z"
            fill="#e8762c"
            opacity="0.9"
          />
          {/* Angavastra continuation across chest */}
          <path
            d="M95,108 L115,115 L112,125 L92,118 Z"
            fill="#e8762c"
            opacity="0.7"
          />
          {/* Sacred thread (janeu) hint */}
          <line
            x1="96"
            y1="100"
            x2="112"
            y2="140"
            stroke="#f5e6c8"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </g>

        {/* ── Head ── */}
        <g className={styles.head}>
          {/* Neck */}
          <rect x="96" y="88" width="8" height="8" rx="3" fill="#c4915c" />
          {/* Head shape */}
          <ellipse cx="100" cy="76" rx="14" ry="16" fill="#c4915c" />
          {/* Hair */}
          <ellipse cx="100" cy="64" rx="12" ry="6" fill="#3d2b1f" />
          <path
            d="M88,68 Q88,58 100,56 Q112,58 112,68"
            fill="#3d2b1f"
          />
          {/* Ear left */}
          <ellipse cx="86" cy="76" rx="3" ry="4" fill="#b8834e" />
          {/* Ear right */}
          <ellipse cx="114" cy="76" rx="3" ry="4" fill="#b8834e" />
          {/* Eyes – closed / meditative */}
          <path
            d="M93,75 Q95,73 97,75"
            fill="none"
            stroke="#3d2b1f"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M103,75 Q105,73 107,75"
            fill="none"
            stroke="#3d2b1f"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Nose */}
          <path
            d="M100,76 L99,81 Q100,82 101,81 Z"
            fill="#b8834e"
          />
          {/* Mouth – gentle, serene */}
          <path
            d="M96,84 Q100,86 104,84"
            fill="none"
            stroke="#8b5e3c"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
          {/* Tilak */}
          <path
            d="M98,68 L100,64 L102,68 Z"
            fill="#e8762c"
          />
          <circle cx="100" cy="69" r="1.2" fill="#e8762c" />
        </g>

        {/* ── Left arm (resting) ── */}
        <g className={styles.restingArm}>
          {/* Upper arm */}
          <path
            d="M82,110 Q74,120 72,135"
            fill="none"
            stroke="#c4915c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Forearm resting on lap */}
          <path
            d="M72,135 Q75,145 82,152"
            fill="none"
            stroke="#c4915c"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Hand */}
          <circle cx="82" cy="153" r="3.5" fill="#c4915c" />
        </g>

        {/* ── Right arm (offering gestures) ── */}
        <g className={styles.offeringArm}>
          {/* Upper arm */}
          <path
            d="M118,110 Q126,118 130,130"
            fill="none"
            stroke="#c4915c"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Forearm reaching toward fire */}
          <path
            d="M130,130 Q133,140 135,148"
            fill="none"
            stroke="#c4915c"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Hand */}
          <circle cx="135" cy="149" r="3.5" fill="#c4915c" />
          {/* Fingers slightly open (offering gesture) */}
          <path
            d="M133,147 L130,144"
            stroke="#c4915c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M135,146 L135,142"
            stroke="#c4915c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M137,147 L139,144"
            stroke="#c4915c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* ── Small puja items beside the kund ── */}
        <g>
          {/* Small bowl (ghee/offering) */}
          <ellipse cx="168" cy="183" rx="6" ry="3" fill="#8a5a3a" />
          <ellipse cx="168" cy="182" rx="5" ry="2" fill="#c89b3c" opacity="0.6" />
          {/* Small flower */}
          <circle cx="158" cy="185" r="2.5" fill="#e8762c" opacity="0.7" />
          <circle cx="158" cy="185" r="1" fill="#ffd966" />
        </g>

        {/* ── Ground line ── */}
        <line
          x1="50"
          y1="189"
          x2="190"
          y2="189"
          stroke="#d4c4a8"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
