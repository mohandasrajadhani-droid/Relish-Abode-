import Image from "next/image";
import {
  Armchair,
  BookOpen,
  Clock,
  CookingPot,
  Flame,
  House,
  KeyRound,
  MapPin,
  MessageCircle,
  Mountain,
  Navigation,
  Phone,
  Sofa,
  Tv,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { facilities, mapsLink, photos, site, spaces, whatsappLink } from "@/content/site";

/* ---------- Quick facts ---------- */
export function QuickFacts() {
  const items = [
    { icon: House, label: "Whole house", sub: "One group at a time" },
    { icon: KeyRound, label: "2 bedrooms", sub: `Up to ${site.maxGuests} guests` },
    { icon: Clock, label: `Check-in ${site.checkIn}`, sub: `Check-out ${site.checkOut}` },
    { icon: Wifi, label: "Free Wi-Fi", sub: "Throughout the house" },
  ];
  return (
    <section aria-label="Stay at a glance" className="bg-forest-800 text-ivory">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-forest-700/60 md:grid-cols-4">
        {items.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-start gap-3 bg-forest-800 px-5 py-5 md:py-7">
            <Icon size={22} className="mt-0.5 shrink-0 text-beige" aria-hidden />
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-sm text-ivory/70">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Intro ---------- */
export function Intro() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium text-earth">Welcome to Relish Abode</p>
        <h2 className="text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">
          A quiet family home, kept for your stay
        </h2>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
          <p>
            Relish Abode is a two-storey home in Puliyarmala, just outside Kalpetta. When you book, you get the whole
            house: both bedrooms, the kitchen, the sit-out, the dining area, the upstairs recreation hall and the
            balcony.
          </p>
          <p>
            There are no other guests sharing the house. Cook your own meals or have restaurant food delivered,
            pick a book from the shelf, and end the day by the campfire.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          <Image src={photos.exterior.src} alt={photos.exterior.alt} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute -bottom-6 -left-4 w-[46%] overflow-hidden rounded-2xl border-[6px] border-ivory shadow-xl sm:-left-8">
          <div className="relative aspect-[4/3]">
            <Image src={photos.living.thumb} alt={photos.living.alt} fill sizes="25vw" className="object-cover" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Spaces ---------- */
export function Spaces() {
  return (
    <section id="spaces" className="bg-ivory-dark py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-earth">The home</p>
          <h2 className="text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">Every room is yours</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            We don&apos;t rent rooms separately. Your booking covers the full house, so families and small groups can
            spread out and feel at home.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16 md:space-y-24">
          {spaces.map((s, i) => (
            <Reveal key={s.title}>
              <article
                className={`grid items-center gap-7 md:grid-cols-2 md:gap-14 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
              >
                <div className={`grid gap-3 ${s.photos.length > 1 ? "grid-cols-[1.4fr_1fr]" : ""}`}>
                  {s.photos.map((p, j) => (
                    <div
                      key={p.src}
                      className={`relative overflow-hidden rounded-2xl ${
                        s.photos.length > 1 ? (j === 0 ? "aspect-[4/5]" : "aspect-[3/5] self-end") : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={j === 0 ? p.src : p.thumb}
                        alt={p.alt}
                        fill
                        sizes="(min-width:768px) 30vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-3xl font-medium text-forest-900 md:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- The view ---------- */
export function TheView() {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="mb-3 text-sm font-medium text-beige">From the balcony</p>
          <h2 className="text-4xl font-medium leading-[1.08] md:text-5xl">
            Hills on a clear day, <em className="font-medium">mist</em> on the rest
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ivory/80">
            The upstairs balcony faces the mountains around Kalpetta. On bright days the peaks stand sharp behind the
            coconut palms. On misty mornings they vanish, and the swing is the best seat in the house.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-t-full">
            <Image src={photos.view.src} alt={photos.view.alt} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Facilities ---------- */
const iconMap: Record<string, LucideIcon> = {
  home: House,
  wifi: Wifi,
  mountain: Mountain,
  armchair: Armchair,
  cooking: CookingPot,
  utensils: UtensilsCrossed,
  flame: Flame,
  books: BookOpen,
  tv: Tv,
  sofa: Sofa,
};

export function Facilities() {
  return (
    <section id="facilities" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <p className="mb-3 text-sm font-medium text-earth">Facilities</p>
        <h2 className="text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">What&apos;s included</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <ul className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <li key={f.label} className="flex items-center gap-4 border-b border-beige py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-800">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="text-[16px] text-ink">{f.label}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- Location ---------- */
export function Location() {
  return (
    <section id="location" className="bg-beige/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-medium text-earth">Location</p>
          <h2 className="text-4xl font-medium leading-[1.08] text-forest-900 md:text-5xl">Find us in Kalpetta North</h2>
          <address className="mt-6 flex gap-3 not-italic text-[17px] leading-relaxed text-ink">
            <MapPin size={20} className="mt-1 shrink-0 text-earth" aria-hidden />
            <span>
              {site.name}
              <br />
              {site.address.lines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </span>
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 font-medium text-ivory transition-colors hover:bg-forest-900"
            >
              <Navigation size={18} aria-hidden /> Open in Google Maps
            </a>
            <a
              href={`tel:${site.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-800/30 px-6 py-3.5 font-medium text-forest-900 transition-colors hover:bg-ivory"
            >
              <Phone size={18} aria-hidden /> {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3] md:aspect-[4/5]">
            <Image src={photos.gate.src} alt={photos.gate.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="bg-forest-950 pb-28 pt-14 text-ivory/80 lg:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-full.webp"
            alt={`${site.name} Homestay, a peaceful place to stay`}
            width={627}
            height={400}
            loading="lazy"
            className="h-auto w-56 rounded-2xl bg-white p-2"
          />
          <p className="mt-4 text-sm">{site.tagline}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-2 font-medium text-ivory">Stay times</p>
          <p>Check-in from {site.checkIn}</p>
          <p>Check-out by {site.checkOut}</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="mb-2 font-medium text-ivory">Contact</p>
          <p>
            <a href={`tel:${site.phoneE164}`} className="hover:text-ivory">
              {site.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
              WhatsApp {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-3 text-ivory/60">Also listed on {site.alsoListedOn.join(", ")}.</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-5 text-xs text-ivory/50">
        © {new Date().getFullYear()} {site.name}, Wayanad. Photos of the actual property.
      </p>
    </footer>
  );
}

/* ---------- Floating WhatsApp (mobile) ---------- */
export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-beige bg-ivory/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
      <div className="flex gap-3">
        <a
          href="#enquire"
          className="flex flex-1 items-center justify-center rounded-full border border-forest-800/30 py-3 text-[15px] font-medium text-forest-900"
        >
          Check dates
        </a>
        <a
          href={whatsappLink("Hello Relish Abode, I'd like to check availability.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.3] items-center justify-center gap-2 rounded-full bg-forest-800 py-3 text-[15px] font-medium text-ivory"
        >
          <MessageCircle size={18} aria-hidden /> WhatsApp us
        </a>
      </div>
    </div>
  );
}
