import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
