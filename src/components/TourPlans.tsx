"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Car, Home, Info, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";
import { dayTotalKm, routeLink, site, tourPlans, whatsappLink } from "@/content/site";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-muted">Loading map…</div>,
});

export function TourPlans() {
  const [planIdx, setPlanIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const plan = tourPlans[planIdx];
  const day = plan.days[dayIdx] ?? plan.days[0];

  return (
    <section id="plans" className="bg-forest-100/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-3 text-sm font-medium text-earth">Tour plans</p>
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">
            Make the most of one or two days
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">
            Simple loops that start and end at {site.name}. They stay on main roads, group nearby places together and
            get you home before dark, so no time is lost on long detours or remote forest tracks.
          </p>
        </Reveal>

        {/* Plan tabs */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose a plan">
          {tourPlans.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={planIdx === i}
              onClick={() => {
                setPlanIdx(i);
                setDayIdx(0);
              }}
              className={`rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                planIdx === i ? "bg-forest-800 text-ivory" : "border border-forest-800/30 text-forest-900 hover:bg-ivory"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {plan.days.length > 1 && (
          <div className="mt-3 flex gap-2" role="tablist" aria-label="Choose a day">
            {plan.days.map((d, i) => (
              <button
                key={d.title}
                type="button"
                role="tab"
                aria-selected={dayIdx === i}
                onClick={() => setDayIdx(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  dayIdx === i ? "bg-earth text-ivory" : "bg-ivory text-earth-dark hover:bg-beige"
                }`}
              >
                Day {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-3">
            <div className="h-[360px] overflow-hidden rounded-[28px] border border-beige bg-ivory-dark sm:h-[440px] lg:h-[520px]">
              <RouteMap day={day} />
            </div>
            <a
              href={routeLink(day)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 font-medium text-ivory transition-colors hover:bg-forest-900"
            >
              <Navigation size={18} aria-hidden /> Open this route in Google Maps
            </a>
          </div>

          <div className="rounded-[28px] border border-beige bg-ivory p-5 sm:p-6">
            <h3 className="text-2xl font-medium text-forest-900">{day.title}</h3>
            <p className="mt-1 text-sm text-muted">{day.summary}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-beige/70 px-3 py-1 text-sm font-medium text-earth-dark">
              <Car size={15} aria-hidden /> About {dayTotalKm(day)} km in total
            </p>

            <div className="mt-6">
              <TimelineRow icon={<Home size={14} aria-hidden />} title={`Start at ${site.name}`} time="7:30 AM" />
              {day.stops.map((s, i) => (
                <div key={s.spot}>
                  <Leg km={s.legKm} />
                  <TimelineRow n={i + 1} title={s.spot} time={s.time} tip={s.tip} />
                </div>
              ))}
              <Leg km={day.returnKm} />
              <TimelineRow icon={<Home size={14} aria-hidden />} title={`Back at ${site.name}`} time="Before dark" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3 rounded-2xl border border-beige-dark/40 bg-ivory/70 p-4 text-sm leading-relaxed text-muted">
          <Info size={18} className="mt-0.5 shrink-0 text-earth" aria-hidden />
          <p>
            Distances and times are approximate, and opening days can change, especially in the monsoon. We are happy to
            adjust a plan for your group, or suggest a driver.{" "}
            <a
              href={whatsappLink("Hello Relish Abode, could you help me plan our Wayanad sightseeing?")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-forest-700 underline underline-offset-2"
            >
              Ask us on WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Leg({ km }: { km: number }) {
  return (
    <div className="flex items-center gap-3 py-1 pl-[13px]">
      <span className="h-6 border-l-2 border-dashed border-forest-600/50" aria-hidden />
      <span className="text-xs font-semibold text-earth">{km} km drive</span>
    </div>
  );
}

function TimelineRow({
  n,
  icon,
  title,
  time,
  tip,
}: {
  n?: number;
  icon?: React.ReactNode;
  title: string;
  time: string;
  tip?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-ivory ${
          n ? "bg-forest-800" : "bg-earth"
        }`}
        aria-hidden
      >
        {n ?? icon}
      </span>
      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="font-medium text-forest-900">{title}</span>
          <span className="text-sm text-muted">{time}</span>
        </div>
        {tip && <p className="mt-0.5 text-sm leading-snug text-muted">{tip}</p>}
      </div>
    </div>
  );
}
