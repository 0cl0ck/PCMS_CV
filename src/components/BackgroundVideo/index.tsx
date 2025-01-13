'use client';

import { cn } from '@/utilities/cn';
import React, { Suspense } from 'react';

type BackgroundVideoProps = {
  className?: string;
  src: string;
};

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ className, src }) => {
  return (
    <div className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}>
      <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse" />}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
        />
      </Suspense>
    </div>
  );
};
