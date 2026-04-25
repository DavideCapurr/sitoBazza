import clsx from "clsx";

type Variant = "wave" | "olive" | "sun";

export function OrnamentDivider({
  variant = "wave",
  tone = "gold",
  className,
}: {
  variant?: Variant;
  tone?: "gold" | "sage" | "white";
  className?: string;
}) {
  const stroke = tone === "white" ? "#ffffff" : tone === "sage" ? "var(--color-sage)" : "var(--color-brand-gold)";

  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-4 text-current",
        className,
      )}
      aria-hidden
    >
      <span
        className="h-px flex-1 max-w-[7rem]"
        style={{ backgroundColor: stroke, opacity: 0.5 }}
      />
      <svg
        width="58"
        height="22"
        viewBox="0 0 58 22"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variant === "wave" && (
          <path d="M2 11 Q 10 4 18 11 T 34 11 T 50 11 56 11" fill="none" />
        )}
        {variant === "olive" && (
          <g>
            <line x1="6" y1="11" x2="52" y2="11" />
            <ellipse cx="20" cy="8" rx="5" ry="2" transform="rotate(-22 20 8)" />
            <ellipse cx="29" cy="14" rx="5" ry="2" transform="rotate(20 29 14)" />
            <ellipse cx="38" cy="8" rx="5" ry="2" transform="rotate(-22 38 8)" />
          </g>
        )}
        {variant === "sun" && (
          <g>
            <circle cx="29" cy="11" r="4" />
            <line x1="29" y1="2" x2="29" y2="5" />
            <line x1="29" y1="17" x2="29" y2="20" />
            <line x1="20" y1="11" x2="17" y2="11" />
            <line x1="38" y1="11" x2="41" y2="11" />
            <line x1="22" y1="4" x2="20" y2="2" />
            <line x1="36" y1="4" x2="38" y2="2" />
            <line x1="22" y1="18" x2="20" y2="20" />
            <line x1="36" y1="18" x2="38" y2="20" />
          </g>
        )}
      </svg>
      <span
        className="h-px flex-1 max-w-[7rem]"
        style={{ backgroundColor: stroke, opacity: 0.5 }}
      />
    </div>
  );
}
