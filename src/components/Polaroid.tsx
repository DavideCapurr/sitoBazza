import Image from "next/image";
import clsx from "clsx";

export function Polaroid({
  src,
  alt,
  caption,
  className,
  rotation = 0,
  width = 360,
  height = 360,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  rotation?: number;
  width?: number;
  height?: number;
}) {
  return (
    <figure
      className={clsx("polaroid relative inline-block", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="relative overflow-hidden bg-line"
        style={{ width, height }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${width}px`}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-script text-2xl text-ink">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
