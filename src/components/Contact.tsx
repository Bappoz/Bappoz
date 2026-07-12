import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";
import { socials } from "../data/socials";
import { BrandIcon, ArrowIcon } from "./icons/Icons";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className="section contact" id="contact">
      <SectionLabel>{t("contact.label")}</SectionLabel>
      <Reveal as="h2" className="contact__title">
        {t("contact.title")}
      </Reveal>
      <Reveal className="section-sub" delay={0.05}>
        {t("contact.subtitle")}
      </Reveal>

      <Reveal delay={0.1}>
        <a href="mailto:landradezanetti@gmail.com" className="btn btn--primary btn--lg" data-magnetic>
          <BrandIcon name="email" size={18} />
          {t("contact.email_cta")}
          <ArrowIcon />
        </a>
      </Reveal>

      <div className="contact__socials">
        <span className="contact__socials-label mono">{t("contact.connect")}</span>
        <div className="contact__socials-list">
          {socials
            .filter((s) => s.key !== "email")
            .map((s, i) => (
              <Reveal as="div" key={s.key} delay={0.12 + i * 0.05}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__social"
                  data-cursor
                >
                  <BrandIcon name={s.key} size={20} />
                  <span className="contact__social-meta">
                    <span className="contact__social-label">{s.label}</span>
                    <span className="contact__social-handle mono">{s.handle}</span>
                  </span>
                  <ArrowIcon size={15} className="contact__social-arrow" />
                </a>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
