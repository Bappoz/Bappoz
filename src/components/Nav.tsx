import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const sections = ["about", "stack", "work", "projects", "activity", "contact"] as const;

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const toggleLang = () => {
    const next = i18n.language.startsWith("pt") ? "en" : "pt";
    i18n.changeLanguage(next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  };
  const lang = i18n.language.startsWith("pt") ? "PT" : "EN";

  return (
    <header className="nav">
      <a href="#top" className="nav__logo" data-magnetic aria-label="Home">
        <span className="nav__logo-mark">LZ</span>
        <span className="nav__logo-dot" />
      </a>

      <nav className={`nav__pill ${open ? "nav__pill--open" : ""}`}>
        {sections.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className={active === s ? "is-active" : ""}
            onClick={() => setOpen(false)}
          >
            {t(`nav.${s}`)}
          </a>
        ))}
      </nav>

      <div className="nav__actions">
        <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
          <span className={lang === "PT" ? "is-on" : ""}>PT</span>
          <span className="lang-toggle__sep" />
          <span className={lang === "EN" ? "is-on" : ""}>EN</span>
        </button>
        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
