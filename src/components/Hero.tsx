import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FerrisCrab from "./FerrisCrab";
import { BrandIcon, ArrowIcon } from "./icons/Icons";
import { socials } from "../data/socials";

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, delay = 0, ready }: { text: string; delay?: number; ready: boolean }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="word-mask" key={i}>
          <motion.span
            className="word"
            initial={{ y: "110%" }}
            animate={ready ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

interface Stat {
  v: string;
  l: string;
}

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const stats = t("hero.stats", { returnObjects: true }) as Stat[];

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width / 2) / r.width;
    const py = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  };
  const onLeave = () => {
    cardRef.current?.style.setProperty("--px", "0");
    cardRef.current?.style.setProperty("--py", "0");
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section className="hero" id="top" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero__layout">
        <div className="hero__main">
          <motion.p className="hero__eyebrow" {...fade(0.1)}>
            <span className="hero__eyebrow-dot" />
            {t("hero.role")}
          </motion.p>

          <h1 className="hero__title">
            <span className="hero__line">
              <Words text={t("hero.headline_1")} delay={0.15} ready={ready} />
            </span>
            <span className="hero__line hero__line--ghost">
              <Words text={t("hero.headline_accent")} delay={0.3} ready={ready} />
            </span>
            <span className="hero__line">
              <Words text={t("hero.headline_2")} delay={0.5} ready={ready} />
            </span>
          </h1>

          <motion.p className="hero__tagline" {...fade(0.75)}>
            {t("hero.tagline")}
          </motion.p>

          <motion.div className="hero__stats" {...fade(0.9)}>
            {stats.map((s, i) => (
              <div className="hero__stat" key={i}>
                <span className="hero__stat-v">{s.v}</span>
                <span className="hero__stat-l">{s.l}</span>
              </div>
            ))}
          </motion.div>

        </div>

        <motion.aside
          className="hero__card"
          ref={cardRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
        >
          <span className="hero__card-ring" aria-hidden="true" />
          <div className="hero__photo">
            <img
              src="/lucas-cutout.png"
              alt="Lucas Andrade Zanetti"
              width={420}
              height={420}
            />
          </div>

          <h2 className="hero__name">Lucas Andrade Zanetti</h2>
          <div className="hero__ferris-badge" title="Rust enthusiast">
            <FerrisCrab size={78} />
          </div>
          <p className="hero__card-role">{t("hero.location")}</p>

          <div className="hero__card-socials">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={s.label}
                data-cursor
              >
                <BrandIcon name={s.key} size={18} />
              </a>
            ))}
          </div>

          <div className="hero__card-cta">
            <a href="#projects" className="btn btn--primary" data-magnetic>
              {t("hero.cta_projects")}
              <ArrowIcon />
            </a>
            <a href="#contact" className="btn btn--ghost" data-magnetic>
              {t("hero.cta_contact")}
            </a>
          </div>
        </motion.aside>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <span className="mono">{t("hero.scroll")}</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
