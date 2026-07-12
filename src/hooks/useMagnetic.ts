import { useEffect } from "react";

export function useMagnetic() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const cleanups: (() => void)[] = [];
    const bind = () => {
      cleanups.forEach((c) => c());
      cleanups.length = 0;
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.25;
          const y = (e.clientY - r.top - r.height / 2) * 0.35;
          el.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => (el.style.transform = "translate(0,0)");
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });
    };
    // rebind after mount / language switches re-render
    const id = window.setTimeout(bind, 300);
    return () => {
      window.clearTimeout(id);
      cleanups.forEach((c) => c());
    };
  }, []);
}
