import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal, SectionLabel } from "./Reveal";

const USER = "Bappoz";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Stats {
  repos?: number;
  followers?: number;
}

export default function GitHubActivity() {
  const { t } = useTranslation();
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [stats, setStats] = useState<Stats>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alive) return;
        setDays(data.contributions as Day[]);
        setTotal(data.total?.lastYear ?? Object.values<number>(data.total ?? {})[0] ?? 0);
      })
      .catch(() => alive && setError(true));

    fetch(`https://api.github.com/users/${USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((u) => alive && setStats({ repos: u.public_repos, followers: u.followers }))
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!days) return [];
    const out: (Day | null)[][] = [];
    let col: (Day | null)[] = [];
    days.forEach((d, i) => {
      const wd = new Date(d.date + "T00:00:00Z").getUTCDay();
      if (i === 0 && wd !== 0) for (let k = 0; k < wd; k++) col.push(null);
      col.push(d);
      if (wd === 6) {
        out.push(col);
        col = [];
      }
    });
    if (col.length) out.push(col);
    return out;
  }, [days]);

  return (
    <section className="section activity" id="activity">
      <SectionLabel>{t("activity.label")}</SectionLabel>
      <Reveal as="h2" className="section-title">
        {t("activity.title")}
      </Reveal>
      <Reveal className="section-sub" delay={0.05}>
        {t("activity.subtitle")}
      </Reveal>

      <Reveal className="activity__panel" delay={0.1}>
        {error ? (
          <p className="activity__error mono">
            {t("activity.error")}{" "}
            <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">
              github.com/{USER}
            </a>
          </p>
        ) : !days ? (
          <p className="activity__loading mono">{t("activity.loading")}</p>
        ) : (
          <>
            <div className="activity__heat">
              <div className="heat">
                {weeks.map((w, wi) => (
                  <div className="heat__col" key={wi}>
                    {Array.from({ length: 7 }).map((_, di) => {
                      const cell = w[di];
                      return (
                        <span
                          key={di}
                          className="heat__cell"
                          data-level={cell ? cell.level : "empty"}
                          title={cell ? `${cell.count} · ${cell.date}` : ""}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="activity__legend mono">
              <span>{t("activity.less")}</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="heat__cell" data-level={l} />
              ))}
              <span>{t("activity.more")}</span>
            </div>
          </>
        )}
      </Reveal>

      <div className="activity__stats">
        <Reveal className="stat-tile" delay={0.05}>
          <span className="stat-tile__num">{total ? total.toLocaleString() : "—"}</span>
          <span className="stat-tile__label mono">{t("activity.contributions")}</span>
        </Reveal>
        <Reveal className="stat-tile" delay={0.12}>
          <span className="stat-tile__num">{stats.repos ?? "44+"}</span>
          <span className="stat-tile__label mono">{t("activity.repos")}</span>
        </Reveal>
        <Reveal className="stat-tile" delay={0.19}>
          <span className="stat-tile__num">{stats.followers ?? "—"}</span>
          <span className="stat-tile__label mono">{t("activity.followers")}</span>
        </Reveal>
        <Reveal className="stat-tile" delay={0.26}>
          <span className="stat-tile__num stat-tile__num--rust">Rust</span>
          <span className="stat-tile__label mono">{t("activity.stars")}</span>
        </Reveal>
      </div>
    </section>
  );
}
