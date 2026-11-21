"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { Reveal } from "./Reveal";

// Local-date helpers (avoid UTC shifts: India is UTC+5:30).
const toLocalISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => toLocalISO(new Date());
const addDays = (iso: string, n: number) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return toLocalISO(d);
};
const fmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/**
 * Stage 1 enquiry: builds a pre-filled WhatsApp message.
 * Stage 2 replaces this with the live availability calendar + database-backed enquiries.
 */
export function Enquiry() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000);
  }, [checkIn, checkOut]);

  const datesInvalid = !!checkIn && !!checkOut && nights < 1;
  const ready = !!checkIn && !!checkOut && !datesInvalid;

  const message = [
    "Hello Relish Abode, I'd like to check availability.",
    ready ? `Dates: ${fmt(checkIn)} to ${fmt(checkOut)} (${nights} night${nights > 1 ? "s" : ""})` : null,
    guests ? `Guests: ${guests}` : null,
    name ? `Name: ${name}` : null,
    note ? `Note: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const field =
    "mt-1.5 block w-full rounded-xl border border-beige-dark/70 bg-ivory px-4 py-3 text-base text-ink outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20";

  return (
    <section id="enquire" className="bg-forest-800 py-20 text-ivory md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.15fr] md:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-medium text-beige">Enquire</p>
          <h2 className="text-4xl font-medium leading-[1.08] md:text-5xl">Plan your stay</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ivory/80">
            Choose your dates and send them to us on WhatsApp. We&apos;ll check availability and reply to confirm.
            Your booking is confirmed only once we reply.
          </p>
          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-forest-900/60 p-4">
              <dt className="text-ivory/60">Check-in</dt>
              <dd className="mt-1 text-lg font-medium">{site.checkIn}</dd>
            </div>
            <div className="rounded-2xl bg-forest-900/60 p-4">
              <dt className="text-ivory/60">Check-out</dt>
              <dd className="mt-1 text-lg font-medium">{site.checkOut}</dd>
            </div>
          </dl>
          <p className="mt-6 flex items-center gap-2 text-sm text-ivory/75">
            <Phone size={16} aria-hidden /> Prefer to call?{" "}
            <a href={`tel:${site.phoneE164}`} className="underline underline-offset-4">
              {site.phoneDisplay}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            className="rounded-[28px] bg-ivory p-6 text-ink shadow-2xl md:p-8"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Check-in date
                <input
                  id="enq-checkin"
                  type="date"
                  min={today()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (!checkOut || checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1));
                  }}
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium">
                Check-out date
                <input
                  id="enq-checkout"
                  type="date"
                  min={checkIn ? addDays(checkIn, 1) : today()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={field}
                  aria-invalid={datesInvalid}
                />
              </label>
              <label className="block text-sm font-medium">
                Number of guests <span className="font-normal text-muted">(max {site.maxGuests})</span>
                <input
                  id="enq-guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={site.maxGuests}
                  value={guests}
                  onChange={(e) => {
                    const v = e.target.value;
                    setGuests(v === "" ? "" : String(Math.min(site.maxGuests, Math.max(1, Number(v) || 1))));
                  }}
                  className={field}
                  placeholder={`1 to ${site.maxGuests}`}
                />
              </label>
              <label className="block text-sm font-medium">
                Your name
                <input
                  id="enq-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Anything we should know? <span className="font-normal text-muted">(optional)</span>
                <textarea
                  id="enq-note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={field}
                  placeholder="Arrival time, children, special occasion…"
                />
              </label>
            </div>

            <p className="mt-4 min-h-6 text-sm" aria-live="polite">
              {datesInvalid ? (
                <span className="text-red-700">Check-out must be after check-in.</span>
              ) : ready ? (
                <span className="text-forest-700">
                  {nights} night{nights > 1 ? "s" : ""} · {fmt(checkIn)} to {fmt(checkOut)}
                </span>
              ) : (
                <span className="text-muted">Pick your dates to include them in the message.</span>
              )}
            </p>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-forest-800 py-4 font-medium text-ivory transition-colors hover:bg-forest-900"
            >
              <MessageCircle size={18} aria-hidden /> Send enquiry on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted">Opens WhatsApp with your details filled in.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
