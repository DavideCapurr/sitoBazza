import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const ROUTES = ["", "/hotel", "/ristorante", "/storia", "/galleria", "/contatti"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotelconcadoro.com";

  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${route}`]),
        ),
      },
    })),
  );
}
