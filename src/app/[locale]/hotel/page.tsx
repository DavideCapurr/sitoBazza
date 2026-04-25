import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { RoomCard } from "@/components/RoomCard";
import { BookNowButton } from "@/components/BookNowButton";
import { Wifi, Car, Coffee, TreePalm, UtensilsCrossed, Languages, Bike, Briefcase } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("roomsTitle"), description: t("roomsDescription") };
}

const SERVICE_ICONS = [Wifi, Car, Coffee, TreePalm, UtensilsCrossed, Languages, Bike, Briefcase];

export default async function HotelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "rooms" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const types = t.raw("types") as {
    name: string;
    description: string;
    features: string[];
  }[];
  const services = t.raw("services") as string[];
  const roomImages = ["/images/rooms/classic.svg", "/images/rooms/superior.svg", "/images/rooms/lake-view.svg"];

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("intro")}
        image="/images/hero/hotel.svg"
        imageAlt="Facciata Hotel Conca d'Oro"
        height="medium"
      />

      {/* Room types */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionTitle
            eyebrow={t("eyebrow")}
            title={t("typesTitle")}
            className="mb-14"
          />
          <div className="flex flex-col gap-8 lg:gap-12">
            {types.map((room, idx) => (
              <RoomCard
                key={room.name}
                name={room.name}
                description={room.description}
                features={room.features}
                image={roomImages[idx] ?? roomImages[0]}
                imageAlt={`Camera ${room.name}`}
                cta={tCommon("bookCta")}
                size="large"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-[--color-cream] py-24">
        <Container>
          <SectionTitle
            title={t("servicesTitle")}
            align="center"
            className="mb-14 mx-auto"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <li
                  key={s}
                  className="flex items-center gap-4 rounded-[--radius-card] bg-white px-6 py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--color-cream] text-[--color-brand-brass]">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="text-sm text-[--color-ink]">{s}</span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Policy */}
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <SectionTitle
            title={t("policyTitle")}
            align="center"
            className="mx-auto mb-6"
          />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-[--color-muted]">
            {t("policy")}
          </p>
          <div className="mt-10 flex justify-center">
            <BookNowButton size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
