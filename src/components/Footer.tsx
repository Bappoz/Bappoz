import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { asset } from "../lib/utils";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer section-shell">
      <a className="wordmark" href={asset("")}>
        <img src={asset("brand/zanetti.webp")} alt="" width={38} height={29} />
        Zanetti<span className="wordmark-dot">.</span>
      </a>
      <span>© {new Date().getFullYear()} Lucas Andrade Zanetti</span>
      <a href="#" className="text-link">
        {t("design.backTop")}
        <ArrowUp size={15} />
      </a>
    </footer>
  );
}
