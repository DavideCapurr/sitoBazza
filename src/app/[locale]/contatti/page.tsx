import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Car, Train, Plane } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("contactTitle"), description: t("contactDescription") };
}

const DIRECTION_ICONS = [Car, Train, Plane];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const directions = t.raw("directions") as { mode: string; text: string }[];
  const phoneClean = tCommon("phone").replace(/\s+/g, "");

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("intro")}
        image="/images/hero/contact.svg"
        imageAlt="Salò, Lago di Garda"
        height="medium"
      />

      {/* Info + Form */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionTitle
                eyebrow={t("eyebrow")}
                title={t("infoTitle")}
                className="mb-10"
              />
              <ul className="space-y-6 text-base">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-brass">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Hotel
                    </p>
                    <p className="mt-1 text-ink">{tCommon("address")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-brass">
                    <Phone size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Tel.
                    </p>
                    <a
                      href={`tel:${phoneClean}`}
                      className="mt-1 block text-ink hover:text-brand-brass"
                    >
                      {tCommon("phone")}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-brand-brass">
                    <Mail size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${tCommon("email")}`}
                      className="mt-1 block text-ink hover:text-brand-brass"
                    >
                      {tCommon("email")}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hotel+Conca+d%27Oro+Salo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-gold px-6 py-3 text-sm font-medium text-brand-brass transition-colors hover:bg-brand-gold hover:text-white"
                >
                  {tCommon("getDirections")} →
                </a>
              </div>
            </div>

            <div className="rounded-card border border-line bg-white p-8 lg:p-10">
              <h2 className="font-serif text-2xl text-ink">
                {t("formTitle")}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {t("formIntro")}
              </p>
              <div className="mt-8">
                <ContactForm to={tCommon("email")} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Directions */}
      <section className="bg-cream py-24">
        <Container>
          <SectionTitle
            title={t("directionsTitle")}
            align="center"
            className="mx-auto mb-14"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {directions.map((d, i) => {
              const Icon = DIRECTION_ICONS[i] ?? Car;
              return (
                <li
                  key={d.mode}
                  className="flex flex-col gap-4 rounded-card bg-white p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-brand-brass">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="font-serif text-xl text-ink">
                    {d.mode}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {d.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Map */}
      <section className="py-24">
        <Container>
          <SectionTitle
            title={t("mapTitle")}
            align="center"
            className="mx-auto mb-10"
          />
          <div className="overflow-hidden rounded-card border border-line">
            <iframe
              title={t("mapTitle")}
              src="https://www.google.com/maps?q=Hotel+Conca+d%27Oro+Salo&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[450px] w-full border-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
