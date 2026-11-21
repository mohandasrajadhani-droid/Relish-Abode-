"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Navigation } from "lucide-react";
import { Reveal } from "./Reveal";
import { directionsLink, spots } from "@/content/site";

// Leaflet touches `window`, so the map renders only in the browser.
const WayanadMap = dynamic(() => import("./WayanadMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-muted">Loading map…</div>,
});

export function ExploreWayanad() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="explore" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-3 text-sm font-medium text-earth">Explore Wayanad</p>
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">
            Lakes, peaks and waterfalls within an easy drive
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">
            We sit just north of Kalpetta, in the middle of the district, so most of Wayanad&rsquo;s favourite places are
            under an hour away. Tap a place to see it on the map.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
          <div className="h-[380px] overflow-hidden rounded-[28px] border border-beige bg-ivory-dark sm:h-[460px] lg:sticky lg:top-24 lg:h-[600px]">
            <WayanadMap active={active} onSelect={setActive} />
          </div>

          <div>
            <ol className="divide-y divide-beige overflow-hidden rounded-[28px] border border-beige bg-white/60">
              {spots.map((s, i) => (
                <li key={s.name} className={active === i ? "bg-forest-100/70" : undefined}>
                  <div className="flex items-start gap-4 px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="flex flex-1 items-start gap-4 text-left"
                      aria-label={`Show ${s.name} on the map`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          active === i ? "bg-earth text-ivory" : "bg-forest-800 text-ivory"
                        }`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium text-forest-900">{s.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted">{s.note}</span>
                      </span>
                    </button>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="whitespace-nowrap text-sm font-semibold text-earth">~{s.km} km</span>
                      <a
                        href={directionsLink(s.query)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-forest-700 underline-offset-2 hover:underline"
                        aria-label={`Directions to ${s.name}`}
                      >
                        <Navigation size={12} aria-hidden /> Directions
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 px-2 text-xs leading-relaxed text-muted">
              Distances are approximate road distances from Relish Abode. Tap Directions for the exact route and travel
              time. Some places close on certain days or in the monsoon, so please check before you go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
