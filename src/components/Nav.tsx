import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const sections = ["about", "stack", "work", "projects", "activity", "contact"] as const;

export default function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const next = i18n.language.startsWith("pt") ? "en" : "pt";
    i18n.changeLanguage(next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  };

  const lang = i18n.language.startsWith("pt") ? "PT" : "EN";

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#top" className="nav__logo" data-magnetic>
        <span className="nav__logo-mark">LZ</span>
        <span className="nav__logo-dot" />
      </a>

      <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {sections.map((s) => (
          <a key={s} href={`#${s}`} onClick={() => setOpen(false)}>
            <span className="nav__idx">{String(sections.indexOf(s) + 1).padStart(2, "0")}</span>
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
