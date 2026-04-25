import Image from "next/image";
import type { ReactNode } from "react";
import clsx from "clsx";
import { BookNowButton } from "./BookNowButton";

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  cta,
  height = "tall",
  priority = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  imageAlt: string;
  cta?: ReactNode;
  height?: "tall" | "medium";
  priority?: boolean;
}) {
  return (
    <section
      className={clsx(
        "relative flex w-full items-end overflow-hidden text-white",
        height === "tall"
          ? "min-h-[85vh] pt-40 pb-16 sm:min-h-[92vh] sm:pb-24"
          : "min-h-[55vh] pt-32 pb-14",
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[--color-brand-gold]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {cta ?? <BookNowButton size="lg" />}
          </div>
        </div>
      </div>
    </section>
  );
}
