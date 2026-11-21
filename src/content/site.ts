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
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  maxGuests: 6,
  alsoListedOn: ["Booking.com", "Agoda", "Goibibo"],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#spaces", label: "The home" },
  { href: "#facilities", label: "Facilities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
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
