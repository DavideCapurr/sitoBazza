import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { RoomCard } from "@/components/RoomCard";
import { BookNowButton } from "@/components/BookNowButton";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Waves, UtensilsCrossed, TreePalm, Heart } from "lucide-react";

type Review = { text: string; author: string; source: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("homeTitle"), description: t("homeDescription") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tRooms = await getTranslations({ locale, namespace: "rooms" });

  const highlightIcons = {
    lake: Waves,
    restaurant: UtensilsCrossed,
    park: TreePalm,
    family: Heart,
  } as const;

  const reviews = t.raw("reviews") as Review[];
  const roomTypes = tRooms.raw("types") as {
    name: string;
    description: string;
    features: string[];
  }[];
  const roomImages = ["/images/rooms/classic.svg", "/images/rooms/superior.svg", "/images/rooms/lake-view.svg"];

  return (
    <>
      <Hero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        image="/images/hero/home.svg"
        imageAlt="Salò, Lago di Garda al tramonto"
      />

      {/* Intro */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <SectionTitle
              eyebrow={t("introEyebrow")}
              title={t("introTitle")}
              intro={t("introText")}
              as="h2"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-card lift">
              <Image
                src="/images/hero/hotel.svg"
                alt="Hotel Conca d'Oro, facciata"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="bg-cream py-24">
        <Container>
          <SectionTitle
            title={t("highlightsTitle")}
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {(["lake", "restaurant", "park", "family"] as const).map((key) => {
              const Icon = highlightIcons[key];
              return (
                <article
                  key={key}
                  className="group flex flex-col items-start gap-4 rounded-card bg-white p-8 transition-shadow duration-300 hover:shadow-warm"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-brand-brass">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-serif text-xl text-ink">
                    {t(`highlights.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`highlights.${key}.text`)}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Rooms teaser */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow={t("roomsTeaserEyebrow")}
              title={t("roomsTeaserTitle")}
              intro={t("roomsTeaserText")}
            />
            <Link
              href="/hotel"
              className="self-start text-sm font-medium tracking-wide text-brand-brass hover:text-brand-deep"
            >
              {tCommon("viewAllRooms")} →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {roomTypes.map((room, idx) => (
              <RoomCard
                key={room.name}
                name={room.name}
                description={room.description}
                image={roomImages[idx] ?? roomImages[0]}
                imageAlt={`Camera ${room.name}`}
                cta={tCommon("discover")}
                href="/hotel"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Restaurant teaser */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src="/images/hero/restaurant.svg"
                alt="Cucina bresciana — piatto"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionTitle
                eyebrow={t("restaurantTeaserEyebrow")}
                title={t("restaurantTeaserTitle")}
                intro={t("restaurantTeaserText")}
                tone="dark"
              />
              <div className="mt-8">
                <Link
                  href="/ristorante"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-brass"
                >
                  {tCommon("learnMore")} →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionTitle
            title={t("reviewsTitle")}
            align="center"
            className="mb-14 mx-auto"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className="flex flex-col gap-5 rounded-card border border-line bg-white p-8"
              >
                <span className="text-3xl text-brand-gold">“</span>
                <blockquote className="font-serif text-lg leading-snug text-ink">
                  {r.text}
                </blockquote>
                <figcaption className="mt-auto text-xs uppercase tracking-[0.2em] text-muted">
                  {r.author} · {r.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/gallery.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden />
        </div>
        <Container className="relative">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center text-white">
            <SectionTitle
              title={t("introTitle")}
              tone="dark"
              align="center"
            />
            <BookNowButton size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
