import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";

export default function About() {
  const { t } = useTranslation();

  const facts = [
    { k: t("about.fact_focus"), v: t("about.fact_focus_v") },
    { k: t("about.fact_edu"), v: t("about.fact_edu_v") },
    { k: t("about.fact_lang"), v: t("about.fact_lang_v") },
    { k: t("about.fact_loc"), v: t("about.fact_loc_v") },
  ];

  return (
    <section className="section about" id="about">
      <SectionLabel>{t("about.label")}</SectionLabel>

      <div className="about__grid">
        <div className="about__left">
          <Reveal as="h2" className="section-title">
            {t("about.title")}
          </Reveal>
          <Reveal className="about__text" delay={0.1}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </Reveal>
        </div>

        <div className="about__right">
          <Reveal className="about__portrait" delay={0.15}>
            {/* Swap public/about.jpg for the selfie you attached if you prefer it. */}
            <img src="/about.jpg" alt="Lucas Andrade Zanetti" width={300} height={300} />
            <span className="about__portrait-ring" aria-hidden="true" />
          </Reveal>

          <ul className="about__facts">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.k} delay={0.2 + i * 0.07} className="about__fact">
                <span className="about__fact-k mono">{f.k}</span>
                <span className="about__fact-v">{f.v}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
