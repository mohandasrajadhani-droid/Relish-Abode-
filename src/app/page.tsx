import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Enquiry } from "@/components/Enquiry";
import { Facilities, Footer, Intro, Location, MobileBookBar, QuickFacts, Spaces, TheView } from "@/components/Sections";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  description: "Private two-bedroom family homestay in Puliyarmala, Kalpetta North, Wayanad, Kerala.",
  telephone: site.phoneE164,
  checkinTime: "14:00",
  checkoutTime: "11:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near GUP School, Puliyarmala",
    addressLocality: "Kalpetta North",
    addressRegion: "Kerala",
    postalCode: "673121",
    addressCountry: "IN",
  },
  amenityFeature: ["Free Wi-Fi", "Kitchen", "Campfire", "Balcony with mountain view"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <QuickFacts />
        <Intro />
        <Spaces />
        <TheView />
        <Facilities />
        <Gallery />
        <Enquiry />
        <Location />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
