"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const LABELS: Record<string, string> = { it: "IT", en: "EN", de: "DE" };
const FULL: Record<string, string> = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
};

export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const color =
    tone === "dark"
      ? "text-white/90 hover:text-white"
      : "text-ink hover:text-brand-brass";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.2em] uppercase",
          color,
        )}
      >
        {LABELS[locale] ?? locale.toUpperCase()}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-line bg-white shadow-lg"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: l });
                }}
                className={clsx(
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors",
                  l === locale
                    ? "bg-cream text-brand-brass"
                    : "hover:bg-cream-soft text-ink",
                )}
              >
                <span>{FULL[l]}</span>
                <span className="text-xs tracking-[0.2em] text-muted">
                  {LABELS[l]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
