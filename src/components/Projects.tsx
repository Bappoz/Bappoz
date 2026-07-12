import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { projects, type Category } from "../data/projects";
import { ArrowIcon, CodeIcon, BrandIcon } from "./icons/Icons";

const filters: ("all" | Category)[] = ["all", "systems", "ai", "web"];

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<"all" | Category>("all");
  const isPt = i18n.language.startsWith("pt");

  const list = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section className="section projects" id="projects">
      <SectionLabel>{t("projects.label")}</SectionLabel>
      <Reveal as="h2" className="section-title">
        {t("projects.title")}
      </Reveal>
      <Reveal className="section-sub" delay={0.05}>
        {t("projects.subtitle")}
      </Reveal>

      <Reveal className="projects__filters" delay={0.1}>
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-chip ${active === f ? "is-active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f === "all" ? t("projects.all_filter") : t(`projects.filter_${f}`)}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="projects__grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => {
            const primary = p.live ?? p.href;
            return (
              <motion.a
                layout
                key={p.name}
                href={primary}
                target="_blank"
                rel="noreferrer"
                className={`project-card ${p.featured ? "project-card--featured" : ""}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                data-cursor
              >
                <div className="project-card__top">
                  <span className="project-card__lang mono">{p.language}</span>
                  {p.award && <span className="project-card__award">{p.award}</span>}
                  <span className="project-card__go">
                    {p.live ? <ArrowIcon size={18} /> : <CodeIcon size={18} />}
                  </span>
                </div>

                <h3 className="project-card__name">{p.name}</h3>
                <p className="project-card__desc">{isPt ? p.descPt : p.descEn}</p>

                <div className="project-card__foot">
                  <div className="project-card__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="project-card__cta mono">
                    {p.live ? t("projects.view_live") : t("projects.view_code")}
                  </span>
                </div>
                <span className="project-card__glow" aria-hidden="true" />
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <Reveal className="projects__all" delay={0.1}>
        <a href="https://github.com/Bappoz?tab=repositories" target="_blank" rel="noreferrer" className="btn btn--ghost" data-magnetic>
          <BrandIcon name="github" size={18} />
          {t("projects.view_all")}
          <ArrowIcon />
        </a>
      </Reveal>
    </section>
  );
}
