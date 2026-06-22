"use client";
import { useState } from "react";

interface Group {
  name: string;
  desc: string;
  items: string[];
}

interface Props {
  groups: Group[];
  footerNote: string;
}

function CardIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-full h-full"
    >
      {index === 0 && (
        /* Globe — Digital Presence */
        <>
          <circle cx="11" cy="11" r="9" />
          <line x1="2" y1="11" x2="20" y2="11" />
          <path d="M11 2c-2.5 3.5-4 5.8-4 9s1.5 5.5 4 9" />
          <path d="M11 2c2.5 3.5 4 5.8 4 9s-1.5 5.5-4 9" />
        </>
      )}
      {index === 1 && (
        /* Layers — Business Systems */
        <>
          <polygon points="11 2 21 7.5 11 13 1 7.5" />
          <polyline points="21 13.5 11 19 1 13.5" />
          <polyline points="21 10.75 11 16.25 1 10.75" />
        </>
      )}
      {index === 2 && (
        /* Zap — Automation & AI */
        <polygon points="13 2 3 14 11 14 9 20 19 8 11 8" />
      )}
      {index === 3 && (
        /* Gem — Branding & Identity */
        <>
          <path d="M5.5 3h11L20 8.5 11 19 2 8.5z" />
          <line x1="2" y1="8.5" x2="20" y2="8.5" />
          <path d="M5.5 3L11 8.5 16.5 3" />
        </>
      )}
    </svg>
  );
}

export default function DigitalAccordion({ groups, footerNote }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="space-y-2">
        {groups.map((g, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              className={[
                "bg-white border-s-2 transition-colors duration-200",
                isOpen
                  ? "border-gold"
                  : "border-transparent hover:border-gold/35",
              ].join(" ")}
            >
              <button
                type="button"
                className="w-full text-start flex items-start gap-7 px-10 py-9 group"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`dp-panel-${i}`}
              >
                {/* Icon */}
                <span
                  className={[
                    "w-5 h-5 shrink-0 mt-2 transition-colors duration-200",
                    isOpen
                      ? "text-gold"
                      : "text-gold/50 group-hover:text-gold/80",
                  ].join(" ")}
                >
                  <CardIcon index={i} />
                </span>

                {/* Title + description */}
                <span className="flex-1 min-w-0">
                  <span className="block font-serif font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight text-navy mb-2.5">
                    {g.name}
                  </span>
                  <span className="block text-navy/50 text-base leading-relaxed">
                    {g.desc}
                  </span>
                </span>

                {/* Chevron */}
                <span
                  className={[
                    "w-4 h-4 shrink-0 mt-3 transition-all duration-200",
                    isOpen
                      ? "text-gold rotate-180"
                      : "text-gold/30 group-hover:text-gold/65",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 5.5l5 5 5-5" />
                  </svg>
                </span>
              </button>

              {/* Accordion panel — CSS grid-template-rows transition */}
              <div
                id={`dp-panel-${i}`}
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="px-10 pb-9">
                    <div className="ms-12 border-t border-navy/8 pt-5">
                      <p className="font-sans text-[10px] uppercase tracking-label text-gold/60 leading-loose">
                        {g.items.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-14 text-navy/35 text-sm italic border-t border-navy/10 pt-8">
        {footerNote}
      </p>
    </div>
  );
}
