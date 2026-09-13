import { Github } from "./icons/Brands";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshCw } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { ExternalLink, GooeyLoader, Tooltip } from "./Ui";
import { fetchJson } from "../lib/utils";
interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
interface Result {
  contributions: Day[];
  total: Record<string, number>;
}
export default function GitHubActivity() {
  const { t, i18n } = useTranslation();
  const [days, setDays] = useState<Day[] | null>(null);
  const [stats, setStats] = useState<{
    public_repos: number;
    followers: number;
  } | null>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const controller = new AbortController();
    setError(false);
    fetchJson<Result>(
      "https://github-contributions-api.jogruber.de/v4/Bappoz?y=last",
      controller.signal,
    )
      .then((data) => {
        if (!Array.isArray(data.contributions))
          throw new Error("Invalid response");
        setDays(
          data.contributions
            .filter(
              (d) =>
                /^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isFinite(d.count),
            )
            .sort((a, b) => a.date.localeCompare(b.date)),
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    fetchJson<{ public_repos: number; followers: number }>(
      "https://api.github.com/users/Bappoz",
      controller.signal,
    )
      .then(setStats)
      .catch(() => {});
    return () => controller.abort();
  }, [visible, retry]);
  const weeks = useMemo(() => {
    if (!days?.length) return [];
    const cells: (Day | null)[] = Array(
      new Date(days[0].date + "T00:00:00Z").getUTCDay(),
    ).fill(null);
    cells.push(...days);
    return Array.from({ length: Math.ceil(cells.length / 7) }, (_, i) =>
      cells.slice(i * 7, i * 7 + 7),
    );
  }, [days]);
  const total = days?.reduce((n, d) => n + d.count, 0);
  return (
    <section
      id="activity"
      className="activity section-shell section-space"
      ref={section}
    >
      <SectionLabel number="05">{t("activity.label")}</SectionLabel>
      <div className="section-heading">
        <Reveal as="h2">{t("design.activityTitle")}</Reveal>
        <ExternalLink href="https://github.com/Bappoz">
          <Github size={17} />
          @Bappoz
        </ExternalLink>
      </div>
      <div className="activity-panel border-detail">
        {error ? (
          <div className="activity-error">
            <p>{t("activity.error")}</p>
            <button
              className="button button-outline"
              onClick={() => setRetry((n) => n + 1)}
            >
              <RefreshCw size={16} />
              {t("ui.retry")}
            </button>
            <ExternalLink href="https://github.com/Bappoz">
              {t("design.openGithub")}
            </ExternalLink>
          </div>
        ) : !days ? (
          <GooeyLoader label={t("activity.loading")} />
        ) : (
          <>
            <div className="activity-top">
              <span>
                <strong>{total?.toLocaleString(i18n.language)}</strong>{" "}
                {t("activity.contributions")}
              </span>
              <span>{t("design.lastYear")}</span>
            </div>
            <div
              className="heat-scroll"
              tabIndex={0}
              role="region"
              aria-label={t("activity.label")}
            >
              <div className="heat">
                {weeks.map((week, i) => (
                  <div className="heat-column" key={i}>
                    {week.map((d, j) => (
                      <Tooltip
                        key={j}
                        text={
                          d
                            ? `${d.count} · ${new Date(d.date + "T12:00:00Z").toLocaleDateString(i18n.language)}`
                            : ""
                        }
                      >
                        <span
                          className="heat-cell"
                          data-level={d ? d.level : "empty"}
                          aria-label={d ? `${d.date}: ${d.count}` : undefined}
                        />
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="heat-footer">
              <span>{t("design.githubSource")}</span>
              <div>
                <span>{t("activity.less")}</span>
                {[0, 1, 2, 3, 4].map((n) => (
                  <i key={n} className="heat-cell" data-level={n} />
                ))}
                <span>{t("activity.more")}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {stats && (
        <div className="github-stats">
          <span>
            <strong>{stats.public_repos}</strong>
            {t("activity.repos")}
          </span>
          <span>
            <strong>{stats.followers}</strong>
            {t("activity.followers")}
          </span>
          <span>
            <strong>Rust</strong>
            {t("activity.stars")}
          </span>
        </div>
      )}
    </section>
  );
}
