import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  GitBranch,
  Network,
  Sparkles,
  Trophy,
} from "lucide-react";
import { projects, type Category } from "../data/projects";
import contributors from "../data/contributors.json";
import { Reveal, SectionLabel } from "./Reveal";
import { ExternalLink, Tooltip } from "./Ui";
import { asset } from "../lib/utils";

const PAGE_SIZE = 3;
const people = contributors as Record<
  string,
  { login: string; avatar: string; href: string }[]
>;
const categoryIcons = { systems: Cpu, ai: Sparkles, web: Network };

function Avatar({
  person,
}: {
  person: { login: string; avatar: string; href: string };
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <Tooltip text={person.login}>
      <a
        className="contributor-avatar"
        href={person.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${person.login} — GitHub`}
      >
        {(!loaded || failed) && (
          <span className="avatar-initials">
            {person.login.slice(0, 2).toUpperCase()}
          </span>
        )}
        {!failed && (
          <img
            src={person.avatar + "&s=80"}
            alt={person.login}
            width={36}
            height={36}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </a>
    </Tooltip>
  );
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  const [showAllPeople, setShowAllPeople] = useState(false);
  const list = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter],
  );
  const pages = Math.ceil(list.length / PAGE_SIZE);
  const visible = list.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const selected = visible[active] ?? visible[0];
  const repo = selected.href.replace("https://github.com/", "");
  const team = people[repo] ?? [];
  const select = (i: number) => {
    setActive(i);
    setShowAllPeople(false);
  };
  const changePage = (i: number) => {
    setPage(i);
    select(0);
  };
  const pt = i18n.language.startsWith("pt");
  return (
    <section id="projects" className="projects section-shell section-space">
      <SectionLabel number="01">{t("projects.label")}</SectionLabel>
      <div className="section-heading">
        <Reveal as="h2">{t("design.projectsTitle")}</Reveal>
        <p>{t("design.projectsIntro")}</p>
      </div>
      <div className="project-toolbar">
        <div
          className="filter-list"
          role="group"
          aria-label={t("design.filterLabel")}
        >
          {(["all", "web", "systems", "ai"] as const).map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              className={filter === f ? "active" : ""}
              onClick={() => {
                setFilter(f);
                changePage(0);
              }}
            >
              {t(f === "all" ? "projects.all_filter" : `projects.filter_${f}`)}
              {f === "all" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <span className="project-count">
          {String(page * PAGE_SIZE + 1).padStart(2, "0")} —{" "}
          {String(Math.min((page + 1) * PAGE_SIZE, list.length)).padStart(
            2,
            "0",
          )}{" "}
          / {String(list.length).padStart(2, "0")}
        </span>
      </div>
      {pages > 1 && (
        <div className="project-discovery">
          <span>{t("design.pageOf", { page: page + 1, pages })}</span>
          <button onClick={() => changePage((page + 1) % pages)}>
            {t("design.moreProjects")}
            <span className="discovery-arrows" aria-hidden="true">
              <ChevronRight size={17} />
              <ChevronRight size={17} />
            </span>
          </button>
          <div className="project-page-track" aria-hidden="true">
            {Array.from({ length: pages }, (_, i) => (
              <span key={i} className={i === page ? "active" : ""} />
            ))}
          </div>
        </div>
      )}
      <div
        className="elastic-gallery"
        key={`${filter}-${page}`}
        role="group"
        aria-label={t("projects.label")}
      >
        {visible.map((p, i) => {
          const Icon = categoryIcons[p.category];
          const isActive = i === active;
          return (
            <article
              key={p.href}
              className={`elastic-card visual-${p.visual?.kind || "default"} project-${p.category} ${isActive ? "is-active" : ""}`}
              style={{ "--card-index": i } as React.CSSProperties}
            >
              <button
                className="project-select"
                aria-label={t("design.selectProject", { name: p.name })}
                aria-pressed={isActive}
                aria-controls="project-details"
                onClick={() => select(i)}
                onFocus={() => select(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") select(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next =
                      (i + (e.key === "ArrowRight" ? 1 : -1) + visible.length) %
                      visible.length;
                    e.currentTarget
                      .closest(".elastic-gallery")
                      ?.querySelectorAll<HTMLButtonElement>(".project-select")
                      [next]?.focus();
                  }
                }}
              >
                <div className="project-top">
                  <span className="project-index">
                    {String(page * PAGE_SIZE + i + 1).padStart(2, "0")}
                  </span>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="project-art" aria-hidden="true">
                  {p.visual ? (
                    <img
                      className={
                        ["screenshot", "figure", "cover"].includes(
                          p.visual.kind,
                        )
                          ? `project-screenshot project-${p.visual.kind}`
                          : `project-logo ${p.visual.kind}`
                      }
                      src={asset(p.visual.src)}
                      alt=""
                      width={p.visual.kind === "screenshot" ? 1000 : 320}
                      height={180}
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-art-symbol">
                      <Icon strokeWidth={0.75} />
                    </div>
                  )}
                  {(!p.visual || p.visual.kind === "farol-logo") && (
                    <span>{p.coverTitle || p.name}</span>
                  )}
                  <div className="project-art-line">
                    <span>{p.language}</span>
                    <i />
                    <Code2 size={16} />
                  </div>
                </div>
                <div className="project-bottom">
                  <div>
                    <span className="project-kind">
                      {t(`design.category_${p.category}`)}
                    </span>
                    <h3>{p.name}</h3>
                  </div>
                  <span className="project-expand">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            </article>
          );
        })}
      </div>
      <div
        id="project-details"
        className="project-details"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="project-description">
          <div className="project-detail-title">
            <h3>{selected.name}</h3>
            {selected.award && (
              <span className="award-chip">
                <Trophy size={13} />
                {selected.award}
              </span>
            )}
          </div>
          <p>{pt ? selected.descPt : selected.descEn}</p>
          <div className="tag-list">
            {selected.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="project-meta">
          <div className="project-links">
            {selected.live && (
              <ExternalLink
                href={selected.live}
                className="button button-primary"
              >
                {t("projects.view_live")}
              </ExternalLink>
            )}
            <ExternalLink
              href={selected.href}
              className="button button-outline"
            >
              <GitBranch size={15} />
              {t("projects.view_code")}
            </ExternalLink>
          </div>
          <div className="project-team">
            <span className="team-label">{t("design.builtWith")}</span>
            <div className="avatar-circles">
              {(showAllPeople ? team : team.slice(0, 5)).map((person) => (
                <Avatar key={person.login} person={person} />
              ))}
              {team.length > 5 && !showAllPeople && (
                <button
                  className="avatar-more"
                  onClick={() => setShowAllPeople(true)}
                  aria-label={t("design.moreContributors", {
                    count: team.length - 5,
                  })}
                >
                  +{team.length - 5}
                </button>
              )}
              {team.length === 0 && (
                <ExternalLink href={`${selected.href}/graphs/contributors`}>
                  {t("design.viewContributors")}
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-row">
        <ExternalLink href="https://github.com/Bappoz?tab=repositories">
          {t("design.allRepos")}
        </ExternalLink>
        <nav className="pagination" aria-label={t("design.pagination")}>
          <button
            disabled={page === 0}
            aria-label={t("design.previous")}
            onClick={() => changePage(page - 1)}
          >
            <ChevronLeft size={17} />
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-label={t("design.page", { number: i + 1 })}
              aria-current={i === page ? "page" : undefined}
              onClick={() => changePage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === pages - 1}
            aria-label={t("design.next")}
            onClick={() => changePage(page + 1)}
          >
            <span className="next-page-label">
              {t("design.nextCollection")}
            </span>
            <ChevronRight size={17} />
          </button>
        </nav>
      </div>
    </section>
  );
}
