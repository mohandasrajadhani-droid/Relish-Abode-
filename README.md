# Relish Abode – Website

Website for **Relish Abode**, a private two-bedroom family homestay in Puliyarmala, Kalpetta North, Wayanad, Kerala.

**Status:** Stage 1 – homepage built (mobile-first, works on desktop too). Booking engine, admin dashboard and payments come in later stages.

## Tech stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react icons · self-hosted fonts (Cormorant Garamond + Inter). Planned: Supabase (PostgreSQL) and Vercel hosting.

## Run it on your computer
```bash
npm install
npm run dev        # open http://localhost:3000
```

Other commands:
```bash
npm run build                    # production build (for Vercel)
npm run lint                     # code checks
node scripts/optimize-images.mjs # rebuild web photos from assets/originals
./scripts/build-preview.sh       # static preview build into ./out
```

## Where things live
| Path | What it is |
|---|---|
| `src/content/site.ts` | **All business facts** shown on the site (phone, address, check-in/out, max guests, facilities, photo list). Change facts here only. |
| `src/components/` | Page sections (Header, Hero, Spaces, Gallery, Enquiry, Location, Footer …) |
| `src/app/` | Page layout, global styles, favicon |
| `assets/originals/` | Owner's original photos and logo – never edit these |
| `public/images/` | Web-optimised WebP copies (generated) |

## Business rules already in the code
- The whole house is booked by one group at a time (no room-by-room booking).
- Maximum 6 guests.
- Check-in 2:00 PM, check-out 11:00 AM.
- Enquiries go to WhatsApp +91 81398 29694; a stay is confirmed only after the owner replies.
- Price, cancellation policy, AC and attached bathrooms are **not shown** until the owner confirms them.

## Photos
All photos are of the actual property, supplied by the owner.
