"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Lightbox } from "./Lightbox";

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  span?: "tall" | "wide" | "square";
};

export function Gallery({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: { key: string; label: string }[];
}) {
  const [active, setActive] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={clsx(
            "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
            active === "all"
              ? "border-[--color-brand-gold] bg-[--color-brand-gold] text-white"
              : "border-[--color-line] bg-white text-[--color-muted] hover:border-[--color-brand-gold] hover:text-[--color-brand-brass]",
          )}
        >
          {categories.find((c) => c.key === "all")?.label ?? "All"}
        </button>
        {categories
          .filter((c) => c.key !== "all")
          .map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c.key)}
              className={clsx(
                "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                active === c.key
                  ? "border-[--color-brand-gold] bg-[--color-brand-gold] text-white"
                  : "border-[--color-line] bg-white text-[--color-muted] hover:border-[--color-brand-gold] hover:text-[--color-brand-brass]",
              )}
            >
              {c.label}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {filtered.map((item, idx) => (
          <button
            key={`${item.src}-${idx}`}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className={clsx(
              "group relative overflow-hidden rounded-xl bg-[--color-line]",
              item.span === "tall" && "row-span-2 aspect-[3/4]",
              item.span === "wide" && "col-span-2 aspect-[16/10]",
              (!item.span || item.span === "square") && "aspect-square",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(i) => setLightboxIndex(i)}
        />
      )}
    </div>
  );
}
