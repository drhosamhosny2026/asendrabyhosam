"use client";
import { useEffect } from "react";

const CLASS = "svc-target";
const DURATION = 3200;

/**
 * Highlights the service card the visitor jumped to (e.g. /consulting#feasibility
 * from the mega menu). Next.js updates the hash with pushState, which doesn't
 * trigger CSS :target or `hashchange`, so we read the hash ourselves: on mount
 * (arriving from another page) and after any in-page anchor click.
 */
export default function TargetHighlight() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const highlight = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el || !el.hasAttribute("data-service-card")) return;
      document.querySelectorAll(`.${CLASS}`).forEach((n) => n.classList.remove(CLASS));
      void el.offsetWidth; // restart the animation if the same card is chosen again
      el.classList.add(CLASS);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove(CLASS), DURATION);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      // wait for the mobile drawer to finish collapsing so the scroll target is final
      if (a && a.getAttribute("href")?.includes("#")) setTimeout(highlight, 340);
    };

    const first = setTimeout(highlight, 120);
    window.addEventListener("hashchange", highlight);
    document.addEventListener("click", onClick);
    return () => {
      clearTimeout(first);
      if (timer) clearTimeout(timer);
      window.removeEventListener("hashchange", highlight);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
