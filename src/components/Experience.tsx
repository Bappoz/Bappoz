import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";
import GalleryCarousel from "./GalleryCarousel";
import { BrandIcon, ArrowIcon } from "./icons/Icons";

interface Job {
  role: string;
  company: string;
  period: string;
  points: string[];
}
interface Event {
  role: string;
  period: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

export default function Experience() {
  const { t } = useTranslation();
  const jobs = t("work.jobs", { returnObjects: true }) as Job[];
  const events = t("work.events", { returnObjects: true }) as Event[];

  return (
    <section className="section work" id="work">
      <SectionLabel>{t("work.label")}</SectionLabel>
      <Reveal as="h2" className="section-title">
        {t("work.title")}
      </Reveal>

      <div className="timeline">
        {jobs.map((job, i) => (
          <Reveal key={i} delay={i * 0.1} className="timeline__item">
            <div className="timeline__marker">
              <span className="timeline__dot" />
            </div>
            <div className="timeline__body">
              <div className="timeline__head">
                <h3 className="timeline__role">
                  {job.role} <span className="timeline__at">— {job.company}</span>
                </h3>
                <span className="timeline__period mono">{job.period}</span>
              </div>
              <ul className="timeline__points">
                {job.points.map((p, pi) => (
                  <li key={pi}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="work__events-title mono">{t("work.events_title")}</Reveal>
      <div className="events">
        {events.map((ev, i) => (
          <Reveal key={i} delay={i * 0.1} className="event-card">
            <span className="event-card__period mono">{ev.period}</span>
            <h4 className="event-card__role">{ev.role}</h4>
            <p className="event-card__text">{ev.text}</p>
            {ev.link && (
              <a
                href={ev.link}
                target="_blank"
                rel="noreferrer"
                className="event-card__link"
                data-cursor
              >
                <BrandIcon name="youtube" size={17} />
                {ev.linkLabel ?? "YouTube"}
                <ArrowIcon size={14} />
              </a>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="work__events-title mono">{t("work.gallery_title")}</Reveal>
      <GalleryCarousel />
    </section>
  );
}
