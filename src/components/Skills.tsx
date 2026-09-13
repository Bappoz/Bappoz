import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, Pause, Play } from "lucide-react";
import { skills } from "../data/skills";
import { Reveal, SectionLabel } from "./Reveal";
import { asset } from "../lib/utils";
import { Tooltip } from "./Ui";
const logos = [
  "Rust",
  "TypeScript",
  "React",
  "Python",
  "Docker",
  "AWS",
  "Claude",
  "Codex",
  "PostgreSQL",
  "Git",
  "Linux",
  "Cloudflare",
];
function StackLogo({ name }: { name: string }) {
  const [error, setError] = useState(false);
  return (
    <>
      {error ? (
        <Code2 size={30} />
      ) : (
        <img
          src={asset(`logos/${name.toLowerCase()}.svg`)}
          alt=""
          width={30}
          height={30}
          onError={() => setError(true)}
        />
      )}
      <span>{name}</span>
    </>
  );
}
export default function Skills() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || hovered || reduce || !visible) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStep((n) => (n + 1) % 2);
    }, 2600);
    return () => clearInterval(id);
  }, [paused, hovered, reduce, visible]);
  return (
    <section id="stack" className="stack section-space">
      <div className="section-shell">
        <SectionLabel number="03">{t("stack.label")}</SectionLabel>
        <div className="section-heading">
          <Reveal as="h2">{t("design.stackTitle")}</Reveal>
          <p>{t("design.stackIntro")}</p>
        </div>
        <div
          className="logo-carousel"
          ref={container}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
          }}
        >
          <div className={`logo-slots ${reduce ? "show-all" : ""}`}>
            {(reduce ? logos : logos.slice(step * 6, step * 6 + 6)).map(
              (name, i) => (
                <div className="logo-slot" key={i}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={name}
                      className="logo-item"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <StackLogo name={name} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              ),
            )}
          </div>
          {!reduce && (
            <Tooltip
              text={t(paused ? "design.resumeLogos" : "design.pauseLogos")}
            >
              <button
                className="icon-button carousel-pause"
                aria-label={t(
                  paused ? "design.resumeLogos" : "design.pauseLogos",
                )}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            </Tooltip>
          )}
        </div>
        <div className="skill-groups">
          {skills.map((g) => (
            <div className="skill-group" key={g.key}>
              <h3>{t(`stack.${g.key}`)}</h3>
              <p>{g.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
