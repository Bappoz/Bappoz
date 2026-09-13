import InkGarden from "./InkGarden";
import { Github, Linkedin, Youtube, Instagram } from "./icons/Brands";
import { ArrowUpRight, Mail, Copy, Check, Code2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";
import { socials } from "../data/socials";
import { Tooltip } from "./Ui";
const icons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  youtube: Youtube,
  instagram: Instagram,
  leetcode: Code2,
};
export default function Contact() {
  const { t } = useTranslation();
  const [topic, setTopic] = useState(0);
  const topics = t("design.contactTopics", { returnObjects: true }) as string[];
  const emailHref = `mailto:landradezanetti@gmail.com?subject=${encodeURIComponent(topics[topic])}`;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("landradezanetti@gmail.com");
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <section id="contact" className="contact section-space">
      <div className="section-shell contact-composition">
        <InkGarden />
        <div className="contact-content">
          <SectionLabel number="06">{t("contact.label")}</SectionLabel>
          <div className="contact-heading">
            <Reveal as="h2">
              {t("design.contactTitle1")}
              <br />
              <span>{t("design.contactTitle2")}</span>
            </Reveal>
            <a
              className="contact-circle"
              href={emailHref}
              aria-label={t("contact.email_cta")}
            >
              <ArrowUpRight size={44} strokeWidth={1} />
            </a>
          </div>
          <div className="contact-letter">
            <span className="eyebrow">
              {t("design.contactTo")} / Lucas Zanetti
            </span>
            <p>{t("design.contactNote")}</p>
            <div
              className="contact-topics"
              role="group"
              aria-label={t("design.contactSubject")}
            >
              {topics.map((label, i) => (
                <button
                  key={label}
                  aria-pressed={topic === i}
                  onClick={() => setTopic(i)}
                >
                  {label}
                  {topic === i && <ArrowUpRight size={14} />}
                </button>
              ))}
            </div>
            <a className="text-link" href={emailHref}>
              {t("contact.email_cta")}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-bottom">
            <div>
              <p>{t("contact.subtitle")}</p>
              <div className="email-row">
                <a href={emailHref}>landradezanetti@gmail.com</a>
                <Tooltip
                  text={t(copied ? "design.copied" : "design.copyEmail")}
                >
                  <button
                    className="icon-button"
                    onClick={copy}
                    aria-label={t(
                      copied ? "design.copied" : "design.copyEmail",
                    )}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </Tooltip>
              </div>
              <span className="copy-status" role="status">
                {copyError
                  ? t("design.copyError")
                  : copied
                    ? t("design.copied")
                    : ""}
              </span>
            </div>
            <div className="social-badges">
              {socials.map((s) => {
                const Icon = icons[s.key];
                return (
                  <Tooltip key={s.key} text={s.handle}>
                    <a
                      className="favicon-badge"
                      href={s.href}
                      target={s.key === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      <span className="favicon-circle">
                        <Icon size={16} />
                      </span>
                      {s.label}
                      <ArrowUpRight size={13} />
                    </a>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <div className="contact-postscript">{t("design.contactFrom")}</div>
        </div>
      </div>
    </section>
  );
}
