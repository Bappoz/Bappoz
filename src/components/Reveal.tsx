import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </Tag>
  );
}
export function SectionLabel({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="section-label">
      {number && <span>{number}</span>}
      {children}
    </div>
  );
}
