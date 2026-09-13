import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useTranslation } from "react-i18next";
import LabPortal from "./components/PortfolioMode";
import EmbeddedLab from "./components/EmbeddedLab";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Certifications from "./components/Certifications";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Chess from "./components/Chess";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ArrowLeft, MoveUpRight } from "lucide-react";
import { asset } from "./lib/utils";

export default function App() {
  const { t, i18n } = useTranslation();
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.replace(/\/$/, "");
  const isHome = path === base || path === `${base}/index.html` || path === "";
  const isLab = path === `${base}/lab` || path === `${base}/lab/index.html`;
  useEffect(() => {
    document.documentElement.dataset.portfolio = isLab ? "lab" : "software";
  }, [isLab]);
  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith("pt")
      ? "pt-BR"
      : "en";
    document.title = isLab
      ? t("lab.pageTitle")
      : isHome
        ? t("design.pageTitle")
        : t("notFound.pageTitle");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("design.metaDescription"));
  }, [i18n.language, isHome, isLab, t]);

  useEffect(() => {
    if ((!isHome && !isLab) || !window.location.hash) return;
    let cancelled = false;
    // A static-host entry can resolve its fragment before React mounts the sections.
    // Wait for local fonts so the section position is also stable on first load.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      const id = window.location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
    return () => {
      cancelled = true;
    };
  }, [isHome, isLab]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        {t("ui.skip")}
      </a>
      <Nav lab={isLab} />
      {isHome ? (
        <main id="main">
          <Hero />
          <Projects />
          <LabPortal />
          <About />
          <Certifications />
          <Skills />
          <Experience />
          <GitHubActivity />
          <Chess />
          <Contact />
        </main>
      ) : isLab ? (
        <EmbeddedLab />
      ) : (
        <main id="main" className="not-found section-shell">
          <div className="eyebrow">{t("notFound.label")}</div>
          <div className="error-number" aria-hidden="true">
            4<MoveUpRight strokeWidth={0.7} />4
          </div>
          <h1>{t("notFound.title")}</h1>
          <p>{t("notFound.description")}</p>
          <a className="button button-primary" href={asset("")}>
            <ArrowLeft size={18} />
            {t("notFound.back")}
          </a>
        </main>
      )}
      <Footer />
    </MotionConfig>
  );
}
