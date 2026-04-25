import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("galleryTitle"), description: t("galleryDescription") };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "gallery" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const items: GalleryItem[] = [
    { src: "/images/hero/hotel.svg", alt: "Esterno hotel", category: "hotel", span: "wide" },
    { src: "/images/rooms/classic.svg", alt: "Camera Classic", category: "rooms" },
    { src: "/images/rooms/superior.svg", alt: "Camera Superior", category: "rooms" },
    { src: "/images/gallery/terrace.svg", alt: "Terrazza con palme", category: "park", span: "tall" },
    { src: "/images/rooms/lake-view.svg", alt: "Camera Vista Lago", category: "rooms" },
    { src: "/images/gallery/dish-1.svg", alt: "Piatto verdure", category: "restaurant" },
    { src: "/images/gallery/dish-2.svg", alt: "Piatto tradizione", category: "restaurant" },
    { src: "/images/gallery/park.svg", alt: "Parco e ulivi", category: "park" },
    { src: "/images/gallery/lakefront.svg", alt: "Lungolago di Salò", category: "park", span: "wide" },
    { src: "/images/hero/restaurant.svg", alt: "Sala ristorante", category: "restaurant" },
    { src: "/images/hero/gallery.svg", alt: "Palme e luce", category: "park" },
    { src: "/images/hero/contact.svg", alt: "Salò vista lago", category: "park" },
  ];

  const categories = [
    { key: "all", label: tCommon("discover") },
    { key: "hotel", label: t("categories.hotel") },
    { key: "rooms", label: t("categories.rooms") },
    { key: "restaurant", label: t("categories.restaurant") },
    { key: "park", label: t("categories.park") },
  ];

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("intro")}
        image="/images/hero/gallery.svg"
        imageAlt="Galleria — terrazza con palme"
        height="medium"
      />

      <section className="py-20 sm:py-24">
        <Container size="wide">
          <Gallery items={items} categories={categories} />
        </Container>
      </section>
    </>
  );
}
