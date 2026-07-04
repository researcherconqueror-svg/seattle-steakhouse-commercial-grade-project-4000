import type { PrivateSpace } from "./types";

export const spaces: PrivateSpace[] = [
  {
    name: "The Hearth Room",
    capacity: "12 \u2013 20 guests",
    description:
      "Our most intimate private space. A reclaimed oak table seats 20 beneath a hand-forged iron chandelier. The room features a dedicated sommelier and a customizable multi-course menu.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    features: ["Dedicated sommelier", "Custom menu", "A/V equipment", "Private entrance"],
    ideal: "Executive dinners, intimate celebrations",
  },
  {
    name: "The Cellar",
    capacity: "30 \u2013 60 guests",
    description:
      "Below our main dining room, The Cellar offers an atmospheric setting surrounded by 2,000 bottles. An ideal canvas for milestone celebrations and corporate events with a flair for the dramatic.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    features: ["Wine wall backdrop", "Stage / podium", "Full bar service", "Custom lighting"],
    ideal: "Milestone events, corporate galas, wine dinners",
  },
  {
    name: "The Terrace",
    capacity: "40 \u2013 100 guests",
    description:
      "Our expansive covered terrace overlooks Elliott Bay. Floor-to-ceiling glass panels provide year-round comfort while showcasing Seattle\u2019s iconic waterfront skyline. A show-stopping venue for large-scale celebrations.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    features: ["Waterfront views", "Climate-controlled", "Full AV suite", "Custom floor plan"],
    ideal: "Wedding receptions, product launches, holiday parties",
  },
];

export const inclusions = [
  "Custom multi-course menu curated by Executive Chef Marcus Hale",
  "Dedicated event coordinator from initial planning through execution",
  "Premium bar packages with sommelier-selected wine pairings",
  "Curated floral arrangements and tablescaping",
  "Professional A/V equipment and technical support",
  "Complimentary valet parking for all guests",
];

export const privateDiningHero = {
  backgroundImage: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1920&q=80",
  eyebrow: "Private Events",
  heading: "Private Dining",
  body: "Three distinct spaces, each crafted for occasions that deserve more than ordinary.",
};
