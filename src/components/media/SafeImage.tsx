import Image, { type ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

/**
 * Shared next/image wrapper — consistent defaults for project photography.
 */
export default function SafeImage({
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  ...props
}: SafeImageProps) {
  return <Image alt={alt} sizes={sizes} quality={quality} {...props} />;
}
