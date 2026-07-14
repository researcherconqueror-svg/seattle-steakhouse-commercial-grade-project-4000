import type { NavItem } from "./types";

export const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/private-dining", label: "Private Dining" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = {
  dining: [
    { href: "/menu", label: "Dinner Menu" },
    { href: "/menu#wine", label: "Wine & Spirits" },
    { href: "/private-dining", label: "Private Dining" },
    { href: "/reservations", label: "Reservations" },
  ] satisfies NavItem[],
  discover: [
    { href: "/about", label: "Our Story" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Visit Us" },
    { href: "/about#careers", label: "Careers" },
  ] satisfies NavItem[],
};

export const footerHours = {
  dinner: "Mon\u2013Thu: 5:00 PM \u2013 10:00 PM",
  weekend: "Fri\u2013Sat: 5:00 PM \u2013 11:00 PM",
  sunday: "4:00 PM \u2013 9:00 PM",
};

export const contactInfo = {
  phone: "(206) 555-1892",
  phoneHref: "tel:+12065551892",
  email: "reservations@crimsonredwood.com",
  emailHref: "mailto:reservations@crimsonredwood.com",
  address: "1201 Second Avenue, Seattle, WA 98101",
};
