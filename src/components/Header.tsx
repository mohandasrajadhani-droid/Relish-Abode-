"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ivory/95 text-forest-900 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "text-ivory"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px]">
        <a
          href="#home"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
          className={`block rounded-xl bg-white px-2 py-1 transition-shadow ${solid ? "" : "shadow-lg shadow-black/20"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-header.webp"
            srcSet="/images/logo-header.webp 1x, /images/logo-header@2x.webp 2x"
            alt={`${site.name} logo`}
            width={97}
            height={48}
            className="h-10 w-auto md:h-12"
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="opacity-90 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
          <a
            href={whatsappLink("Hello Relish Abode, I'd like to check availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-earth px-5 py-2.5 font-medium text-ivory transition-colors hover:bg-earth-dark"
          >
            <MessageCircle size={16} aria-hidden /> Book on WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-beige bg-ivory px-5 pb-6 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-beige/70 py-3.5 font-serif text-xl text-forest-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink("Hello Relish Abode, I'd like to check availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-forest-800 py-3.5 font-medium text-ivory"
          >
            <MessageCircle size={18} aria-hidden /> Book on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
