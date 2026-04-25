"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Link } from "@/i18n/routing";
import { Nav } from "./Nav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BookNowButton } from "./BookNowButton";
import { Logo } from "./Logo";

export function Header() {
  const t = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-cream-soft/95 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Hotel Conca d'Oro — Home">
          <Logo />
        </Link>

        <Nav />

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <BookNowButton size="sm" className="hidden md:inline-flex" />
          <button
            type="button"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-ink"
          >
            <span
              className={clsx(
                "block h-[1.5px] w-6 bg-current transition-transform",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={clsx(
                "block h-[1.5px] w-6 bg-current transition-opacity",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "block h-[1.5px] w-6 bg-current transition-transform",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          menuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
        <div className="border-t border-line bg-cream-soft px-5 py-10 sm:px-8">
          <Nav
            orientation="vertical"
            onNavigate={() => setMenuOpen(false)}
          />
          <div className="mt-10 flex flex-col gap-6">
            <LanguageSwitcher />
            <BookNowButton className="w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
