import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Crosshair,
  Orbit,
  Navigation,
  LockKeyhole,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { asset } from "../lib/utils";
import { Reveal } from "./Reveal";
import { ModeLink } from "./PortfolioMode";
import SimulationEvidence, { SimulationVideo } from "./SimulationDemo";
export default function EmbeddedLab() {
  const { t } = useTranslation();
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const experiments = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const pipeline = t("lab.pipeline", { returnObjects: true }) as string[];
  const future = t("lab.futureItems", { returnObjects: true }) as string[];
  return (
    <main id="main" className="embedded-lab">
      <section ref={hero} className="lab-hero section-shell">
        <div className="lab-topline">
          <span className="eyebrow">
            <span className="signal-dot" />
            {t("lab.eyebrow")}
          </span>
          <ModeLink lab />
        </div>
        <div className="lab-hero-content">
          <Reveal className="lab-hero-copy">
            <h1>
              {t("lab.headline1")}
              <br />
              <span>{t("lab.headline2")}</span>
            </h1>
            <p>{t("lab.intro")}</p>
            <a className="lab-button" href="#experiments">
              {t("lab.projects")}
              <ArrowDownRight size={22} />
            </a>
          </Reveal>
          <motion.figure
            className="lab-hero-visual"
            style={reduce ? undefined : { y }}
          >
            <img
              src={asset("lab/robot-arm.webp")}
              width={1440}
              height={961}
              alt={t("lab.photoNote")}
            />
            <div className="lab-crosshair crosshair-one">
              <Crosshair size={32} strokeWidth={1} />
            </div>
            <div className="lab-crosshair crosshair-two">
              <span /> X / Y / Z
            </div>
            <figcaption>
              <span>{t("lab.photoNote")}</span>
              <a
                href="https://www.pexels.com/photo/robot-on-a-black-background-8438865/"
                target="_blank"
                rel="noreferrer"
              >
                {t("lab.photoCredit")}
              </a>
            </figcaption>
          </motion.figure>
        </div>
        <div className="lab-pipeline">
          {pipeline.map((label, i) => (
            <div key={label}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight size={17} />
            </div>
          ))}
        </div>
      </section>
      <section
        ref={experiments}
        id="experiments"
        className="lab-experiments section-shell section-space"
      >
        <span className="eyebrow">01 / {t("lab.index")}</span>
        <div className="lab-section-title">
          <Reveal as="h2">{t("lab.projectTitle")}</Reveal>
          <p>{t("lab.projectIntro")}</p>
        </div>
        <Reveal className="lab-project">
          <div className="lab-project-diagram raspberry-diagram">
            <div className="vision-grid" aria-hidden="true" />
            <a
              className="raspberry-symbol"
              href="https://www.raspberrypi.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Raspberry Pi"
            >
              <img
                src={asset("logos/raspberry-pi.webp")}
                width={360}
                height={361}
                alt="Raspberry Pi"
                loading="lazy"
              />
            </a>
            <span className="raspberry-hardware">Raspberry Pi 3</span>
            <span className="diagram-label">C++17 / HSV → ROI → PD</span>
          </div>
          <div className="lab-project-copy">
            <span className="eyebrow">EXP. 001 / COMPUTER VISION</span>
            <h3>ColorTracker</h3>
            <p>{t("lab.colorDesc")}</p>
            <div className="lab-tags">
              <span>C++17</span>
              <span>V4L2</span>
              <span>Kalman</span>
              <span>Raspberry Pi 3</span>
            </div>
            <small>{t("lab.colorNote")}</small>
            <a
              className="text-link"
              href="https://github.com/Bappoz/ColorTracker"
              target="_blank"
              rel="noreferrer"
            >
              {t("projects.view_code")}
              <ArrowUpRight size={18} />
            </a>
            <a
              className="lab-author"
              href="https://github.com/Bappoz"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={asset("portraits/bappoz.webp")}
                alt=""
                width={28}
                height={28}
              />
              Lucas Zanetti
            </a>
          </div>
        </Reveal>
        <Reveal className="lab-project sumo-project">
          <SimulationVideo />
          <div className="lab-project-copy">
            <span className="eyebrow">EXP. 002 / ROBOTICS SIMULATION</span>
            <h3>robo-sumo-sim</h3>
            <p>{t("lab.sumoDesc")}</p>
            <div className="lab-tags">
              <span>Gazebo Harmonic</span>
              <span>C++</span>
              <span>ESP32</span>
              <span>CAD</span>
            </div>
            <small>{t("lab.sumoNote")}</small>
            <a
              className="text-link"
              href="https://github.com/Bappoz/robo-sumo-sim"
              target="_blank"
              rel="noreferrer"
            >
              <LockKeyhole size={16} />
              {t("lab.privateCode")}
              <ArrowUpRight size={18} />
            </a>
            <a
              className="lab-author"
              href="https://github.com/Bappoz"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={asset("portraits/bappoz.webp")}
                alt=""
                width={28}
                height={28}
              />
              Lucas Zanetti
            </a>
          </div>
        </Reveal>
        <SimulationEvidence />
      </section>
      <section id="horizon" className="lab-horizon section-shell">
        <div>
          <span className="eyebrow">02 / {t("lab.futureLabel")}</span>
          <Reveal as="h2">{t("lab.futureTitle")}</Reveal>
          <p>{t("lab.futureText")}</p>
        </div>
        <div className="horizon-directions">
          <figure className="drone-study">
            <img
              src={asset("lab/drone.webp")}
              width={900}
              height={546}
              alt={t("lab.droneAlt")}
              loading="lazy"
            />
            <figcaption>
              <a
                href="https://unsplash.com/photos/black-and-gray-drone-in-black-background-1P7FgPKauAA"
                target="_blank"
                rel="noreferrer"
              >
                Alan Quirvan / Unsplash
              </a>
            </figcaption>
          </figure>
          {[Cpu, Orbit, Navigation].map((Icon, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Icon size={32} strokeWidth={1} />
              <span>{future[i]}</span>
              <ArrowUpRight size={18} />
            </Reveal>
          ))}
        </div>
      </section>
      <section id="lab-contact" className="lab-contact section-shell">
        <span className="eyebrow">03 / {t("contact.label")}</span>
        <Reveal as="h2">{t("lab.contactTitle")}</Reveal>
        <p>{t("lab.contactText")}</p>
        <a className="lab-button" href="mailto:landradezanetti@gmail.com">
          {t("contact.email_cta")}
          <ArrowUpRight size={22} />
        </a>
        <ModeLink lab />
      </section>
    </main>
  );
}
