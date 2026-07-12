import { useMemo } from "react";

/**
 * Ferris — the Rust mascot — hand-built as pixel art.
 * The shell + eyes come from a character matrix; claws and legs are
 * separate pixel clusters so they can animate independently (wave / walk).
 */

const C: Record<string, string> = {
  D: "#a83e12", // dark outline
  O: "#f46c38", // body orange (accent)
  L: "#ff9a5c", // highlight
  S: "#d4501f", // shadow orange
  W: "#fdf3e7", // eye white
  K: "#1c1210", // pupil
};

const PX = 1; // logical pixel unit; scaled by the SVG viewBox consumer

// Rounded dome shell with two eyes on top.
const SHELL = [
  "....WW....WW....",
  "....WK....KW....",
  "...DOOD..DOOD...",
  "..DLLLLLLLLLLD..",
  ".DLLLLLLLLLLLLD.",
  "DLLOOOOOOOOOOLLD",
  "DOOOOOOOOOOOOOOD",
  ".DOOOOSSSSOOOOD.",
  "..DDDDDDDDDDDD..",
];

// Pincer claw (5x6), opening toward the body (to the right).
const CLAW = [
  ".DDD.",
  "DLLOD",
  "DOO.D",
  "DOO.D",
  "DLLOD",
  ".DDD.",
];

interface Cell {
  x: number;
  y: number;
  fill: string;
}

function toCells(matrix: string[], ox = 0, oy = 0): Cell[] {
  const cells: Cell[] = [];
  matrix.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      const fill = C[ch];
      if (fill) cells.push({ x: (x + ox) * PX, y: (y + oy) * PX, fill });
    })
  );
  return cells;
}

function mirror(matrix: string[]): string[] {
  return matrix.map((row) =>
    row
      .split("")
      .reverse()
      .join("")
  );
}

export default function FerrisCrab({
  size = 150,
  walk = false,
  className,
}: {
  size?: number;
  walk?: boolean;
  className?: string;
}) {
  const shell = useMemo(() => toCells(SHELL, 6, 3), []);
  const leftClaw = useMemo(() => toCells(mirror(CLAW), 0, 5), []);
  const rightClaw = useMemo(() => toCells(CLAW, 23, 5), []);
  const legs = useMemo(() => {
    // six little legs under the shell
    const arr: Cell[] = [];
    const legXs = [8, 11, 14, 17, 20, 23];
    legXs.forEach((lx, i) => {
      arr.push({ x: lx, y: 12, fill: C.D });
      arr.push({ x: lx, y: 13, fill: C.D });
      // stagger a marker for walk animation via className index
      void i;
    });
    return arr;
  }, []);

  const rects = (cells: Cell[]) =>
    cells.map((c, i) => (
      <rect key={i} x={c.x} y={c.y} width={PX} height={PX} fill={c.fill} shapeRendering="crispEdges" />
    ));

  return (
    <div
      className={`ferris ${walk ? "ferris--walk" : "ferris--idle"} ${className ?? ""}`}
      style={{ width: size, height: size * (16 / 28) }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 28 16" width="100%" height="100%" style={{ overflow: "visible" }}>
        {/* soft ground shadow */}
        <ellipse className="ferris__shadow" cx="14" cy="15.4" rx="9" ry="1" fill="rgba(0,0,0,0.35)" />
        {/* legs */}
        <g className="ferris__legs">{rects(legs)}</g>
        {/* claws (animate independently) */}
        <g className="ferris__claw ferris__claw--left" style={{ transformOrigin: "5px 8px" }}>
          {rects(leftClaw)}
        </g>
        <g className="ferris__claw ferris__claw--right" style={{ transformOrigin: "23px 8px" }}>
          {rects(rightClaw)}
        </g>
        {/* shell + eyes */}
        <g className="ferris__body">{rects(shell)}</g>
      </svg>
    </div>
  );
}
