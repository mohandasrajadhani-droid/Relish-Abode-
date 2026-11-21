// Single source of truth for business facts shown on the website.
// Only owner-confirmed information belongs here. Do not add prices,
// guest limits or policies until the owner confirms them.

export const site = {
  name: "Relish Abode",
  tagline: "Family homestay in Wayanad",
  phoneDisplay: "+91 81398 29694",
  phoneE164: "+918139829694",
  whatsappNumber: "918139829694",
  address: {
    lines: ["Near GUP School, Puliyarmala", "P.O. Kalpetta North", "Wayanad, Kerala 673121"],
    mapsQuery: "Relish Abode, Near GUP School, Puliyarmala, Kalpetta North, Wayanad, Kerala 673121",
  },
  // Exact pin supplied by the owner (QR code, 21 Nov 2026).
  geo: { lat: 11.6403565, lng: 76.0829203 },
  mapsPinLink: "https://maps.app.goo.gl/6BTL6YMrA6wJeNAg7",
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  maxGuests: 6,
  alsoListedOn: ["Booking.com", "Agoda", "Goibibo"],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsLink = site.mapsPinLink;

/** Google Maps directions from the homestay to a place (guest's phone shows the exact road route). */
export const directionsLink = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${site.geo.lat},${site.geo.lng}&destination=${encodeURIComponent(
    destination,
  )}&travelmode=driving`;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#spaces", label: "The home" },
  { href: "#facilities", label: "Facilities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#explore", label: "Explore Wayanad" },
  { href: "#plans", label: "Tour plans" },
  { href: "#enquire", label: "Enquire" },
] as const;

export type Photo = { src: string; thumb: string; alt: string; w: number; h: number };

const photo = (name: string, alt: string, w: number, h: number): Photo => ({
  src: `/images/${name}.webp`,
  thumb: `/images/${name}-sm.webp`,
  alt,
  w,
  h,
});

export const photos = {
  view: photo("balcony-mountain-view", "Wayanad hills seen from the Relish Abode balcony, with a tall coconut palm in front", 1086, 1448),
  exterior: photo("exterior-dusk", "Relish Abode at dusk, a white two-storey house with a lit upper balcony", 1204, 1599),
  gate: photo("gate-entrance", "Front gate and stone path of Relish Abode in the evening", 1204, 1599),
  living: photo("living-room-library", "Living room with a green sofa, built-in bookshelf and dining table", 1600, 1204),
  livingDining: photo("living-dining", "Living and dining area with a long sofa and six-chair dining table", 1600, 1204),
  bedroom1: photo("bedroom-1", "Bedroom with a double bed, wardrobe and window blinds", 1568, 1180),
  bedroom2: photo("bedroom-2", "Second bedroom with a double bed, mirrored wardrobe and side table", 1204, 1599),
  kitchen: photo("kitchen", "Guest kitchen with gas stove, induction cooktop, water purifier and utensil rack", 1600, 1204),
  hall: photo("recreation-hall", "Upstairs recreation hall with TV, sofa and a games table", 1204, 1599),
  swing: photo("balcony-swing", "Balcony with a cane swing chair and white balustrade", 1204, 1599),
} as const;

export const spaces = [
  {
    title: "Two bedrooms",
    body: "Two quiet bedrooms with double beds, wardrobes and fresh linen, both on the same floor as the living area.",
    photos: [photos.bedroom1, photos.bedroom2],
  },
  {
    title: "Living and dining",
    body: "A family room with a long sofa, a wall of books to borrow and a dining table where everyone fits.",
    photos: [photos.living, photos.livingDining],
  },
  {
    title: "Your own kitchen",
    body: "Cook for yourselves with a gas stove, induction cooktop, water purifier and everyday cookware. Prefer not to cook? Restaurant food can be delivered.",
    photos: [photos.kitchen],
  },
  {
    title: "Upstairs recreation hall",
    body: "A relaxed space upstairs with a TV, a games table and board games for evenings in.",
    photos: [photos.hall],
  },
  {
    title: "Balcony with a swing",
    body: "Sit in the cane swing and watch the hills. Some mornings the mist rolls in and hides the mountains completely.",
    photos: [photos.swing, photos.view],
  },
] as const;

export const facilities = [
  { icon: "home", label: "Whole house, private to your group" },
  { icon: "wifi", label: "Free Wi-Fi" },
  { icon: "mountain", label: "Balcony with hill view" },
  { icon: "armchair", label: "Balcony swing" },
  { icon: "cooking", label: "Self-cooking kitchen" },
  { icon: "utensils", label: "Restaurant food delivery" },
  { icon: "flame", label: "Campfire" },
  { icon: "books", label: "Books to read" },
  { icon: "tv", label: "Recreation hall with TV and games" },
  { icon: "sofa", label: "Sit-out and dining area" },
] as const;

export const gallery: Photo[] = [
  photos.view,
  photos.exterior,
  photos.livingDining,
  photos.bedroom1,
  photos.swing,
  photos.living,
  photos.bedroom2,
  photos.hall,
  photos.kitchen,
];

/* How to reach us. Approximate road distances from Relish Abode (owner-requested hubs). */
export const gettingHere = [
  {
    kind: "train",
    label: "Nearest railway station",
    name: "Kozhikode (Calicut) Railway Station",
    km: 76,
    note: "Via Kalpetta and the Thamarassery ghat road",
    query: "Kozhikode Railway Station",
  },
  {
    kind: "plane",
    label: "Nearest airport",
    name: "Kannur International Airport (CNN)",
    km: 100,
    note: "Via Mananthavady and the Peravoor road",
    query: "Kannur International Airport",
  },
] as const;

/* Places to visit around Wayanad.
   km = approximate road distance from Relish Abode, rounded. Estimated from published distances
   from Kalpetta town, adjusted for our location ~4 km north of town. Owner to verify on Google Maps.
   lat/lng = approximate map pin positions (overview map only; directions use the place name). */
export type Spot = {
  name: string;
  kind: "Viewpoint" | "Waterfall" | "Lake" | "Trek" | "Heritage" | "Wildlife" | "Dam" | "Island" | "Temple";
  km: number;
  note: string;
  lat: number;
  lng: number;
  query: string;
};

const spotList: Spot[] = [
  { name: "Banasura Sagar Dam", kind: "Dam", km: 20, note: "India's largest earth dam, boating and island views", lat: 11.6713, lng: 75.9566, query: "Banasura Sagar Dam, Wayanad" },
  { name: "Pookode Lake", kind: "Lake", km: 17, note: "Forest-ringed freshwater lake with pedal boating", lat: 11.5426, lng: 76.0272, query: "Pookode Lake, Wayanad" },
  { name: "Lakkidi Viewpoint", kind: "Viewpoint", km: 20, note: "Gateway of Wayanad, hairpin-bend valley views", lat: 11.5186, lng: 76.0205, query: "Lakkidi View Point, Wayanad" },
  { name: "Chembra Peak", kind: "Trek", km: 21, note: "Trek to the heart-shaped lake (forest permit needed)", lat: 11.5144, lng: 76.0877, query: "Chembra Peak, Wayanad" },
  { name: "Meenmutty Waterfalls", kind: "Waterfall", km: 22, note: "Three-tier falls near Banasura, short forest walk", lat: 11.7011, lng: 75.9576, query: "Meenmutty Waterfalls, Banasura, Wayanad" },
  { name: "Kanthanpara Waterfalls", kind: "Waterfall", km: 23, note: "Small, easy-to-reach falls near Meppadi", lat: 11.5494, lng: 76.1514, query: "Kanthanpara Waterfalls, Wayanad" },
  { name: "Wayanad Heritage Museum", kind: "Heritage", km: 26, note: "Tribal history and artefacts at Ambalavayal", lat: 11.6176, lng: 76.2101, query: "Wayanad Heritage Museum, Ambalavayal" },
  { name: "Soochipara Waterfalls", kind: "Waterfall", km: 28, note: "Tall falls in the forest, a walk down to the pool", lat: 11.5089, lng: 76.1636, query: "Soochipara Waterfalls, Wayanad" },
  { name: "Jain Temple, Sulthan Bathery", kind: "Temple", km: 28, note: "13th-century granite temple in the town centre", lat: 11.6658, lng: 76.26, query: "Jain Temple, Sulthan Bathery" },
  { name: "Edakkal Caves", kind: "Heritage", km: 30, note: "Stone Age carvings, a steep climb up Ambukuthi Hill", lat: 11.6247, lng: 76.2355, query: "Edakkal Caves, Wayanad" },
  { name: "Pazhassi Tomb, Mananthavady", kind: "Heritage", km: 30, note: "Memorial and museum of Pazhassi Raja", lat: 11.8037, lng: 76.0021, query: "Pazhassi Tomb, Mananthavady" },
  { name: "Kuruva Island", kind: "Island", km: 34, note: "River islands on the Kabini, reached by bamboo raft", lat: 11.8217, lng: 76.0866, query: "Kuruva Island, Wayanad" },
  { name: "Muthanga Wildlife Sanctuary", kind: "Wildlife", km: 43, note: "Jeep safari for elephants, deer and birds", lat: 11.666, lng: 76.374, query: "Muthanga Wildlife Sanctuary" },
  { name: "Thirunelli Temple", kind: "Temple", km: 58, note: "Ancient Vishnu temple in the Brahmagiri hills", lat: 11.9124, lng: 75.9963, query: "Thirunelli Temple, Wayanad" },
];

export const spots: Spot[] = [...spotList].sort((a, b) => a.km - b.km);

/* ---------- Ready-made tour plans ----------
   Built to stay on main roads and avoid long detours, permit-only treks and remote spots.
   legKm = approximate road distance from the previous stop (first stop: from Relish Abode).
   Owner to verify timings and distances before publishing widely. */
export type TourStop = { spot: string; time: string; legKm: number; tip: string };
export type TourDay = { title: string; summary: string; stops: TourStop[]; returnKm: number };
export type TourPlan = { id: string; label: string; days: TourDay[] };

export const tourPlans: TourPlan[] = [
  {
    id: "one-day",
    label: "1-day plan",
    days: [
      {
        title: "Caves, history, lake and sunset",
        summary: "The best of Wayanad in one day, all on main roads.",
        stops: [
          { spot: "Edakkal Caves", time: "8:15 AM", legKm: 30, tip: "Leave by 7:30 and be at the ticket counter early. Closed on Mondays. The climb takes about an hour." },
          { spot: "Wayanad Heritage Museum", time: "11:15 AM", legKm: 5, tip: "Short stop, about 45 minutes, just down the hill at Ambalavayal." },
          { spot: "Pookode Lake", time: "2:00 PM", legKm: 35, tip: "Have lunch in Kalpetta on the way. Boating and a short walk round the lake." },
          { spot: "Lakkidi Viewpoint", time: "4:30 PM", legKm: 4, tip: "Valley and ghat-road views. Watch the sunset, then head back before dark." },
        ],
        returnKm: 20,
      },
    ],
  },
  {
    id: "two-day",
    label: "2-day plan",
    days: [
      {
        title: "Day 1: East Wayanad",
        summary: "Ancient caves, a heritage museum, a 13th-century temple and a jungle safari.",
        stops: [
          { spot: "Edakkal Caves", time: "8:15 AM", legKm: 30, tip: "Leave by 7:30. Closed on Mondays, so swap the two days if needed." },
          { spot: "Wayanad Heritage Museum", time: "11:15 AM", legKm: 5, tip: "About 45 minutes." },
          { spot: "Jain Temple, Sulthan Bathery", time: "12:30 PM", legKm: 11, tip: "Quick visit, then lunch in Sulthan Bathery town." },
          { spot: "Muthanga Wildlife Sanctuary", time: "2:30 PM", legKm: 14, tip: "Jeep safari seats are limited. Reach early and check the afternoon slot timing locally." },
        ],
        returnKm: 43,
      },
      {
        title: "Day 2: West and the ghat views",
        summary: "A huge dam among the hills, a forest lake and the Lakkidi viewpoint.",
        stops: [
          { spot: "Banasura Sagar Dam", time: "9:00 AM", legKm: 20, tip: "Go early to beat the queues. Speedboat rides and views of the islands." },
          { spot: "Pookode Lake", time: "1:30 PM", legKm: 27, tip: "Lunch on the way at Vythiri. Pedal boats and the lakeside walk." },
          { spot: "Lakkidi Viewpoint", time: "4:00 PM", legKm: 4, tip: "End the trip with the valley views, back home before dark." },
        ],
        returnKm: 20,
      },
    ],
  },
];

/** Google Maps route from the homestay through every stop and back. */
export const routeLink = (day: TourDay) => {
  const stopQueries = day.stops.map((t) => spots.find((s) => s.name === t.spot)?.query ?? t.spot);
  const home = `${site.geo.lat},${site.geo.lng}`;
  return `https://www.google.com/maps/dir/?api=1&origin=${home}&destination=${home}&waypoints=${encodeURIComponent(
    stopQueries.join("|"),
  )}&travelmode=driving`;
};

export const dayTotalKm = (day: TourDay) => day.stops.reduce((n, s) => n + s.legKm, 0) + day.returnKm;
