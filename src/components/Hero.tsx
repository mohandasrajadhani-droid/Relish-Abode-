"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, MessageCircle } from "lucide-react";
import { photos, whatsappLink } from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-950 text-ivory">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={photos.view.src}
          alt={photos.view.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </motion.div>
      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-forest-950/30" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-28 pt-32 md:pb-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm text-ivory/85">Family homestay · Puliyarmala, Kalpetta</p>
          <h1 className="text-[2.6rem] font-medium leading-[1.05] sm:text-6xl md:text-7xl">
            A whole home among the hills of Wayanad
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">
            Two bedrooms, your own kitchen and a balcony that looks out to the mountains. The house is booked for one
            group at a time, so it is yours alone.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 font-medium text-forest-900 transition-colors hover:bg-beige"
            >
              <CalendarDays size={18} aria-hidden /> Check your dates
            </a>
            <a
              href={whatsappLink("Hello Relish Abode, I'd like to know more about a stay.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/60 px-7 py-3.5 font-medium text-ivory transition-colors hover:bg-ivory/10"
            >
              <MessageCircle size={18} aria-hidden /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
