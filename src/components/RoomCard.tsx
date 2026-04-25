import Image from "next/image";
import { Link } from "@/i18n/routing";
import clsx from "clsx";

export function RoomCard({
  name,
  description,
  features,
  image,
  imageAlt,
  cta,
  href = "/hotel",
  size = "default",
}: {
  name: string;
  description: string;
  features?: string[];
  image: string;
  imageAlt: string;
  cta: string;
  href?: string;
  size?: "default" | "large";
}) {
  return (
    <article
      className={clsx(
        "group relative overflow-hidden rounded-card bg-white lift",
        size === "large" ? "flex flex-col md:flex-row" : "flex flex-col",
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          size === "large"
            ? "md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[24rem]"
            : "aspect-[4/3]",
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
      </div>
      <div
        className={clsx(
          "flex flex-col gap-4 p-7",
          size === "large" && "md:w-1/2 md:p-10 md:justify-center",
        )}
      >
        <h3 className="font-serif text-2xl text-ink md:text-3xl">
          {name}
        </h3>
        <span className="gold-rule" />
        <p className="text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
        {features && features.length > 0 && (
          <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm text-ink sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-brass transition-colors hover:text-brand-deep"
        >
          {cta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
