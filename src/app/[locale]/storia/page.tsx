import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { Polaroid } from "@/components/Polaroid";
import { Signature } from "@/components/Signature";
import { OrnamentDivider } from "@/components/OrnamentDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("storyTitle"), description: t("storyDescription") };
}

const TIMELINE_IMAGES = [
  "/images/hero/story.svg",
  "/images/hero/hotel.svg",
  "/images/gallery/terrace.svg",
  "/images/gallery/lakefront.svg",
];

const ROTATIONS = [-2.5, 1.5, -1.5, 2];

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "story" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const timeline = t.raw("timeline") as {
    year: string;
    title: string;
    text: string;
  }[];
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <Hero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("intro")}
        image="/images/hero/story.svg"
        imageAlt="Famiglia Bazzani"
        height="medium"
      />

      {/* Pull quote dal nonno */}
      <section className="paper-grain py-24">
        <Container size="narrow" className="text-center">
          <OrnamentDivider variant="sun" className="mx-auto mb-10 w-full max-w-md" />
          <blockquote className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl md:text-4xl">
            {t("pullQuote")}
          </blockquote>
        </Container>
      </section>

      {/* Album di famiglia — polaroid timeline */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="font-serif text-balance text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              {t("timelineTitle")}
            </h2>
          </div>

          <ol className="grid gap-x-8 gap-y-20 md:grid-cols-2">
            {timeline.map((step, idx) => {
              const isAlt = idx % 2 === 1;
              return (
                <li
                  key={step.year}
                  className={`flex flex-col items-center gap-6 ${
                    isAlt ? "md:mt-24" : ""
                  } md:flex-row md:items-start ${
                    isAlt ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="shrink-0">
                    <Polaroid
                      src={TIMELINE_IMAGES[idx] ?? TIMELINE_IMAGES[0]}
                      alt={step.title}
                      caption={step.year}
                      rotation={ROTATIONS[idx] ?? 0}
                      width={260}
                      height={260}
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-3 ${
                      isAlt ? "md:items-end md:text-right" : ""
                    }`}
                  >
                    <span className="font-serif text-2xl text-brand-brass">
                      {step.title}
                    </span>
                    <span className="block h-[2px] w-10 rounded-full bg-brand-gold" />
                    <p className="max-w-sm text-base leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Valori, in blocchi editoriali */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <h2 className="font-serif text-balance text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              {t("valuesTitle")}
            </h2>
            <OrnamentDivider variant="olive" className="mt-2 w-full max-w-md" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, idx) => (
              <article
                key={v.title}
                className="rounded-card bg-paper p-10 shadow-paper"
              >
                <span className="font-script text-3xl text-brand-brass">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">
                  {v.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Firma di chiusura */}
      <section className="bg-lake-deep py-24 text-center text-white">
        <Container size="narrow">
          <p className="font-serif text-2xl italic leading-snug sm:text-3xl">
            {t("intro")}
          </p>
          <div className="mt-10">
            <Signature size="lg" tone="white">
              {tCommon("signature")}
            </Signature>
          </div>
        </Container>
      </section>
    </>
  );
}
