import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Play, X } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { GooeyLoader } from "./Ui";
import { asset } from "../lib/utils";
type Job = {
  role: string;
  company: string;
  period: string;
  points: string[];
  intro?: string;
  href?: string;
  tags?: string[];
};
type Event = {
  id: string;
  role: string;
  period: string;
  text: string;
  image: string;
  alternateImage?: string;
  link?: string;
  linkLabel?: string;
  videoId?: string;
};
export default function Experience() {
  const { t } = useTranslation();
  const jobs = t("work.jobs", { returnObjects: true }) as Job[];
  const events = t("work.events", { returnObjects: true }) as Event[];
  const [chapter, setChapter] = useState(0);
  const selected = jobs[chapter];
  const video = useRef<HTMLDialogElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<Event | null>(null);
  const [campusPhoto, setCampusPhoto] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const media = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: media,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.035, 1, 1.035]);
  const close = () => {
    video.current?.close();
    setSelectedVideo(null);
    document.body.style.overflow = "";
  };
  return (
    <section id="experience" className="experience section-shell section-space">
      <SectionLabel number="04">{t("work.label")}</SectionLabel>
      <div className="section-heading">
        <Reveal as="h2">{t("design.experienceTitle")}</Reveal>
        <p>{t("design.experienceIntro")}</p>
      </div>
      <div className="experience-chapters">
        <div
          className="chapter-tabs"
          role="tablist"
          aria-label={t("design.experienceChapter")}
          aria-orientation="vertical"
        >
          {jobs.map((job, i) => (
            <button
              role="tab"
              id={`chapter-tab-${i}`}
              aria-controls="chapter-panel"
              aria-selected={chapter === i}
              tabIndex={chapter === i ? 0 : -1}
              onClick={() => setChapter(i)}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? jobs.length - 1
                        : (i + (e.key === "ArrowDown" ? 1 : -1) + jobs.length) %
                          jobs.length;
                  setChapter(next);
                  document.getElementById(`chapter-tab-${next}`)?.focus();
                }
              }}
              key={job.company}
            >
              <span className="chapter-index">0{i + 1}</span>
              <div>
                <strong>{job.company}</strong>
                <span>{job.period}</span>
              </div>
              <ArrowUpRight size={20} />
              {chapter === i && (
                <motion.i
                  layoutId="chapter-indicator"
                  transition={{ duration: reduce ? 0 : 0.25 }}
                />
              )}
            </button>
          ))}
        </div>
        <div
          id="chapter-panel"
          role="tabpanel"
          aria-labelledby={`chapter-tab-${chapter}`}
          tabIndex={0}
          className="chapter-panel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter}
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="chapter-panel-top">
                <span className="eyebrow">{selected.period}</span>
                <span className="chapter-watermark" aria-hidden="true">
                  0{chapter + 1}
                </span>
              </div>
              <h3>{selected.role}</h3>
              {selected.intro && (
                <p className="chapter-intro">{selected.intro}</p>
              )}
              <span className="eyebrow chapter-contributions">
                {t("design.experienceDetails")}
              </span>
              <ul>
                {selected.points.map((point, i) => (
                  <li key={point}>
                    <span>0{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
              {selected.tags && (
                <div className="tag-list">
                  {selected.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              {selected.href && (
                <a
                  className="text-link"
                  href={selected.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("design.experienceSource")}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="events-heading">
        <h3>{t("work.events_title")}</h3>
        <span>{t("design.eventsNote")}</span>
      </div>
      <div className="event-grid">
        {events.map((event) => {
          const image =
            event.id === "campus" && campusPhoto === 1 && event.alternateImage
              ? event.alternateImage
              : event.image;
          const imageSrc = image.startsWith("http") ? image : asset(image);
          return (
          <Reveal className="event-card" key={event.role}>
            <div
              className={`event-image event-image--${event.id}`}
              ref={event.videoId ? media : undefined}
            >
              <motion.img
                src={imageSrc}
                alt={event.role}
                width={700}
                height={450}
                loading="lazy"
                style={event.videoId && !reduce ? { scale } : undefined}
              />
              {event.id === "campus" && (
                <button
                  className="event-photo-toggle"
                  onClick={() => setCampusPhoto((n) => 1 - n)}
                  aria-label={t("design.nextPhoto")}
                >
                  {campusPhoto + 1} / 2 <ArrowUpRight size={15} />
                </button>
              )}
              {event.videoId && event.link && (
                <button
                  className="video-play"
                  onClick={() => {
                    setLoaded(false);
                    setSelectedVideo(event);
                    video.current?.showModal();
                    document.body.style.overflow = "hidden";
                  }}
                  aria-label={event.linkLabel}
                >
                  <Play size={20} fill="currentColor" />
                  <span>{event.linkLabel}</span>
                </button>
              )}
            </div>
            <div className="event-copy">
              <span className="eyebrow">{event.period}</span>
              <h4>{event.role}</h4>
              <p>{event.text}</p>
            </div>
          </Reveal>
          );
        })}
      </div>
      <dialog
        ref={video}
        className="video-dialog"
        aria-label={selectedVideo?.role ?? t("design.videoTitle")}
        onCancel={close}
        onClose={close}
      >
        <div className="video-dialog-head">
          <h3>{selectedVideo?.role ?? t("design.videoTitle")}</h3>
          <button
            autoFocus
            className="icon-button"
            aria-label={t("ui.close")}
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="video-frame">
          {selectedVideo?.videoId && (
            <>
              {!loaded && <GooeyLoader label={t("design.videoLoading")} />}
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.role}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoaded(true)}
              />
            </>
          )}
        </div>
        {selectedVideo?.link && (
          <a
            className="text-link"
            href={selectedVideo.link}
            target="_blank"
            rel="noreferrer"
          >
            {t("design.watchYoutube")}
            <ArrowUpRight size={16} />
          </a>
        )}
      </dialog>
    </section>
  );
}
