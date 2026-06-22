"use client";
import { useState } from "react";

interface Props {
  pillar1: string;
  pillar2: string;
  digitalCta: string;
  consultingCta: string;
  rtl: boolean;
}

export default function ServicesPillarNav({ pillar1, pillar2, digitalCta, consultingCta, rtl }: Props) {
  const [active, setActive] = useState<"digital" | "consulting">("digital");
  const arrow = rtl ? " ←" : " →";

  const card = (id: "digital" | "consulting", extraClass = "") => {
    const isActive = active === id;
    return [
      "group block border-s-2 ps-6 pe-8 py-4 cursor-pointer transition-all duration-200",
      extraClass,
      isActive ? "border-gold" : "border-white/20 hover:border-gold/50",
    ].join(" ");
  };

  const label = (id: "digital" | "consulting") =>
    [
      "font-sans text-[10px] uppercase tracking-label font-medium mb-2 transition-colors duration-200",
      active === id ? "text-gold" : "text-gold/45 group-hover:text-gold/75",
    ].join(" ");

  const body = (id: "digital" | "consulting") =>
    [
      "text-sm leading-relaxed mb-3 transition-colors duration-200",
      active === id ? "text-white/75" : "text-white/35 group-hover:text-white/55",
    ].join(" ");

  const cta = (id: "digital" | "consulting") =>
    [
      "font-sans text-[9px] uppercase tracking-label transition-colors duration-200",
      active === id ? "text-gold" : "text-white/20 group-hover:text-white/40",
    ].join(" ");

  return (
    <div className="grid md:grid-cols-2 gap-0 max-w-3xl rise rise-d4">
      <a href="#digital" onClick={() => setActive("digital")} className={card("digital")}>
        <p className={label("digital")}>ASCENDRA Digital</p>
        <p className={body("digital")}>{pillar1}</p>
        <span className={cta("digital")}>{digitalCta}{arrow}</span>
      </a>

      <a href="#consulting" onClick={() => setActive("consulting")} className={card("consulting", "mt-6 md:mt-0")}>
        <p className={label("consulting")}>ASCENDRA Consulting</p>
        <p className={body("consulting")}>{pillar2}</p>
        <span className={cta("consulting")}>{consultingCta}{arrow}</span>
      </a>
    </div>
  );
}
