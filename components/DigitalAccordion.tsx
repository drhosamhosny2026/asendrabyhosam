"use client";
import { useState } from "react";

interface ServiceItem {
  name: string;
  desc: string;
}

interface Group {
  name: string;
  desc: string;
  items: ServiceItem[];
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
        <>
          <circle cx="11" cy="11" r="9" />
          <line x1="2" y1="11" x2="20" y2="11" />
          <path d="M11 2c-2.5 3.5-4 5.8-4 9s1.5 5.5 4 9" />
          <path d="M11 2c2.5 3.5 4 5.8 4 9s-1.5 5.5-4 9" />
        </>
      )}
      {index === 1 && (
        <>
          <polygon points="11 2 21 7.5 11 13 1 7.5" />
          <polyline points="21 13.5 11 19 1 13.5" />
          <polyline points="21 10.75 11 16.25 1 10.75" />
        </>
      )}
      {index === 2 && (
        <polygon points="13 2 3 14 11 14 9 20 19 8 11 8" />
      )}
      {index === 3 && (
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
  const [serviceOpen, setServiceOpen] = useState<Record<string, boolean>>({});

  const svcKey = (catIdx: number, svcIdx: number) => `${catIdx}-${svcIdx}`;
  const isServiceOpen = (catIdx: number, svcIdx: number) =>
    !!serviceOpen[svcKey(catIdx, svcIdx)];
  const toggleService = (catIdx: number, svcIdx: number) => {
    const k = svcKey(catIdx, svcIdx);
    setServiceOpen((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <div>
      <div className="border-t border-navy/8">
        {groups.map((g, i) => {
          const isOpen = open === i;

          return (
            <div
              key={i}
              className={[
                "border-b border-navy/8 border-s-2 transition-colors duration-200",
                isOpen ? "border-s-gold/50 bg-white" : "border-s-transparent",
              ].join(" ")}
            >
              {/* ── Level 1 button ── */}
              <button
                type="button"
                className="w-full text-start flex items-start gap-6 px-6 py-8 group"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={open === i}
                aria-controls={`dp-panel-${i}`}
              >
                <span
                  className={[
                    "w-5 h-5 shrink-0 mt-1.5 transition-colors duration-200",
                    isOpen ? "text-gold" : "text-gold/40 group-hover:text-gold/75",
                  ].join(" ")}
                >
                  <CardIcon index={i} />
                </span>

                <span className="flex-1 min-w-0">
                  <span className="block font-serif font-semibold text-2xl md:text-[1.75rem] leading-tight tracking-tight text-navy mb-2">
                    {g.name}
                  </span>
                  <span className="block text-navy/55 text-base leading-relaxed">
                    {g.desc}
                  </span>
                </span>

                <span
                  className={[
                    "w-4 h-4 shrink-0 mt-2 transition-all duration-200",
                    isOpen ? "text-gold rotate-180" : "text-navy/25 group-hover:text-navy/50",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 5.5l5 5 5-5" />
                  </svg>
                </span>
              </button>

              {/* ── Level 1 panel ── */}
              <div
                id={`dp-panel-${i}`}
                className={[
                  "grid transition-[grid-template-rows] duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="px-6 pb-8">
                    <div className="ms-11 border-t border-navy/8 pt-2">
                      {g.items.map((svc, j) => {
                        const sOpen = isServiceOpen(i, j);

                        return (
                          <div
                            key={j}
                            className="group/svc border-b border-navy/8 last:border-0"
                          >
                            {/* ── Level 2 button ── */}
                            <button
                              type="button"
                              className="w-full text-start flex items-center justify-between gap-4 py-4"
                              onClick={() => toggleService(i, j)}
                              aria-expanded={isServiceOpen(i, j)}
                              aria-controls={`dp-svc-${i}-${j}`}
                            >
                              <span className={[
                                "font-sans text-sm leading-snug transition-colors duration-150",
                                sOpen ? "text-navy" : "text-navy/55 group-hover/svc:text-navy",
                              ].join(" ")}>
                                {svc.name}
                              </span>
                              <span
                                className={[
                                  "w-3 h-3 shrink-0 transition-all duration-200",
                                  sOpen ? "text-gold rotate-90" : "text-navy/25 group-hover/svc:text-navy/50",
                                ].join(" ")}
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                  <path d="M4 2l4 4-4 4" />
                                </svg>
                              </span>
                            </button>

                            {/* ── Level 2 panel ── */}
                            <div
                              id={`dp-svc-${i}-${j}`}
                              className={[
                                "grid transition-[grid-template-rows] duration-200 ease-in-out",
                                sOpen
                                  ? "grid-rows-[1fr]"
                                  : "grid-rows-[0fr] md:group-hover/svc:grid-rows-[1fr]",
                              ].join(" ")}
                            >
                              <div className="overflow-hidden min-h-0">
                                <p className="text-navy/50 text-sm leading-relaxed pb-4 pe-4">
                                  {svc.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-navy/40 text-sm leading-relaxed border-t border-navy/8 pt-6">
        {footerNote}
      </p>
    </div>
  );
}
