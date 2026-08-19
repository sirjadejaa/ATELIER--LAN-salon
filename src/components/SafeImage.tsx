"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

// Minimal 1x1 shimmer SVG blur placeholder in warm neutral dark tone
const SHIMMER_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzI0MUQxQSIvPjwvc3ZnPg==";

interface SafeImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  fallbackSrc = "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=75",
  placeholder = "blur",
  blurDataURL = SHIMMER_BLUR_DATA_URL,
  quality = 75,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : src}
      alt={alt || "Atelier Élan Editorial"}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={`transition-opacity duration-500 ease-out ${
        isLoaded ? "opacity-100" : "opacity-90"
      } ${className}`}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setIsLoaded(true);
        }
      }}
    />
  );
}
