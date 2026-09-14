import { Github, Linkedin } from "./icons/Brands";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Code2,
  Mail,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import GlassCard from "./ui/glass-card";
import { asset } from "../lib/utils";
export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-topline">
        <span className="eyebrow">{t("hero.role")}</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal>
            <p className="hero-name">
              {t("design.hello")} Lucas Andrade Zanetti
            </p>
            <h1>
              {t("design.headline1")}
              <br />
              <span>{t("design.headline2")}</span>
              <ArrowDownRight
                className="hero-arrow"
                strokeWidth={1}
                aria-hidden="true"
              />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-description">{t("design.intro")}</p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                {t("hero.cta_projects")}
                <ArrowDown size={17} />
              </a>
              <a className="button button-quiet" href="#contact">
                {t("design.letsTalk")}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="hero-footnote">
            <Code2 size={16} />
            <span>{t("design.heroFootnote")}</span>
          </Reveal>
        </div>
        <Reveal className="profile-wrap" delay={0.12}>
          <article className="profile-card border-detail">
            <div className="profile-image">
              <img
                src={asset("portraits/lucas.png")}
                width={1000}
                height={1024}
                alt="Lucas Andrade Zanetti"
              />
              <span className="profile-image-tag">
                <MapPin size={13} />
                {t("hero.location")}
              </span>
            </div>
            <GlassCard
              className="profile-glass-card"
              profileName="Lucas Zanetti"
              handle="@bappoz"
              description={t("design.profileBio")}
              education={t("design.profileEducation")}
              logoSrc={asset("brand/zanetti.webp")}
              moreLabel={t("design.profileMore")}
              moreHref="#about"
              links={[
                {
                  label: "GitHub",
                  href: "https://github.com/Bappoz",
                  icon: <Github size={17} />,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/lucas-andrade-zanetti/",
                  icon: <Linkedin size={17} />,
                },
                {
                  label: t("design.profileEmail"),
                  href: "mailto:landradezanetti@gmail.com",
                  icon: <Mail size={17} />,
                },
              ]}
            />
          </article>
          <span className="profile-caption">{t("design.profileCaption")}</span>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <a href="#projects">
          <ArrowDown size={15} />
          {t("hero.scroll")}
        </a>
        <span>{t("design.focusLine")}</span>
        <span>01 — 06</span>
      </div>
    </section>
  );
}
