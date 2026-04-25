import type { Locale } from "@/i18n/routing";

export function HotelJsonLd({ locale }: { locale: Locale }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotelconcadoro.com";

  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${siteUrl}/#hotel`,
    name: "Hotel Ristorante Conca d'Oro",
    url: `${siteUrl}/${locale}`,
    telephone: "+39 0365 520176",
    email: "info@hotelconcadoro.com",
    priceRange: "€€",
    starRating: { "@type": "Rating", ratingValue: "3" },
    numberOfRooms: 42,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Zette, 7",
      addressLocality: "Salò",
      addressRegion: "BS",
      postalCode: "25087",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.6057,
      longitude: 10.521,
    },
    image: [`${siteUrl}/images/og/og-default.svg`],
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Conca+d%27Oro+Salo",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Two terraces with lake view", value: true },
      { "@type": "LocationFeatureSpecification", name: "Park with palms", value: true },
      { "@type": "LocationFeatureSpecification", name: "Children's playground", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private beach", value: true },
      { "@type": "LocationFeatureSpecification", name: "Banquet halls (up to 600 guests)", value: true },
    ],
    inLanguage: ["it", "en", "de"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
