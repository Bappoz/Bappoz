import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Tooltip } from "../Ui";
import "./glass-card.css";

export interface GlassCardLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  profileName: string;
  handle: string;
  description: string;
  education: string;
  logoSrc: string;
  links: GlassCardLink[];
  moreLabel: string;
  moreHref: string;
}

// Adapted from the user's GlassCard: the same perspective, glass pane and
// layered circles, with scoped CSS and the portfolio's real content.
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className = "",
      profileName,
      handle,
      description,
      education,
      logoSrc,
      links,
      moreLabel,
      moreHref,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={`glass-card ${className}`} {...props}>
      <div className="glass-card-surface">
        <div className="glass-card-pane" aria-hidden="true" />
        <div className="glass-card-content">
          <h2>{profileName}</h2>
          <span className="glass-card-handle">{handle}</span>
          <p>{description}</p>
          <span className="glass-card-education">{education}</span>
        </div>
        <div className="glass-card-bottom">
          <div className="glass-card-socials">
            {links.map((link, index) => (
              <Tooltip key={link.href} text={link.label}>
                <a
                  className="glass-card-social"
                  href={link.href}
                  aria-label={link.label}
                  target={
                    link.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel="noreferrer"
                  style={
                    {
                      "--social-delay": `${index * 80}ms`,
                    } as React.CSSProperties
                  }
                >
                  {link.icon}
                </a>
              </Tooltip>
            ))}
          </div>
          <a className="glass-card-more" href={moreHref}>
            {moreLabel}
            <ChevronDown size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
      <div className="glass-card-orbit" aria-hidden="true">
        {[
          { size: 170, inset: 8, depth: 35 },
          { size: 140, inset: 23, depth: 65 },
          { size: 110, inset: 38, depth: 95 },
          { size: 80, inset: 53, depth: 125 },
        ].map((circle, index) => (
          <div
            key={circle.depth}
            className="glass-card-ring"
            style={
              {
                width: circle.size,
                top: circle.inset,
                right: circle.inset,
                "--depth": `${circle.depth}px`,
                "--ring-delay": `${index * 90}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="glass-card-mark">
          <img src={logoSrc} alt="" width={31} height={25} />
        </div>
      </div>
    </div>
  ),
);
GlassCard.displayName = "GlassCard";
export default GlassCard;
