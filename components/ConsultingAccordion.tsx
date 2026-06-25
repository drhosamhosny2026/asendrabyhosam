"use client";
import { useState } from "react";

interface Item {
  name: string;
  desc: string;
}

interface Props {
  items: Item[];
  footerNote: string;
}

function ItemIcon({ index }: { index: number }) {
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
        /* Business Analysis — bar chart */
        <>
          <line x1="4" y1="18" x2="4" y2="10" />
          <line x1="9" y1="18" x2="9" y2="4" />
          <line x1="14" y1="18" x2="14" y2="13" />
          <line x1="19" y1="18" x2="19" y2="7" />
          <line x1="2" y1="18" x2="21" y2="18" />
        </>
      )}
      {index === 1 && (
        /* Strategic Planning — compass */
        <>
          <circle cx="11" cy="11" r="9" />
          <polygon points="14.5 7.5 9.5 9.5 7.5 14.5 12.5 12.5" />
        </>
      )}
      {index === 2 && (
        /* Operational Optimization — sliders */
        <>
          <line x1="4" y1="6" x2="18" y2="6" />
          <line x1="4" y1="11" x2="18" y2="11" />
          <line x1="4" y1="16" x2="18" y2="16" />
          <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
          <circle cx="14" cy="11" r="2" fill="currentColor" stroke="none" />
          <circle cx="9" cy="16" r="2" fill="currentColor" stroke="none" />
        </>
      )}
      {index === 3 && (
        /* Performance Management — trending up */
        <>
          <polyline points="2 18 8 11 13 15 20 5" />
          <polyline points="16 5 20 5 20 9" />
        </>
      )}
      {index === 4 && (
        /* Operational Excellence — hexagon */
        <polygon points="11 2 19.5 6.5 19.5 15.5 11 20 2.5 15.5 2.5 6.5" />
      )}
      {index === 5 && (
        /* Growth Consulting — arrow up with base */
        <>
          <line x1="11" y1="19" x2="11" y2="3" />
          <polyline points="5 9 11 3 17 9" />
          <line x1="4" y1="19" x2="18" y2="19" />
        </>
      )}
    </svg>
  );
}

export default function ConsultingAccordion({ items, footerNote }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {/* Flat editorial rows — no card boxes, dividers only */}
      <div className="border-t border-white/[0.08]">
        {items.map((item, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              className={[
                "border-b border-white/[0.08] transition-colors duration-200",
                isOpen ? "bg-white/[0.04]" : "",
              ].join(" ")}
            >
              <button
                type="button"
                className="w-full text-start flex items-start gap-6 py-11 group"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={open === i}
                aria-controls={`con-panel-${i}`}
              >
                {/* Icon */}
                <span
                  className={[
                    "w-5 h-5 shrink-0 mt-1.5 transition-colors duration-200",
                    isOpen ? "text-gold" : "text-white/25 group-hover:text-gold/65",
                  ].join(" ")}
                >
                  <ItemIcon index={i} />
                </span>

                {/* Title */}
                <span className="flex-1 min-w-0">
                  <span className={[
                    "block font-serif font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight transition-colors duration-200",
                    isOpen ? "text-white" : "text-white/65 group-hover:text-white/90",
                  ].join(" ")}>
                    {item.name}
                  </span>
                </span>

                {/* Chevron */}
                <span
                  className={[
                    "w-4 h-4 shrink-0 mt-2 transition-all duration-200",
                    isOpen ? "text-gold rotate-180" : "text-white/20 group-hover:text-white/45",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 5.5l5 5 5-5" />
                  </svg>
                </span>
              </button>

              {/* Panel */}
              <div
                id={`con-panel-${i}`}
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="pb-10">
                    <div className="ms-11 border-t border-white/[0.08] pt-6">
                      <p className="text-white/50 text-base leading-relaxed max-w-2xl pe-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-20 text-white/25 text-sm leading-relaxed border-t border-white/[0.08] pt-8">
        {footerNote}
      </p>
    </div>
  );
}
