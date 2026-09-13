import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Expand, Play, X, ZoomIn, ZoomOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { asset } from "../lib/utils";
import { GooeyLoader } from "./Ui";

export function SimulationVideo() {
  const { t } = useTranslation();
  const video = useRef<HTMLVideoElement>(null);
  const [buffering, setBuffering] = useState(false);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.current?.pause();
    });
    const pauseHidden = () => {
      if (document.hidden) video.current?.pause();
    };
    if (video.current) observer.observe(video.current);
    document.addEventListener("visibilitychange", pauseHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseHidden);
    };
  }, []);
  return (
    <figure className="simulation-video">
      <div className="simulation-video-frame">
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          width={1280}
          height={814}
          poster={asset("lab/sumo-match-poster.webp")}
          aria-label={t("lab.demoVideo")}
          onPlay={() => setStarted(true)}
          onEnded={() => setStarted(false)}
          onWaiting={() => setBuffering(true)}
          onCanPlay={() => setBuffering(false)}
          onPlaying={() => setBuffering(false)}
          onPause={() => setBuffering(false)}
          onError={() => {
            setFailed(true);
            setBuffering(false);
          }}
        >
          <source src={asset("lab/sumo-match.mp4")} type="video/mp4" />
        </video>
        {!started && !failed && (
          <button
            className="simulation-play"
            aria-label={t("lab.demoPlay")}
            onClick={() => {
              void video.current?.play().catch(() => {
                setFailed(true);
                setBuffering(false);
              });
            }}
          >
            <Play size={25} fill="currentColor" />
            <span>{t("lab.demoPlay")}</span>
          </button>
        )}
        {buffering && (
          <div className="simulation-buffer">
            <GooeyLoader label={t("lab.demoLoading")} />
          </div>
        )}
      </div>
      <figcaption>
        <span>{t("lab.demoVideo")}</span>
        <span>Gazebo Harmonic</span>
      </figcaption>
      {failed && (
        <p className="simulation-error" role="status">
          {t("lab.demoVideoError")}{" "}
          <a
            href={asset("lab/sumo-match.mp4")}
            target="_blank"
            rel="noreferrer"
          >
            {t("lab.demoOpenVideo")}
          </a>
        </p>
      )}
    </figure>
  );
}

const evidence = [
  { key: "telemetry", src: "lab/sumo-telemetry.svg", width: 1848, height: 904 },
  {
    key: "trajectories",
    src: "lab/sumo-trajectories.webp",
    width: 1794,
    height: 1196,
  },
] as const;

export default function SimulationEvidence() {
  const { t } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<(typeof evidence)[number]>(
    evidence[0],
  );
  const [zoomed, setZoomed] = useState(false);
  const previousOverflow = useRef("");
  const close = () => {
    dialog.current?.close();
  };
  const cleanup = () => {
    document.body.style.overflow = previousOverflow.current;
  };
  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (element?.open) cleanup();
    };
  }, []);
  const show = (item: (typeof evidence)[number]) => {
    setSelected(item);
    setZoomed(false);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };
  return (
    <div className="simulation-evidence">
      <div className="simulation-evidence-heading">
        <span className="eyebrow">{t("lab.demoEvidence")}</span>
        <p>{t("lab.demoEvidenceNote")}</p>
      </div>
      <div className="simulation-evidence-grid">
        {evidence.map((item) => (
          <figure key={item.key}>
            <button
              className={`simulation-preview preview-${item.key}`}
              aria-label={t("lab.demoExpand", {
                name: t(`lab.demo_${item.key}`),
              })}
              onClick={() => show(item)}
            >
              <img
                src={asset(item.src)}
                width={item.width}
                height={item.height}
                alt={t(`lab.demoAlt_${item.key}`)}
                loading="lazy"
              />
              <span className="simulation-expand">
                <Expand size={18} />
              </span>
            </button>
            <figcaption>
              <h4>{t(`lab.demo_${item.key}`)}</h4>
              <p>{t(`lab.demoCaption_${item.key}`)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="simulation-dialog"
        aria-labelledby="simulation-detail-title"
        onClose={cleanup}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="simulation-dialog-head">
          <h3 id="simulation-detail-title">{t(`lab.demo_${selected.key}`)}</h3>
          <div>
            <button
              className="icon-button"
              onClick={() => setZoomed(!zoomed)}
              aria-pressed={zoomed}
              aria-label={t(zoomed ? "lab.demoFit" : "lab.demoZoom")}
            >
              {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button
              autoFocus
              className="icon-button"
              onClick={close}
              aria-label={t("ui.close")}
            >
              <X size={21} />
            </button>
          </div>
        </div>
        <div
          className="simulation-image-scroll"
          tabIndex={0}
          role="region"
          aria-label={t("lab.demoImageRegion")}
        >
          <img
            src={asset(selected.src)}
            width={selected.width}
            height={selected.height}
            alt={t(`lab.demoAlt_${selected.key}`)}
            className={zoomed ? "is-zoomed" : ""}
            style={zoomed ? { width: selected.width } : undefined}
          />
        </div>
        <div className="simulation-dialog-foot">
          <p>{t(`lab.demoCaption_${selected.key}`)}</p>
          <a
            className="text-link"
            href={asset(selected.src)}
            target="_blank"
            rel="noreferrer"
          >
            {t("lab.demoOpenImage")}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </dialog>
    </div>
  );
}
