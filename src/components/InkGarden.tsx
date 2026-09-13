import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { asset } from "../lib/utils";
export default function InkGarden() {
  const { t } = useTranslation();
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) =>
      setVisible(e.isIntersecting),
    );
    if (video.current) observer.observe(video.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sync = () => {
      if (paused || reduce || !visible || document.hidden)
        video.current?.pause();
      else void video.current?.play().catch(() => setPaused(true));
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [paused, reduce, visible]);
  return (
    <div className="ink-garden">
      <video
        ref={video}
        src={visible && !failed ? asset("media/ink-garden.mp4") : undefined}
        poster={asset("media/ink-garden.webp")}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
      {!reduce && !failed && (
        <button
          className="garden-control"
          onClick={() => setPaused(!paused)}
          aria-label={t(paused ? "design.gardenPlay" : "design.gardenPause")}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
      <a
        className="garden-credit"
        href="https://21st.dev/@serafimcloud/components/ink-garden"
        target="_blank"
        rel="noreferrer"
      >
        {t("design.gardenCredit")}
      </a>
    </div>
  );
}
