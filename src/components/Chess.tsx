import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, GooeyLoader } from "./Ui";
import { Puzzle } from "lucide-react";
function ChessCard({ mode }: { mode: "rapid" | "bullet" }) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (loaded || failed) return;
    const timeout = window.setTimeout(() => setFailed(true), 10000);
    return () => window.clearTimeout(timeout);
  }, [loaded, failed]);
  return (
    <div className="chess-stats-card">
      {!loaded && !failed && <GooeyLoader />}
      {failed ? (
        <p>{t("design.chessError")}</p>
      ) : (
        <img
          src={`https://raw.githubusercontent.com/Bappoz/chess_readme_status/main/assets/chess-stats-${mode}-hero-wood.svg`}
          alt={t(`design.chess_${mode}`)}
          width={800}
          height={400}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
export default function Chess() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <aside className="chess section-shell">
      <div className="chess-summary">
        <Puzzle size={22} strokeWidth={1.5} />
        <div>
          <h3>{t("chess.title")}</h3>
          <p>
            {t("chess.targeting")} 1500 {t("chess.rapid")} · 850{" "}
            {t("chess.blitz")}
          </p>
        </div>
        <ExternalLink href="https://www.chess.com/member/bappoz">
          {t("design.chessLink")}
        </ExternalLink>
      </div>
      <details
        className="chess-details"
        onToggle={(e) => setOpen(e.currentTarget.open)}
      >
        <summary>{t("design.chessStats")}</summary>
        {open && (
          <div className="chess-stats">
            <ChessCard mode="rapid" />
            <ChessCard mode="bullet" />
          </div>
        )}
      </details>
    </aside>
  );
}
