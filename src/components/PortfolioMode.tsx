import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cpu, ArrowLeft, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";
import { asset } from "../lib/utils";
import { Reveal } from "./Reveal";
export function ModeLink({
  lab = false,
  className = "",
}: {
  lab?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();
  const [leaving, setLeaving] = useState(false);
  const [portalHost, setPortalHost] = useState<HTMLElement>(document.body);
  const reduce = useReducedMotion();
  const href = asset(lab ? "" : "lab/");
  useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => window.location.assign(href), 650);
    return () => clearTimeout(id);
  }, [leaving, href]);
  return (
    <>
      <a
        className={`mode-link ${className}`}
        href={href}
        onClick={(e) => {
          if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            return;
          e.preventDefault();
          setPortalHost(e.currentTarget.closest("dialog") ?? document.body);
          setLeaving(true);
        }}
      >
        {lab ? <ArrowLeft size={18} /> : <Cpu size={18} />}
        <span>{t(lab ? "lab.back" : "lab.switch")}</span>
        <ArrowUpRight size={18} />
      </a>
      {createPortal(
        <AnimatePresence>
          {leaving && (
            <motion.div
              className={`mode-transition ${lab ? "to-garden" : ""}`}
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              role="status"
            >
              <Cpu size={40} />
              <span>{t(lab ? "lab.returning" : "lab.loading")}</span>
              <div className="mode-load-line" />
            </motion.div>
          )}
        </AnimatePresence>,
        portalHost,
      )}
    </>
  );
}
export default function LabPortal() {
  const { t } = useTranslation();
  return (
    <Reveal className="lab-portal section-shell">
      <div className="portal-icon" aria-hidden="true">
        <Cpu size={36} strokeWidth={1} />
        <span />
        <span />
      </div>
      <div>
        <span className="eyebrow">
          <Radio size={13} />
          {t("lab.label")}
        </span>
        <h2>{t("lab.portalTitle")}</h2>
        <p>{t("lab.portalText")}</p>
      </div>
      <ModeLink />
    </Reveal>
  );
}
