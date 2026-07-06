// ============================================================
// TRANCETTA PIZZA HOUSE — Data & Constants
// ============================================================

export const BRAND = {
  name: "Trancetta",
  fullName: "Trancetta Pizza House",
  tagline: "La Pizza Autrement.",
  slogan: "È l'ora della pizza",
  subTagline: "La qualità prima di tutto!",
  phone: "+216 28 336 008",
  secondaryPhone: "+216 25 565 760",
  whatsapp: "+21628336008",
  email: "trancetta.nabeul@gmail.com",
  address: "Avenue Mohamed V, Nabeul 8000",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.946761750275!2d10.730303!3d36.457896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302b217e5a0fdbb%3A0xbc26d03ca4d2e8b2!2sAv.%20Habib%20Bourguiba%2C%20Nabeul!5e0!3m2!1sfr!2stn!4v1688000000000",
  social: {
    facebook: "https://www.facebook.com/p/Trancetta-61555856261380/",
    instagram: "https://www.instagram.com/trancetta_/",
    tiktok: "",
  },
};

export const OPENING_HOURS = [
  { day: "Lundi", hours: "11h00 — 00h00", open: true },
  { day: "Mardi", hours: "11h00 — 00h00", open: true },
  { day: "Mercredi", hours: "11h00 — 00h00", open: true },
  { day: "Jeudi", hours: "11h00 — 00h00", open: true },
  { day: "Vendredi", hours: "11h00 — 00h00", open: true },
  { day: "Samedi", hours: "11h00 — 00h00", open: true },
  { day: "Dimanche", hours: "11h00 — 00h00", open: true },
];

export const STATS = [
  { value: 50000, suffix: "+", label: "Pizzas servies" },
  { value: 8, suffix: "+", label: "Recettes maison" },
  { value: 12000, suffix: "+", label: "Clients satisfaits" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Notre Concept", href: "#concept" },
  { label: "Nos Pizzas", href: "#pizzas" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

export const WHY_TRANCETTA = [
  {
    id: "tranche",
    icon: "slice",
    title: "Pizza en Tranche",
    description:
      "Choisissez exactement ce que vous voulez. Une tranche, deux tranches — à vous de décider selon votre appétit.",
    color: "#BC2325",
  },
  {
    id: "plateau",
    icon: "plateau",
    title: "Plateaux à Partager",
    description:
      "Idéal pour les groupes et les familles. Composez un plateau avec 4 saveurs différentes pour satisfaire tout le monde.",
    color: "#E58D25",
  },
  {
    id: "ingredients",
    icon: "leaf",
    title: "Ingrédients de Qualité",
    description:
      "Sélection rigoureuse des ingrédients. Tomates fraîches, fromages de qualité, charcuteries premium et herbes aromatiques.",
    color: "#168447",
  },
  {
    id: "cuisson",
    icon: "fire",
    title: "Cuisson Maîtrisée",
    description:
      "Notre four à haute température et notre maîtrise de la cuisson garantissent une pâte parfaitement dorée et croustillante.",
    color: "#825C33",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "/images/plat.png",
    alt: "Plateau complet Trancetta 4 saveurs",
    aspect: "landscape",
    span: "col-span-2",
  },
  {
    src: "/images/gallery-prep.png",
    alt: "Préparation de la pâte à pizza",
    aspect: "portrait",
    span: "row-span-2",
  },
  {
    src: "/images/pizza-margherita.png",
    alt: "Pizza Margherita en tranche",
    aspect: "square",
    span: "",
  },
  {
    src: "/images/gallery-platter.png",
    alt: "Plateau partagé entre amis",
    aspect: "landscape",
    span: "",
  },
  {
    src: "/images/pizza-pepperoni.png",
    alt: "Tranche Pepperoni",
    aspect: "square",
    span: "",
  },
  {
    src: "/images/restaurant-ambiance.png",
    alt: "Ambiance restaurant Trancetta",
    aspect: "landscape",
    span: "col-span-2",
  },
];
