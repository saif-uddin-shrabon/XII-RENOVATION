"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

/**
 * Shared next/image wrapper — consistent defaults for project photography.
 * Falls back to a quiet millwork well when a source fails to load.
 */
export default function SafeImage({
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  className,
  style,
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={className}
        style={{
          display: "block",
          background: "var(--bg-tertiary, #191c22)",
          ...(fill
            ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
            : { width, height }),
          ...style,
        }}
      />
    );
  }

  return (
    <Image
      alt={alt}
      sizes={sizes}
      quality={quality}
      className={className}
      style={style}
      fill={fill}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
