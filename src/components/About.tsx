import { GraduationCap, Languages, MapPin, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";
export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about section-shell section-space">
      <SectionLabel number="02">{t("nav.about")}</SectionLabel>
      <div className="about-grid">
        <Reveal as="h2">
          {t("design.aboutTitle1")}
          <br />
          <span>{t("design.aboutTitle2")}</span>
        </Reveal>
        <Reveal className="about-copy">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <a className="text-link" href="#experience">
            {t("design.experienceLink")}
            <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
      <div className="about-facts">
        {[
          [GraduationCap, "edu"],
          [Languages, "lang"],
          [MapPin, "loc"],
        ].map(([Icon, key]) => {
          const I = Icon as typeof MapPin;
          return (
            <div key={key as string}>
              <I size={20} strokeWidth={1.5} />
              <div>
                <span>{t(`about.fact_${key}`)}</span>
                <p>{t(`about.fact_${key}_v`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
