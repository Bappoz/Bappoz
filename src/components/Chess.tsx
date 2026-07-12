import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";

const RAPID =
  "https://raw.githubusercontent.com/Bappoz/chess_readme_status/main/assets/chess-stats-rapid-midnight.svg";
const BLITZ =
  "https://raw.githubusercontent.com/Bappoz/chess_readme_status/main/assets/chess-stats-blitz-midnight.svg";

export default function Chess() {
  const { t } = useTranslation();
  return (
    <section className="section chess">
      <SectionLabel>{t("chess.label")}</SectionLabel>
      <Reveal as="h2" className="section-title">
        {t("chess.title")}
      </Reveal>
      <Reveal className="chess__target mono" delay={0.05}>
        {t("chess.targeting")} <strong>1500</strong> {t("chess.rapid")} · <strong>850</strong>{" "}
        {t("chess.blitz")}
      </Reveal>
      <div className="chess__cards">
        <Reveal className="chess__card" delay={0.08}>
          <img src={RAPID} alt="Chess.com rapid stats" loading="lazy" />
        </Reveal>
        <Reveal className="chess__card" delay={0.16}>
          <img src={BLITZ} alt="Chess.com blitz stats" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}
