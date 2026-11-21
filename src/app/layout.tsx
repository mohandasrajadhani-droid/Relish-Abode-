import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL once the domain is confirmed.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Relish Abode | Family Homestay in Wayanad, Kalpetta",
  description:
    "Relish Abode is a private two-bedroom family homestay in Puliyarmala, Kalpetta North, Wayanad. Whole-house stays with a kitchen, recreation hall, free Wi-Fi and a balcony with hill views.",
  openGraph: {
    title: "Relish Abode | Family Homestay in Wayanad",
    description: "A private two-bedroom home among Wayanad's hills. Book directly on WhatsApp.",
    images: ["/images/balcony-mountain-view.webp"],
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f3d2d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
