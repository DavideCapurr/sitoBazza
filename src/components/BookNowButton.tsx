"use client";

import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import type { ReactNode } from "react";

const FALLBACK_URL = "https://www.booking.com/";

function bookingUrlFor(locale: string): string {
  const perLocale =
    locale === "it"
      ? process.env.NEXT_PUBLIC_BOOKING_URL_IT
      : locale === "en"
        ? process.env.NEXT_PUBLIC_BOOKING_URL_EN
        : locale === "de"
          ? process.env.NEXT_PUBLIC_BOOKING_URL_DE
          : undefined;
  return perLocale || process.env.NEXT_PUBLIC_BOOKING_URL || FALLBACK_URL;
}

export function BookNowButton({
  className,
  variant = "primary",
  size = "md",
  children,
}: {
  className?: string;
  variant?: "primary" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}) {
  const locale = useLocale();
  const t = useTranslations("common");
  const url = bookingUrlFor(locale);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 whitespace-nowrap";
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  } as const;
  const variants = {
    primary:
      "bg-[--color-brand-gold] text-white hover:bg-[--color-brand-brass] shadow-[0_12px_30px_-12px_rgba(184,137,75,0.55)]",
    ghost:
      "border border-[--color-brand-gold] text-[--color-brand-brass] hover:bg-[--color-brand-gold] hover:text-white",
    inverse:
      "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white hover:text-[--color-brand-brass]",
  } as const;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(base, sizes[size], variants[variant], className)}
    >
      {children ?? t("bookNow")}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </a>
  );
}
