import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a plain static build (used for shareable previews).
// Normal builds (Vercel) keep full Next.js server features for the booking engine.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    // Photos are pre-optimised to WebP by scripts/optimize-images.mjs
    unoptimized: true,
  },
};

export default nextConfig;
