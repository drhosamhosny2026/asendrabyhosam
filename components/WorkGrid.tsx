"use client";
import { useState } from "react";
import Image from "next/image";
import type { PillarKey } from "@/lib/services";

export type WorkCard = {
  id: string;
  title: string;
  desc: string;
  delivered: string;
  pillars: PillarKey[];
  links: { label: string; url: string }[];
  images: string[];
};

const TAG_STYLE: Record<PillarKey, string> = {
  consulting: "text-navy bg-[#EEF1F5]",
  digital: "text-emerald bg-[#E7F2EE]",
  marketing: "text-gold-deep bg-[#FBF5E1]",
};

export default function WorkGrid({
  cards, pillarNames, labels,
}: {
  cards: WorkCard[];
  pillarNames: Record<PillarKey, string>;
  labels: { all: string; filter: string; delivered: string; empty: string; placeholder: string; arrow: string };
}) {
  const [filter, setFilter] = useState<PillarKey | "all">("all");
  const options: (PillarKey | "all")[] = ["all", "consulting", "digital", "marketing"];
  const shown = cards.filter((c) => filter === "all" || c.pillars.includes(filter));

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2.5">
        {options.map((k) => {
          const active = filter === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(k)}
              className={`flex items-center min-h-[44px] px-5 rounded-full text-base transition border ${
                active ? "bg-navy text-white border-navy font-semibold" : "bg-white text-navy border-[#C5CDD8] hover:border-navy"
              }`}
            >
              {k === "all" ? labels.all : pillarNames[k]}
            </button>
          );
        })}
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <article key={p.id} className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10] bg-[#16304F] border-b border-line">
                {p.images[0] && (
                  <Image src={p.images[0]} alt={`${labels.placeholder}: ${p.title}`} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover object-top" />
                )}
              </div>
              <div className="p-8 flex flex-col gap-3.5 grow">
                <div className="flex flex-wrap gap-2">
                  {p.pillars.map((k) => (
                    <span key={k} className={`text-sm font-semibold rounded-full px-3.5 py-1.5 ${TAG_STYLE[k]}`}>{pillarNames[k]}</span>
                  ))}
                </div>
                <h3 className="m-0 text-2xl font-bold text-navy">{p.title}</h3>
                <p className="m-0 text-base leading-[1.85] text-gray-text">{p.desc}</p>
                <p className="m-0 text-[15px] leading-[1.8] text-gray-text">
                  <strong className="text-navy">{labels.delivered}:</strong> {p.delivered}
                </p>
                {p.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-4">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-base font-semibold text-gold-deep hover:text-navy transition">
                        {l.label} {labels.arrow}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="m-0 text-[17px] text-gray-text">{labels.empty}</p>
      )}
    </div>
  );
}
