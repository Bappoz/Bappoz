import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "./Ui";
import { asset } from "../lib/utils";
import { ModeLink } from "./PortfolioMode";
const items = [
  ["projects", "projects"],
  ["about", "about"],
  ["stack", "stack"],
  ["experience", "work"],
  ["activity", "activity"],
  ["contact", "contact"],
];
export default function Nav({ lab = false }: { lab?: boolean }) {
  const { t, i18n } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const destination = useRef<string>();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    width: 0,
    height: 0,
  });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "dark";
    } catch {
      return false;
    }
  });
  const pt = i18n.language.startsWith("pt");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    } catch {
      /* optional preference */
    }
  }, [dark]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  const finishClose = () => {
    if (open || !dialog.current?.open) return;
    dialog.current?.close();
    document.body.style.overflow = "";
    trigger.current?.focus({ preventScroll: true });
    if (destination.current) {
      window.location.href = destination.current;
      destination.current = undefined;
    }
  };
  const close = () => setOpen(false);
  const show = () => {
    const rect = trigger.current!.getBoundingClientRect();
    setPosition({
      top: rect.top,
      right: window.innerWidth - rect.right,
      width: rect.width,
      height: rect.height,
    });
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    setOpen(true);
    closeButton.current?.focus();
  };
  return (
    <>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <header className="site-header">
        <a className="wordmark" href={asset("")} aria-label={t("ui.home")}>
          <img
            src={asset("brand/zanetti.webp")}
            alt=""
            width={38}
            height={29}
          />
          Zanetti<span className="wordmark-dot">.</span>
        </a>
        <a className="header-location" href={`${asset("")}#about`}>
          {t("hero.location")}
          <span>{t(lab ? "lab.label" : "design.portfolio")}</span>
        </a>
        <div className="header-actions">
          {!lab && (
            <Tooltip text={t(dark ? "ui.light" : "ui.dark")}>
              <button
                className="icon-button theme-toggle"
                aria-label={t(dark ? "ui.light" : "ui.dark")}
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </Tooltip>
          )}
          <button
            className="language-button"
            aria-label={pt ? "Switch to English" : "Mudar para português"}
            onClick={() => i18n.changeLanguage(pt ? "en" : "pt")}
          >
            <span className={pt ? "selected" : ""}>PT</span>
            <span className="language-divider">/</span>
            <span className={!pt ? "selected" : ""}>EN</span>
          </button>
          <button
            ref={trigger}
            className="menu-button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="kinetic-menu"
            onClick={show}
          >
            {t("ui.menu")}
            <Menu size={20} />
          </button>
        </div>
      </header>
      <dialog
        id="kinetic-menu"
        className="kinetic-menu side-menu"
        ref={dialog}
        aria-label={t("ui.navigation")}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <motion.div
          className="menu-shade"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
          onClick={close}
        />
        <motion.div
          className="menu-drawer"
          initial={{ x: "100%" }}
          animate={{ x: open ? "0%" : "100%" }}
          transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={finishClose}
        >
          <div className="drawer-intro">
            <span className="eyebrow">{t("ui.navigation")}</span>
            <p>{t("design.menuNote")}</p>
          </div>
          <nav className="drawer-links">
            {(lab
              ? [
                  ["experiments", "projects"],
                  ["horizon", "about"],
                  ["lab-contact", "contact"],
                ]
              : items
            ).map(([id, key], i) => (
              <a
                href={lab ? `#${id}` : `${asset("")}#${id}`}
                key={id}
                onClick={(e) => {
                  e.preventDefault();
                  destination.current = e.currentTarget.href;
                  close();
                }}
              >
                <span className="menu-index">0{i + 1}</span>
                <span>{t(`nav.${key}`)}</span>
                <ArrowUpRight size={22} />
              </a>
            ))}
          </nav>
          <ModeLink lab={lab} className="drawer-mode" />
          <a className="drawer-email" href="mailto:landradezanetti@gmail.com">
            landradezanetti@gmail.com
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
        <button
          ref={closeButton}
          className="menu-button drawer-close"
          onClick={close}
          style={position}
        >
          {t("ui.close")}
          <X size={20} />
        </button>
      </dialog>
    </>
  );
}
