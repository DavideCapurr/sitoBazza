"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import clsx from "clsx";
import { NAV_ITEMS } from "@/lib/nav";

export function Nav({
  onNavigate,
  tone = "light",
  orientation = "horizontal",
}: {
  onNavigate?: () => void;
  tone?: "light" | "dark";
  orientation?: "horizontal" | "vertical";
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul
      className={clsx(
        orientation === "vertical"
          ? "flex flex-col gap-6"
          : "hidden lg:flex items-center gap-7",
      )}
    >
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={clsx(
                "relative text-sm font-medium tracking-wide transition-colors",
                orientation === "vertical" && "text-2xl font-serif",
                tone === "dark"
                  ? active
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  : active
                    ? "text-brand-brass"
                    : "text-ink hover:text-brand-brass",
              )}
            >
              {t(item.key)}
              {active && orientation === "horizontal" && (
                <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-6 bg-brand-gold" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
