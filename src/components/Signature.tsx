import clsx from "clsx";

export function Signature({
  children,
  className,
  size = "md",
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "gold" | "white";
}) {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
  } as const;
  const tones = {
    ink: "text-ink",
    gold: "text-brand-brass",
    white: "text-white",
  } as const;
  return (
    <span
      className={clsx(
        "font-script leading-none -rotate-2 inline-block",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
