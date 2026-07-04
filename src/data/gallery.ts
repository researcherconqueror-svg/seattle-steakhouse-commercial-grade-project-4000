import type { GalleryImage } from "./types";

export const galleryImages: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=85", alt: "Prime ribeye on the cutting board", category: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1558030006-450675393462?w=1000&q=85", alt: "Wine cellar with 2,000+ bottles", category: "Cellar" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1000&q=85", alt: "Main dining room atmosphere", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85", alt: "Plated wagyu with microgreens", category: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=85", alt: "Evening dining atmosphere", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85", alt: "Chef preparing a dish", category: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=85", alt: "Craft cocktail program", category: "Bar" },
  { src: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=1000&q=85", alt: "Bar seating area", category: "Bar" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=85", alt: "The Hearth Room private dining", category: "Private" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=85", alt: "The Cellar event space", category: "Private" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=85", alt: "Dessert presentation", category: "Kitchen" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000&q=85", alt: "The Terrace waterfront views", category: "Private" },
];

export const categories = ["All", "Kitchen", "Interior", "Bar", "Cellar", "Private"] as const;

/* Bento layout spans for each item (12-col grid) */
export const bentoSpans = [
  "col-span-12 md:col-span-7 row-span-2",
  "col-span-12 md:col-span-5",
  "col-span-6 md:col-span-5",
  "col-span-6 md:col-span-7 row-span-2",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-7",
  "col-span-6 md:col-span-4",
  "col-span-6 md:col-span-8 row-span-2",
  "col-span-12 md:col-span-6",
  "col-span-12 md:col-span-6",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-7 row-span-2",
];
