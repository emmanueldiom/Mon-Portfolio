import type { MediaImage } from '../../types/content';

interface PictureProps {
  image: MediaImage;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

const srcSet = (image: MediaImage, ext: 'avif' | 'webp') =>
  image.widths.map((w) => `/media/${image.name}-${w}.${ext} ${w}w`).join(', ');

/** Image AVIF avec repli WebP, dimensions fixées pour éviter les décalages de mise en page. */
export function Picture({ image, sizes = '100vw', className, imgClassName, priority = false }: PictureProps) {
  const largest = Math.max(...image.widths);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      <img
        src={`/media/${image.name}-${largest}.webp`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
      />
    </picture>
  );
}
