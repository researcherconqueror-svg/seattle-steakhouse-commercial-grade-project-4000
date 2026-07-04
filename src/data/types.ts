export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

export interface WineItem {
  name: string;
  type: string;
  glass: string;
  bottle: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface PrivateSpace {
  name: string;
  capacity: string;
  description: string;
  image: string;
  features: string[];
  ideal: string;
}

export interface TimelineEntry {
  year: string;
  event: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  href: string;
}

export interface HoursEntry {
  day: string;
  time: string;
}
