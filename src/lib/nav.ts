export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/hotel", key: "hotel" },
  { href: "/ristorante", key: "restaurant" },
  { href: "/storia", key: "story" },
  { href: "/galleria", key: "gallery" },
  { href: "/contatti", key: "contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
