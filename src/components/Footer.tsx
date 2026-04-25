import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "@/lib/nav";
import { BookNowButton } from "./BookNowButton";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[--color-ink] text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo tone="dark" />
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            {tFooter("tagline")}
          </p>
          <BookNowButton variant="ghost" className="self-start !border-white/40 !text-white hover:!bg-white hover:!text-[--color-brand-brass]" />
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">
            {tFooter("contactsTitle")}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[--color-brand-gold]" aria-hidden />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-[--color-brand-gold]" aria-hidden />
              <a href={`tel:${t("phone").replace(/\s+/g, "")}`} className="hover:text-white">
                {t("phone")}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-[--color-brand-gold]" aria-hidden />
              <a href={`mailto:${t("email")}`} className="hover:text-white">
                {t("email")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">
            {tFooter("hoursTitle")}
          </h3>
          <p className="flex items-start gap-3 text-sm">
            <Clock size={16} className="mt-0.5 shrink-0 text-[--color-brand-gold]" aria-hidden />
            <span>{t("openingHours")}</span>
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-white">
            {tFooter("navTitle")}
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:px-8">
          <span>{tFooter("credits", { year })}</span>
          <span>{tFooter("vat")}</span>
        </div>
      </div>
    </footer>
  );
}
