import type { ReactNode } from "react";
import clsx from "clsx";

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const isCenter = align === "center";
  const textColor = tone === "dark" ? "text-white" : "text-[--color-ink]";
  const introColor = tone === "dark" ? "text-white/80" : "text-[--color-muted]";

  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={clsx(
          "font-serif text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
          textColor,
        )}
      >
        {title}
      </Heading>
      <span className="gold-rule" />
      {intro && (
        <p className={clsx("max-w-2xl text-base sm:text-lg", introColor)}>
          {intro}
        </p>
      )}
    </div>
  );
}
