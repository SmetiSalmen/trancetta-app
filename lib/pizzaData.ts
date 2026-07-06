// ============================================================
// TRANCETTA PIZZA HOUSE
// Pizza Data
// ============================================================


/* ============================================================
   TYPES
============================================================ */

export type PizzaBadge =
  | "best-seller"
  | "spicy"
  | "popular"
  | "new"
  | "gourmet"
  | "végé";


export type PizzaCategory =
  | "classique"
  | "premium"
  | "vegetarienne"
  | "signature";


/* ============================================================
   PIZZA INTERFACE
============================================================ */

export interface Pizza {
  id: string;

  name: string;

  description: string;

  ingredients: string[];

  image: string;


  /* ========================================================
     PRICES
  ======================================================== */

  // Prix d'une tranche
  // null = non disponible à la tranche

  priceSlice: number | null;


  // Prix 1/4 plateau

  priceQuarter: number;


  // Prix 1/2 plateau

  priceHalf: number;


  // Prix plateau complet

  priceFull: number;


  /* ========================================================
     META
  ======================================================== */

  badges: PizzaBadge[];

  category: PizzaCategory;

  spiceLevel: 0 | 1 | 2 | 3;

  isAvailable: boolean;
}


/* ============================================================
   DRINK INTERFACE
============================================================ */

export interface Drink {
  id: string;

  name: string;

  price: number;

  image?: string;
}


/* ============================================================
   DRINKS
============================================================ */

export const DRINKS: Drink[] = [
  {
    id: "soda",
    name: "Soda",
    price: 2.5,
  },

  {
    id: "eau-50cl",
    name: "Eau 50 CL",
    price: 1.5,
  },

  {
    id: "eau-1l",
    name: "Eau 1 L",
    price: 2.5,
  },

  {
    id: "citronnade",
    name: "Citronnade",
    price: 4,
  },

  {
    id: "jus",
    name: "Jus",
    price: 5,
  },
];


/* ============================================================
   PIZZAS
============================================================ */

export const PIZZAS: Pizza[] = [

  /* ==========================================================
     MARGUERITA
  ========================================================== */

  {
    id: "margherita",

    name: "Marguerita",

    description:
      "La classique italienne, simple, généreuse et savoureuse.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Origan",
    ],

    image:
      "/images/pizza-margherita.png",

    priceSlice: 8,

    priceQuarter: 15,

    priceHalf: 30,

    priceFull: 60,

    badges: [
      "best-seller",
    ],

    category:
      "classique",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     NEPTUNE
  ========================================================== */

  {
    id: "neptune",

    name: "Neptune",

    description:
      "Une recette généreuse au thon inspirée des saveurs méditerranéennes.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Thon",
      "Câpres",
      "Olives",
    ],

    image:
      "/images/pizza-neptune.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "popular",
    ],

    category:
      "classique",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     SICILIANA
  ========================================================== */

  {
    id: "siciliana",

    name: "Siciliana",

    description:
      "Une pizza au caractère méditerranéen et aux saveurs intenses.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Anchois",
      "Câpres",
      "Ail",
      "Origan",
    ],

    image:
      "/images/pizza-siciliana.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [],

    category:
      "classique",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     POULET CHAMPIGNONS
  ========================================================== */

  {
    id: "poulet-champignons",

    name: "Poulet Champignons",

    description:
      "Une combinaison crémeuse de poulet et de champignons.",

    ingredients: [
      "Sauce blanche",
      "Mozzarella",
      "Poulet",
      "Champignons",
      "Origan",
    ],

    image:
      "/images/pizza-poulet-champignons.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "popular",
    ],

    category:
      "signature",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     PEPPERONI
  ========================================================== */

  {
    id: "pepperoni",

    name: "Pepperoni",

    description:
      "Une pizza généreuse au pepperoni avec une touche légèrement relevée.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Pepperoni",
      "Origan",
    ],

    image:
      "/images/pizza-pepperoni.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "popular",
      "spicy",
    ],

    category:
      "classique",

    spiceLevel: 1,

    isAvailable: true,
  },


  /* ==========================================================
     4 FROMAGES
  ========================================================== */

  {
    id: "4-fromages",

    name: "4 Fromages",

    description:
      "Une recette fondante pour les amateurs de fromage.",

    ingredients: [
      "Sauce blanche",
      "Mozzarella",
      "Gorgonzola",
      "Cheddar",
      "Emmental",
    ],

    image:
      "/images/pizza-4fromages.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "gourmet",
    ],

    category:
      "classique",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     JAMBON CHAMPIGNONS
  ========================================================== */

  {
    id: "jambon-champignons",

    name: "Jambon Champignons",

    description:
      "Une association classique de jambon et de champignons.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Jambon",
      "Champignons",
      "Origan",
    ],

    image:
      "/images/pizza-jambon-champignons.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [],

    category:
      "classique",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     VÉGÉTARIENNE
  ========================================================== */

  {
    id: "vegetarienne",

    name: "Végétarienne",

    description:
      "Une pizza colorée et généreuse en légumes.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Poivrons",
      "Olives",
      "Oignons",
      "Champignons",
    ],

    image:
      "/images/pizza-vegetarienne.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "végé",
    ],

    category:
      "vegetarienne",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     CHAWARMA
  ========================================================== */

  {
    id: "chawarma",

    name: "Chawarma",

    description:
      "Une pizza gourmande inspirée des saveurs du chawarma.",

    ingredients: [
      "Sauce blanche",
      "Mozzarella",
      "Poulet chawarma",
      "Oignons",
      "Sauce ail",
    ],

    image:
      "/images/pizza-chawarma.png",

    priceSlice: 10,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "popular",
    ],

    category:
      "signature",

    spiceLevel: 1,

    isAvailable: true,
  },


  /* ==========================================================
     VIANDE HACHÉE
  ========================================================== */

  {
    id: "viande-hachee",

    name: "Viande Hachée",

    description:
      "Une recette généreuse à la viande hachée assaisonnée.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Viande hachée",
      "Poivrons",
      "Oignons",
      "Origan",
    ],

    image:
      "/images/pizza-viande-hachee.png",

    priceSlice: 14,

    priceQuarter: 25,

    priceHalf: 45,

    priceFull: 85,

    badges: [
      "popular",
    ],

    category:
      "signature",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     TRANCETTA
  ========================================================== */

  {
    id: "trancetta-pizza",

    name: "Trancetta",

    description:
      "La pizza signature de la maison Trancetta.",

    ingredients: [
      "Sauce tomate",
      "Mozzarella",
      "Jambon",
      "Champignons",
      "Olives",
      "Origan",
    ],

    image:
      "/images/pizza-trancetta.png",

    priceSlice: 12,

    priceQuarter: 20,

    priceHalf: 40,

    priceFull: 80,

    badges: [
      "best-seller",
      "gourmet",
    ],

    category:
      "signature",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     SAUMON FUMÉ
  ========================================================== */

  {
    id: "saumon-fume",

    name: "Saumon Fumé",

    description:
      "Une recette premium fraîche et généreuse.",

    ingredients: [
      "Sauce blanche",
      "Mozzarella",
      "Saumon fumé",
      "Roquette",
      "Crème fraîche",
      "Origan",
    ],

    image:
      "/images/pizza-saumon-fume.png",

    priceSlice: null,

    priceQuarter: 25,

    priceHalf: 45,

    priceFull: 85,

    badges: [
      "gourmet",
    ],

    category:
      "premium",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     BRESAOLA
  ========================================================== */

  {
    id: "bresaola",

    name: "Bresaola",

    description:
      "Une pizza premium à la bresaola et aux saveurs italiennes.",

    ingredients: [
      "Sauce blanche",
      "Mozzarella",
      "Bresaola",
      "Roquette",
      "Parmesan",
    ],

    image:
      "/images/pizza-bresaola.png",

    priceSlice: null,

    priceQuarter: 25,

    priceHalf: 45,

    priceFull: 85,

    badges: [
      "gourmet",
    ],

    category:
      "premium",

    spiceLevel: 0,

    isAvailable: true,
  },


  /* ==========================================================
     BURRATA
  ========================================================== */

  {
    id: "burrata",

    name: "Burrata",

    description:
      "Une pizza fraîche et crémeuse autour de la burrata.",

    ingredients: [
      "Sauce tomate",
      "Tomates cerises",
      "Burrata",
      "Roquette",
      "Pesto",
    ],

    image:
      "/images/pizza-burrata.png",

    priceSlice: null,

    priceQuarter: 18,

    priceHalf: 35,

    priceFull: 65,

    badges: [
      "gourmet",
      "new",
    ],

    category:
      "premium",

    spiceLevel: 0,

    isAvailable: true,
  },
];


/* ============================================================
   AVAILABLE PIZZAS
============================================================ */

export const AVAILABLE_PIZZAS =
  PIZZAS.filter(
    (pizza) =>
      pizza.isAvailable
  );


/* ============================================================
   BEST SELLERS
============================================================ */

export const BEST_SELLERS =
  PIZZAS.filter(
    (pizza) =>
      pizza.badges.includes(
        "best-seller"
      ) ||
      pizza.badges.includes(
        "popular"
      )
  ).slice(0, 6);


/* ============================================================
   CLASSIC PIZZAS
============================================================ */

export const CLASSIC_PIZZAS =
  PIZZAS.filter(
    (pizza) =>
      pizza.category ===
      "classique"
  );


/* ============================================================
   PREMIUM PIZZAS
============================================================ */

export const PREMIUM_PIZZAS =
  PIZZAS.filter(
    (pizza) =>
      pizza.category ===
      "premium"
  );


/* ============================================================
   SIGNATURE PIZZAS
============================================================ */

export const SIGNATURE_PIZZAS =
  PIZZAS.filter(
    (pizza) =>
      pizza.category ===
      "signature"
  );


/* ============================================================
   VEGETARIAN PIZZAS
============================================================ */

export const VEGETARIAN_PIZZAS =
  PIZZAS.filter(
    (pizza) =>
      pizza.category ===
      "vegetarienne"
  );


/* ============================================================
   BADGE CONFIGURATION
============================================================ */

export const BADGE_CONFIG: Record<
  PizzaBadge,
  {
    label: string;
    color: string;
  }
> = {

  "best-seller": {
    label: "Best Seller",
    color: "#BC2325",
  },

  popular: {
    label: "Populaire",
    color: "#E58D25",
  },

  spicy: {
    label: "Épicé",
    color: "#C23B30",
  },

  new: {
    label: "Nouveau",
    color: "#168447",
  },

  gourmet: {
    label: "Premium",
    color: "#825C33",
  },

  végé: {
    label: "Végé",
    color: "#168447",
  },
};


/* ============================================================
   PRICE FORMATTER
============================================================ */

export function formatPrice(
  price: number | null
): string {

  if (price === null) {
    return "—";
  }


  return `${price} DT`;
}


/* ============================================================
   GET PRICE BY FORMAT
============================================================ */

export type PizzaFormat =
  | "slice"
  | "quarter"
  | "half"
  | "full";


export function getPizzaPrice(
  pizza: Pizza,
  format: PizzaFormat
): number | null {

  switch (format) {

    case "slice":
      return pizza.priceSlice;

    case "quarter":
      return pizza.priceQuarter;

    case "half":
      return pizza.priceHalf;

    case "full":
      return pizza.priceFull;

    default:
      return null;
  }
}


/* ============================================================
   GET PIZZA BY ID
============================================================ */

export function getPizzaById(
  id: string
): Pizza | undefined {

  return PIZZAS.find(
    (pizza) =>
      pizza.id === id
  );
}