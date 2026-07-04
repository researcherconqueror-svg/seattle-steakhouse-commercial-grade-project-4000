import type { MenuItem, WineItem } from "./types";

export const steakItems: MenuItem[] = [
  { name: "45-Day Dry-Aged Ribeye", desc: "Bone-in, center-cut. Roasted bone marrow butter, Maldon salt.", price: "78", tag: "Signature" },
  { name: "Wagyu Zabuton", desc: "A5 Miyazaki Prefecture. Binchotan-seared, fleur de sel.", price: "145", tag: "Rare" },
  { name: "Filet Mignon", desc: "8 oz. center-cut tenderloin, house-cured pancetta wrap, truffle demi-glace.", price: "68" },
  { name: "Bone-In New York Strip", desc: "16 oz. Prime grade, open flame, herb chimichurri.", price: "72" },
  { name: "Tomahawk for Two", desc: "32 oz. long-bone ribeye, carved tableside, herb compound butter.", price: "165", tag: "For Two" },
  { name: "Petite Filet", desc: "6 oz. center-cut tenderloin, classic b\u00e9rnaise.", price: "56" },
  { name: "Bone-In Filet", desc: "10 oz. bone-in tenderloin, red wine demi-glace, roasted shallots.", price: "74" },
  { name: "Dry-Aged Porterhouse", desc: "24 oz. 35-day aged, for the table. Lemon, olive oil, sea salt.", price: "155", tag: "For Two" },
];

export const seafoodItems: MenuItem[] = [
  { name: "Alaskan King Crab Legs", desc: "1 lb. steamed, drawn butter, charred lemon.", price: "72" },
  { name: "Pan-Seared Halibut", desc: "Pacific Northwest halibut, beurre blanc, asparagus, fingerling potatoes.", price: "52" },
  { name: "Oysters on the Half Shell", desc: "Dozen, rotating selection, mignonette, cocktail sauce, horseradish.", price: "36" },
  { name: "Ahi Tuna Tartare", desc: "Sushi-grade ahi, avocado, crispy wonton, sesame-ginger vinaigrette.", price: "26" },
  { name: "Lobster Tail", desc: "8 oz. cold-water lobster, grilled, drawn butter, lemon.", price: "62" },
];

export const sides: MenuItem[] = [
  { name: "Truffle Mac & Cheese", desc: "Three-cheese blend, black truffle, panko crust.", price: "18" },
  { name: "Creamed Spinach", desc: "Slow-cooked, nutmeg, parmesan.", price: "14" },
  { name: "Roasted Bone Marrow", desc: "Split bones, herb gremolata, grilled sourdough.", price: "24", tag: "Shareable" },
  { name: "Wild Mushroom Medley", desc: "Seasonal forest mushrooms, shallot, thyme, truffle oil.", price: "16" },
  { name: "Potato Gratin", desc: "Yukon gold, gruy\u00e8re, garlic, fresh chives.", price: "14" },
  { name: "Grilled Asparagus", desc: "Lemon zest, shaved parmesan.", price: "14" },
  { name: "Oak-Grilled Corn", desc: "Chipotle butter, cotija cheese, lime.", price: "12" },
  { name: "Nexus Prime Fries", desc: "Hand-cut, herb salt, truffle aioli.", price: "12" },
];

export const desserts: MenuItem[] = [
  { name: "Dark Chocolate Fondant", desc: "Valrhona 72%, vanilla bean gelato, gold leaf.", price: "18" },
  { name: "Cr\u00e8me Br\u00fbl\u00e9e", desc: "Classic vanilla, caramelized sugar, fresh berries.", price: "14" },
  { name: "Affogato", desc: "Double espresso, house-made vanilla gelato, amaretti cookie.", price: "12" },
  { name: "Cheese Selection", desc: "Three artisan cheeses, honeycomb, fig compote, crostini.", price: "22" },
];

export const wineHighlights: WineItem[] = [
  { name: "Opus One 2019", type: "Napa Valley Red Blend", glass: "75", bottle: "650" },
  { name: "Caymus Special Selection 2020", type: "Napa Cabernet Sauvignon", glass: "42", bottle: "340" },
  { name: "Silver Oak 2018", type: "Alexander Valley Cabernet", glass: "36", bottle: "280" },
  { name: "Cloudy Bay 2022", type: "Marlborough Sauvignon Blanc", glass: "18", bottle: "85" },
  { name: "Veuve Clicquot Brut", type: "Champagne, Reims", glass: "26", bottle: "185" },
];

interface HighlightMenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

export const menuHighlights: HighlightMenuItem[] = [
  {
    name: "45-Day Dry-Aged Ribeye",
    description: "Bone-in, center-cut. Rich, concentrated beef flavor with extraordinary marbling. Served with roasted bone marrow butter.",
    price: "78",
    tag: "Signature",
  },
  {
    name: "Wagyu Zabuton",
    description: "A5 Japanese wagyu from Miyazaki Prefecture. Seared over binchotan charcoal, finished with fleur de sel.",
    price: "145",
    tag: "Rare",
  },
  {
    name: "Filet Mignon",
    description: "8 oz. center-cut tenderloin, wrapped in house-cured pancetta. Impossibly tender, served with truffle demi-glace.",
    price: "68",
  },
  {
    name: "Bone-In New York Strip",
    description: "16 oz. Prime grade, kissed by open flame. Bold, beefy, uncompromising. The purist's choice.",
    price: "72",
  },
  {
    name: "Tomahawk for Two",
    description: "32 oz. long-bone ribeye, dramatically presented. Carved tableside with herb compound butter and finishing salt.",
    price: "165",
    tag: "For Two",
  },
];
