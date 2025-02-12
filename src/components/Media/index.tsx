import { Media as MediaType } from '@/payload-types';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

export const Media: React.FC<{
  resource?: MediaType | string;
  src?: string | StaticImageData; // Ajout de `src` pour accepter aussi `StaticImageData`
  sizes?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  imgClassName?: string;
}> = ({ resource, src, sizes, className, fill, priority, imgClassName }) => {
  let imageUrl: string | StaticImageData | undefined = src; // Si `src` est défini, on l’utilise

  if (!imageUrl && resource && typeof resource !== 'string') {
    const { filename } = resource;
    const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';
    imageUrl = `${baseUrl}/media/${filename}`;
  }

  if (!imageUrl) return null; // Aucun média disponible

  return (
    <Image
      src={imageUrl}
      alt={typeof resource === 'object' ? resource.alt || '' : ''}
      className={imgClassName || className}
      width={fill ? undefined : typeof resource === 'object' ? resource.width || 3500 : undefined}
      height={fill ? undefined : typeof resource === 'object' ? resource.height || 2000 : undefined}
      sizes={sizes}
      fill={fill}
      priority={priority}
    />
  );
};
