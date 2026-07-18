import type { CSSProperties } from "react";
import { gallery } from "../data/gallery";

export default function GalleryCarousel() {
  const items: (string | null)[] = gallery.length
    ? gallery
    : Array.from({ length: 5 }, () => null);
  const n = items.length;

  return (
    <div className="gallery" style={{ "--n": n } as CSSProperties}>
      <div className="gallery__ring">
        {items.map((src, i) => (
          <div className="gallery__item" key={i} style={{ "--i": i } as CSSProperties}>
            {src ? (
              <img src={src} alt="" loading="lazy" />
            ) : (
              <span className="gallery__ph mono">{String(i + 1).padStart(2, "0")}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
