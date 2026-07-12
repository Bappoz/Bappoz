import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";
import { skills } from "../data/skills";
import FerrisCrab from "./FerrisCrab";

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section className="section stack" id="stack">
      <SectionLabel>{t("stack.label")}</SectionLabel>
      <Reveal as="h2" className="section-title stack__title">
        {t("stack.title")}
      </Reveal>

      <div className="stack__grid">
        {skills.map((g, gi) => (
          <Reveal key={g.key} delay={gi * 0.08} className="stack__group">
            <h3 className="stack__group-title mono">{t(`stack.${g.key}`)}</h3>
            <ul className="stack__chips">
              {g.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="stack__ferris-strip">
        <div className="stack__ferris-track">
          <FerrisCrab size={64} walk />
        </div>
        <p className="stack__ferris-note mono">{t("rust.note")}</p>
        <span className="stack__ferris-rail" aria-hidden="true" />
      </div>
    </section>
  );
}
