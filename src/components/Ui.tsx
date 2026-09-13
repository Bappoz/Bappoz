import { useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Tooltip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 35 }),
    sy = useSpring(y, { stiffness: 420, damping: 35 });
  const reduce = useReducedMotion();
  const position = (left: number, top: number) => {
    x.set(Math.max(12, Math.min(left, window.innerWidth - 240)));
    y.set(Math.max(12, Math.min(top, window.innerHeight - 65)));
  };
  return (
    <span
      className="tooltip-trigger"
      aria-describedby={open ? id : undefined}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") {
          position(e.clientX + 14, e.clientY + 20);
          setOpen(true);
        }
      }}
      onPointerMove={(e) => position(e.clientX + 14, e.clientY + 20)}
      onPointerLeave={() => setOpen(false)}
      onFocus={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        position(r.left, r.bottom + 10);
        setOpen(true);
      }}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          e.stopPropagation();
        }
      }}
    >
      {children}
      {open &&
        createPortal(
          <motion.span
            id={id}
            role="tooltip"
            className="floating-tooltip"
            style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
          >
            {text}
          </motion.span>,
          document.body,
        )}
    </span>
  );
}

export function GooeyLoader({ label }: { label?: string }) {
  const id = useId().replace(/:/g, "");
  const { t } = useTranslation();
  return (
    <div className="loading-state" role="status">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={id}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" />
          </filter>
        </defs>
      </svg>
      <span
        className="gooey"
        style={{ filter: `url(#${id})` }}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </span>
      <span>{label || t("ui.loading")}</span>
    </div>
  );
}

export function ExternalLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
