"use client";
import React, { useState, useEffect } from "react";

interface Props {
  pillar1: string;
  pillar2: string;
  digitalCta: string;
  consultingCta: string;
  rtl: boolean;
}

export default function ServicesPillarNav({
  pillar1,
  pillar2,
  digitalCta,
  consultingCta,
  rtl,
}: Props) {
  const [active, setActive] = useState<"digital" | "consulting" | null>(null);
  const arrow = rtl ? " ←" : " →";

  // Smooth scroll + immediate active feedback on click
  const goTo = (id: "digital" | "consulting") => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll-based active state via IntersectionObserver
  useEffect(() => {
    const sections = ["digital", "consulting"] as const;
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -30% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const cardClass = (id: "digital" | "consulting", extra = "") => {
    const on = active === id;
    return [
      "group block border-s-2 ps-6 pe-8 py-5 cursor-pointer",
      "transition-colors duration-200",
      extra,
      on
        ? "border-gold bg-white/[0.05]"
        : "border-white/20 hover:border-gold/55 hover:bg-white/[0.04]",
    ].join(" ");
  };

  const labelClass = (id: "digital" | "consulting") => {
    const on = active === id;
    return [
      "font-sans text-[10px] uppercase tracking-label font-medium mb-2 transition-colors duration-200",
      on ? "text-gold" : "text-gold/45 group-hover:text-gold/75",
    ].join(" ");
  };

  const bodyClass = (id: "digital" | "consulting") => {
    const on = active === id;
    return [
      "text-sm leading-relaxed mb-3 transition-colors duration-200",
      on ? "text-white/75" : "text-white/35 group-hover:text-white/55",
    ].join(" ");
  };

  const ctaClass = (id: "digital" | "consulting") => {
    const on = active === id;
    return [
      "font-sans text-[9px] uppercase tracking-label transition-colors duration-200",
      on ? "text-gold" : "text-white/20 group-hover:text-white/40",
    ].join(" ");
  };

  return (
    <div className="grid md:grid-cols-2 gap-0 max-w-3xl rise rise-d4">
      <a href="#digital" onClick={goTo("digital")} className={cardClass("digital")}>
        <p className={labelClass("digital")}>ASCENDRA Digital</p>
        <p className={bodyClass("digital")}>{pillar1}</p>
        <span className={ctaClass("digital")}>{digitalCta}{arrow}</span>
      </a>

      <a href="#consulting" onClick={goTo("consulting")} className={cardClass("consulting", "mt-6 md:mt-0")}>
        <p className={labelClass("consulting")}>ASCENDRA Consulting</p>
        <p className={bodyClass("consulting")}>{pillar2}</p>
        <span className={ctaClass("consulting")}>{consultingCta}{arrow}</span>
      </a>
    </div>
  );
}
