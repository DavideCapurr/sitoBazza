import clsx from "clsx";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const primary = tone === "dark" ? "#ffffff" : "var(--color-ink)";
  const accent = "var(--color-brand-gold)";

  return (
    <span
      className={clsx("inline-flex items-center gap-3", className)}
      aria-label="Hotel Conca d'Oro"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="22" stroke={accent} strokeWidth="1.5" />
        <path
          d="M14 30c2-6 5-10 10-10s8 4 10 10"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 30c1.5-4 3.5-6.5 6-6.5s4.5 2.5 6 6.5"
          stroke={accent}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="16" r="2" fill={accent} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-serif text-xl tracking-wide"
          style={{ color: primary }}
        >
          Conca d&rsquo;Oro
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.28em]"
          style={{ color: tone === "dark" ? "rgba(255,255,255,0.75)" : "var(--color-muted)" }}
        >
          Hotel · Ristorante · Salò
        </span>
      </span>
    </span>
  );
}
