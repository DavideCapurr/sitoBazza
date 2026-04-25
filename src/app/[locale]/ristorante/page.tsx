import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Sun, Coffee, Moon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("restaurantTitle"), description: t("restaurantDescription") };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "restaurant" });

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("intro")}
        image="/images/hero/restaurant.svg"
        imageAlt="Cucina bresciana — piatto tipico"
        height="medium"
      />

      {/* Concept */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <SectionTitle
              eyebrow={t("eyebrow")}
              title={t("conceptTitle")}
              intro={t("conceptText")}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-card lift">
              <Image
                src="/images/gallery/dish-1.svg"
                alt="Piatto tipico"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Menu */}
      <section className="bg-cream py-24">
        <Container size="narrow" className="text-center">
          <SectionTitle
            title={t("menuTitle")}
            align="center"
            className="mx-auto mb-6"
          />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted">
            {t("menuText")}
          </p>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand-gold px-6 py-3 text-sm font-medium text-brand-brass transition-colors hover:bg-brand-gold hover:text-white"
          >
            {t("menuCta")} →
          </a>
        </Container>
      </section>

      {/* Hours */}
      <section className="py-24">
        <Container>
          <SectionTitle
            title={t("hoursTitle")}
            align="center"
            className="mx-auto mb-14"
          />
          <ul className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              { Icon: Coffee, label: t("breakfast") },
              { Icon: Sun, label: t("lunch") },
              { Icon: Moon, label: t("dinner") },
            ].map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-3 rounded-card border border-line bg-white p-8 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-brand-brass">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="text-sm font-medium text-ink">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Terrace */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/terrace.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center text-white">
            <SectionTitle
              eyebrow={t("eyebrow")}
              title={t("terraceTitle")}
              intro={t("terraceText")}
              align="center"
              tone="dark"
              className="mx-auto"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
