import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FerrisCrab from "./FerrisCrab";
import { BrandIcon, ArrowIcon } from "./icons/Icons";
import { socials } from "../data/socials";

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="word-mask" key={i}>
          <motion.span
            className="word"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="pulse-dot" />
          {t("hero.available")}
        </motion.div>

        <motion.p
          className="hero__role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Lucas Andrade Zanetti · {t("hero.role")}
        </motion.p>

        <h1 className="hero__title">
          <span className="hero__line">
            <Words text={t("hero.headline_1")} delay={0.4} />
          </span>
          <span className="hero__line hero__line--accent">
            <Words text={t("hero.headline_accent")} delay={0.55} />
          </span>
          <span className="hero__line">
            <Words text={t("hero.headline_2")} delay={0.75} />
          </span>
        </h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7 }}
        >
          <a href="#projects" className="btn btn--primary" data-magnetic>
            {t("hero.cta_projects")}
            <ArrowIcon />
          </a>
          <a href="#contact" className="btn btn--ghost" data-magnetic>
            {t("hero.cta_contact")}
          </a>
        </motion.div>

        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target={s.key === "email" ? undefined : "_blank"}
              rel="noreferrer"
              className="hero__social"
              aria-label={s.label}
              data-cursor
            >
              <BrandIcon name={s.key} size={19} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero__ferris"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
      >
        <FerrisCrab size={220} />
        <span className="hero__ferris-tip mono">rustc --happy</span>
      </motion.div>

      <div className="hero__scroll">
        <span className="mono">{t("hero.scroll")}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
