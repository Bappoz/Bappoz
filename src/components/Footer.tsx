import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">Lucas Andrade Zanetti</span>
          <span className="footer__built mono">{t("footer.built")}</span>
        </div>
        <span className="footer__copy mono">
          © {year} · {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
