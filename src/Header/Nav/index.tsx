'use client';

import type { Header as HeaderType } from '@/payload-types';
import React from 'react';

import { CMSLink } from '@/components/Link';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

interface HeaderNavProps {
  data: HeaderType;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search" className="flex items-center">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};

