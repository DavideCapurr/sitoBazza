import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("storyTitle"), description: t("storyDescription") };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "story" });

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

      {/* Timeline */}
      <section className="py-24 sm:py-32">
        <Container size="narrow">
          <SectionTitle
            title={t("timelineTitle")}
            align="center"
            className="mx-auto mb-16"
          />
          <ol className="relative space-y-12 border-l border-[--color-line] pl-8 sm:pl-12">
            {timeline.map((step) => (
              <li key={step.year} className="relative">
                <span className="absolute -left-[37px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[--color-brand-gold] sm:-left-[49px]">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="font-serif text-3xl text-[--color-brand-brass]">
                  {step.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[--color-ink]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[--color-muted]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[--color-cream] py-24">
        <Container>
          <SectionTitle
            title={t("valuesTitle")}
            align="center"
            className="mx-auto mb-14"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <article
                key={v.title}
                className="rounded-[--radius-card] bg-white p-10"
              >
                <h3 className="font-serif text-2xl text-[--color-ink]">
                  {v.title}
                </h3>
                <span className="mt-3 block h-[2px] w-10 rounded-full bg-[--color-brand-gold]" />
                <p className="mt-5 text-sm leading-relaxed text-[--color-muted]">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Family image */}
      <section className="py-24">
        <Container>
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[--radius-card]">
            <Image
              src="/images/hero/story.svg"
              alt="Famiglia Bazzani — tre generazioni"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
