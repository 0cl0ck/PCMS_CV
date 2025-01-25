import { Media as MediaType } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

export const Media: React.FC<{
  resource: MediaType | string;
  sizes?: string;
  className?: string;
}> = ({ resource, sizes, className }) => {
  if (typeof resource === 'string') {
    return null;
  }

  const { width, height, filename, alt } = resource;

  // Vérification et construction de l'URL
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';
  const imageUrl = `${baseUrl}/media/${filename}`;

  return (
    <Image
      src={imageUrl}
      alt={alt || ''}
      className={className}
      width={width || 3500}
      height={height || 2000}
      sizes={sizes}
    />
  );
};
