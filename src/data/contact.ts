import type { HoursEntry, ContactDetail } from "./types";

export const hours: HoursEntry[] = [
  { day: "Monday \u2013 Thursday", time: "5:00 PM \u2013 10:00 PM" },
  { day: "Friday \u2013 Saturday", time: "5:00 PM \u2013 11:00 PM" },
  { day: "Sunday", time: "4:00 PM \u2013 9:00 PM" },
];

export const details: ContactDetail[] = [
  {
    label: "Address",
    value: "1201 Second Avenue\nSeattle, WA 98101",
    href: "https://maps.google.com/?q=1201+Second+Avenue+Seattle+WA+98101",
  },
  {
    label: "Phone",
    value: "(206) 555-1892",
    href: "tel:+12065551892",
  },
  {
    label: "Email",
    value: "reservations@emberandoak.com",
    href: "mailto:reservations@emberandoak.com",
  },
  {
    label: "Private Events",
    value: "events@emberandoak.com",
    href: "mailto:events@emberandoak.com",
  },
];

export const contactHero = {
  backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80",
  eyebrow: "Visit Us",
  heading: "Contact",
  body: "We look forward to welcoming you. For immediate assistance, please call or email us directly.",
};

export const directions = [
  "Conveniently located in downtown Seattle, steps from the Seattle Art Museum.",
  "Complimentary valet parking available for all dining guests.",
  "Public parking garage available at 2nd & Cherry, one block south.",
  "2 blocks from University Street light rail station.",
];
