import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { RoomCard } from "@/components/RoomCard";
import { BookNowButton } from "@/components/BookNowButton";
import { Signature } from "@/components/Signature";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type Review = { text: string; author: string; source: string };

const HIGHLIGHT_KEYS = ["lake", "restaurant", "park", "family"] as const;

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

  const reviews = t.raw("reviews") as Review[];
  const roomTypes = tRooms.raw("types") as {
    name: string;
    description: string;
    features: string[];
  }[];
  const roomImages = [
    "/images/rooms/classic.svg",
    "/images/rooms/superior.svg",
    "/images/rooms/lake-view.svg",
  ];

  return (
    <>
      <Hero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        signature={t("heroSignature")}
        image="/images/hero/home.svg"
        imageAlt="Salò, Lago di Garda al tramonto"
      />

      {/* Letter from the family — il cuore del sito */}
      <section className="paper-grain py-24 sm:py-32">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="eyebrow">{t("letterEyebrow")}</span>
            <h2 className="font-serif text-balance text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              {t("letterTitle")}
            </h2>
            <OrnamentDivider variant="wave" className="my-2 w-full max-w-md" />
          </div>

          <div className="relative mx-auto mt-12 max-w-2xl rounded-card bg-paper px-7 py-12 shadow-paper sm:px-12 sm:py-16">
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 inline-block h-6 w-24 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-brand-gold/30 shadow-sm"
            />
            <p className="font-serif text-lg leading-[1.65] text-ink/90 sm:text-xl">
              {t("letterBody")}
            </p>
            <p className="mt-8 text-base text-muted">{t("letterClose")}</p>
            <div className="mt-3">
              <Signature size="lg" tone="gold">
                {tCommon("signature")}
              </Signature>
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights — racconto editoriale, non card-grid */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">{tCommon("since")}</span>
            <h2 className="font-serif text-balance text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              {t("highlightsTitle")}
            </h2>
            <OrnamentDivider variant="olive" className="mt-2 w-full max-w-md" />
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            {HIGHLIGHT_KEYS.map((key, idx) => {
              const isAlt = idx % 2 === 1;
              return (
                <article
                  key={key}
                  className={`relative ${isAlt ? "md:mt-16" : ""}`}
                >
                  <p className="font-script text-3xl text-brand-brass">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                    <span className="wavy">
                      {t(`highlights.${key}.title`)}
                    </span>
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
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

      {/* Restaurant teaser — bg lake-deep, più caldo del nero puro */}
      <section className="bg-lake-deep py-24 text-white sm:py-32">
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

      {/* Reviews — voci di chi è tornato, stile lettera */}
      <section className="paper-grain py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <h2 className="font-serif text-balance text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              {t("reviewsTitle")}
            </h2>
            <OrnamentDivider variant="sun" className="mt-2 w-full max-w-md" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <figure
                key={i}
                className={`relative flex flex-col gap-5 rounded-card bg-paper p-8 shadow-paper ${
                  i === 1 ? "md:translate-y-6" : ""
                } ${i === 2 ? "md:rotate-[0.5deg]" : ""} ${
                  i === 0 ? "md:-rotate-[0.5deg]" : ""
                }`}
              >
                <span className="font-serif text-5xl leading-none text-brand-gold">
                  &ldquo;
                </span>
                <blockquote className="font-serif text-lg italic leading-snug text-ink">
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

      {/* CTA finale */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/gallery.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-lake-deep/70" aria-hidden />
        </div>
        <Container className="relative">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center text-white">
            <span className="font-script text-3xl text-white/90">
              {tCommon("signature")}
            </span>
            <h2 className="font-serif text-balance text-4xl leading-tight sm:text-5xl">
              {t("introTitle")}
            </h2>
            <p className="text-lg text-white/85">{t("introText")}</p>
            <BookNowButton size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
