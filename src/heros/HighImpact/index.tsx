'use client';

import { BackgroundVideo } from '@/components/BackgroundVideo';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { Page } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import React, { useEffect } from 'react';

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('dark');
  });

  const isVideo = media && typeof media === 'object' && media.mimeType?.includes('video');

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {/* Vidéo S3 affichée directement */}
        <BackgroundVideo
          src="https://chanvre-vert-media.s3.eu-west-3.amazonaws.com/glass-animation-5_2+(1)+(1).mp4"
          className="-z-10"
        />
        {/* Affichage conditionnel de l'image si ce n'est pas une vidéo et si un média est fourni */}
        {!isVideo && media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  );
};
