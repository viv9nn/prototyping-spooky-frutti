export type ClothingCategory = "top" | "bottom" | "shoes" | "accessory";

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  isClean: boolean; // true = clean & dressy, false = stained / old / ripped
  tagline: string;
  flaw?: string;
  color: string;
  accentColor: string;
  icon: string; // Emoji fallback / quick badge
}

export const CLOTHING_ITEMS: ClothingItem[] = [
  // TOPS - CLEAN & DRESSY
  {
    id: "top-dress-shirt",
    name: "Crisp Dress Shirt",
    category: "top",
    isClean: true,
    tagline: "Starch-pressed cream collar with subtle cufflinks",
    color: "#f5f0db",
    accentColor: "#d9d0b0",
    icon: "👔",
  },
  {
    id: "top-navy-blazer",
    name: "Midnight Navy Blazer",
    category: "top",
    isClean: true,
    tagline: "Tailored wool blazer with polished brass buttons",
    color: "#1f275e",
    accentColor: "#ffe680",
    icon: "🧥",
  },
  {
    id: "top-tux-vest",
    name: "Dapper Velvet Vest",
    category: "top",
    isClean: true,
    tagline: "Deep crimson satin-lined formal vest",
    color: "#801235",
    accentColor: "#ff8fc0",
    icon: "🦺",
  },

  // TOPS - BAD (STAINED / OLD / RIPPED)
  {
    id: "top-mustard-tank",
    name: "Mustard-Stained Tank",
    category: "top",
    isClean: false,
    tagline: "Smells faintly of lukewarm carnival hot dogs",
    flaw: "Stained with ancient yellow mustard!",
    color: "#998a44",
    accentColor: "#e6c310",
    icon: "🎽",
  },
  {
    id: "top-moth-sweater",
    name: "Moth-Eaten Sweater",
    category: "top",
    isClean: false,
    tagline: "More ventilation holes than actual fabric",
    flaw: "Full of moth holes and unraveling yarn!",
    color: "#6b5952",
    accentColor: "#2b221e",
    icon: "🧶",
  },
  {
    id: "top-greasy-tee",
    name: "Greasy Pit-Stained Tee",
    category: "top",
    isClean: false,
    tagline: "Was white back in the summer of 1998",
    flaw: "Dark yellow sweat and grease stains!",
    color: "#8b8878",
    accentColor: "#47453d",
    icon: "👕",
  },

  // BOTTOMS - CLEAN & DRESSY
  {
    id: "bottom-khaki-slacks",
    name: "Pressed Khaki Slacks",
    category: "bottom",
    isClean: true,
    tagline: "Razor-sharp front creases and rich leather belt",
    color: "#cfb97c",
    accentColor: "#7d5124",
    icon: "👖",
  },
  {
    id: "bottom-midnight-trousers",
    name: "Charcoal Evening Trousers",
    category: "bottom",
    isClean: true,
    tagline: "Sleek formal cut that falls cleanly over shoes",
    color: "#25283b",
    accentColor: "#171824",
    icon: "👖",
  },
  {
    id: "bottom-tailored-chinos",
    name: "Tailored Royal Chinos",
    category: "bottom",
    isClean: true,
    tagline: "Crisp tapered fit with pristine belt loops",
    color: "#273b66",
    accentColor: "#fdfbff",
    icon: "👖",
  },

  // BOTTOMS - BAD (STAINED / OLD / RIPPED)
  {
    id: "bottom-muddy-jeans",
    name: "Mud-Caked Torn Denim",
    category: "bottom",
    isClean: false,
    tagline: "Looks like someone lost a fight with a swamp",
    flaw: "Ripped open at the knees and coated in wet mud!",
    color: "#465369",
    accentColor: "#4a3219",
    icon: "👖",
  },
  {
    id: "bottom-greasy-sweats",
    name: "Stained Baggy Sweats",
    category: "bottom",
    isClean: false,
    tagline: "Stretched elastic waistband with mystery coffee spots",
    flaw: "Baggy, saggy, and covered in dark spots!",
    color: "#696969",
    accentColor: "#2b1c11",
    icon: "🩳",
  },
  {
    id: "bottom-threadbare-boxers",
    name: "Threadbare Boxer Shorts",
    category: "bottom",
    isClean: false,
    tagline: "Definitely not appropriate for a romantic dinner",
    flaw: "Completely faded with rip tears down the seam!",
    color: "#785055",
    accentColor: "#33161b",
    icon: "🩲",
  },

  // SHOES - CLEAN & DRESSY
  {
    id: "shoes-white-loafers",
    name: "Pristine Date Kicks",
    category: "shoes",
    isClean: true,
    tagline: "Spotless white date shoes without a speck of dust",
    color: "#fdfbff",
    accentColor: "#cfd6df",
    icon: "👟",
  },
  {
    id: "shoes-oxford-leather",
    name: "Polished Oxford Shoes",
    category: "shoes",
    isClean: true,
    tagline: "High-gloss buffed leather that reflects candlelight",
    color: "#422013",
    accentColor: "#ffe680",
    icon: "👞",
  },
  {
    id: "shoes-velvet-loafers",
    name: "Wine Velvet Loafers",
    category: "shoes",
    isClean: true,
    tagline: "Plush velvet with subtle golden embroidery",
    color: "#6e152d",
    accentColor: "#ffe680",
    icon: "🥿",
  },

  // SHOES - BAD (STAINED / OLD / RIPPED)
  {
    id: "shoes-toe-sneakers",
    name: "Toe-Hole Stinky Sneaker",
    category: "shoes",
    isClean: false,
    tagline: "The front sole flaps when walking. Fumes included",
    flaw: "Ripped open toe cap emitting a faint green odor!",
    color: "#545e48",
    accentColor: "#78aa3b",
    icon: "👟",
  },
  {
    id: "shoes-crusty-workboots",
    name: "Crusty Mud Boots",
    category: "shoes",
    isClean: false,
    tagline: "Leaves dried dirt clods on every nice carpet",
    flaw: "Caked in dried barnyard mud and missing laces!",
    color: "#4a3219",
    accentColor: "#261709",
    icon: "🥾",
  },
  {
    id: "shoes-broken-flipflops",
    name: "Chewed Busted Flip-Flop",
    category: "shoes",
    isClean: false,
    tagline: "Held together by a rusty safety pin",
    flaw: "Chewed by a dog and snaps whenever you step!",
    color: "#286161",
    accentColor: "#a32626",
    icon: "🩴",
  },

  // ACCESSORIES - CLEAN & DRESSY
  {
    id: "acc-silk-bowtie",
    name: "Crimson Silk Bowtie",
    category: "accessory",
    isClean: true,
    tagline: "Tied to perfection with a crisp center knot",
    color: "#d91e48",
    accentColor: "#fdfbff",
    icon: "🎀",
  },
  {
    id: "acc-gold-watch",
    name: "Gleaming Pocket Watch",
    category: "accessory",
    isClean: true,
    tagline: "Ticking smoothly on an ornate gold chain",
    color: "#ffe680",
    accentColor: "#b3921b",
    icon: "⏱️",
  },
  {
    id: "acc-rose-boutonniere",
    name: "Fresh Red Boutonniere",
    category: "accessory",
    isClean: true,
    tagline: "A fragrant red blossom with glossy green leaves",
    color: "#e62249",
    accentColor: "#3da649",
    icon: "🌹",
  },

  // ACCESSORIES - BAD (STAINED / OLD / RIPPED)
  {
    id: "acc-fishbone-tie",
    name: "Stinky Fishbone Necklace",
    category: "accessory",
    isClean: false,
    tagline: "Found behind the arcade dumpster this morning",
    flaw: "A smelly rotting fish carcass on a string!",
    color: "#7e877e",
    accentColor: "#475c49",
    icon: "🐟",
  },
  {
    id: "acc-soup-bib",
    name: "Crusty Tomato Soup Bib",
    category: "accessory",
    isClean: false,
    tagline: "Splattered with hardened marinara sauce",
    flaw: "Hardened food crust and peeling plastic!",
    color: "#a3362a",
    accentColor: "#e67e22",
    icon: "👶",
  },
  {
    id: "acc-duct-glasses",
    name: "Cracked Duct-Tape Shades",
    category: "accessory",
    isClean: false,
    tagline: "One lens missing, bridge wrapped in dirty silver tape",
    flaw: "Crooked, scratched, and held by gummy duct tape!",
    color: "#333333",
    accentColor: "#9e9e9e",
    icon: "🕶️",
  },
];

export const CATEGORY_NAMES: Record<ClothingCategory, string> = {
  top: "Top",
  bottom: "Bottom",
  shoes: "Shoes",
  accessory: "Accessory",
};
