import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { certifications, certificateSource } from "../data/certifications";
import { asset } from "../lib/utils";
import { Reveal } from "./Reveal";
import { Tooltip } from "./Ui";
export default function Certifications() {
  const { t, i18n } = useTranslation();
  const pt = i18n.language.startsWith("pt");
  return (
    <section
      className="certifications section-shell"
      aria-labelledby="certifications-title"
    >
      <div className="certifications-heading">
        <div>
          <span className="eyebrow">{t("certifications.label")}</span>
          <h3 id="certifications-title">{t("certifications.title")}</h3>
        </div>
        <a
          className="text-link"
          href={certificateSource}
          target="_blank"
          rel="noreferrer"
        >
          {t("certifications.source")}
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="certificate-grid">
        {certifications.map((cert, i) => {
          const name = !pt && cert.nameEn ? cert.nameEn : cert.name;
          const credential = !pt && cert.idEn ? cert.idEn : cert.id;
          return (
            <Reveal key={cert.name} delay={i * 0.035}>
              <Tooltip
                text={
                  credential
                    ? `${t("certifications.credential")}: ${credential}`
                    : cert.issuer
                }
              >
                <a
                  className="certificate-badge"
                  href={certificateSource}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("certifications.view", { name })}
                >
                  <div className="certificate-seal">
                    <img
                      src={asset(`logos/${cert.logo}.webp`)}
                      alt={cert.issuer}
                      width={42}
                      height={42}
                    />
                  </div>
                  <span className="certificate-issuer">{cert.issuer}</span>
                  <strong>{name}</strong>
                  <span className="certificate-date">
                    {new Intl.DateTimeFormat(pt ? "pt-BR" : "en", {
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(cert.date + "-01T12:00:00Z"))}
                    <ArrowUpRight size={13} />
                  </span>
                </a>
              </Tooltip>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
