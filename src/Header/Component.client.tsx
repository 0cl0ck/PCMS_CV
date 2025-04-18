'use client';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import { IconLogin, IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { Header } from '@/payload-types';

import { useAuth } from '@/components/auth/AuthProvider';
import { Logo } from '@/components/Logo/Logo';
import { SearchIcon } from 'lucide-react';
import { HeaderNav } from './Nav';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Vérifier si nous sommes sur la page d'accueil
  const isHomePage = pathname === '/';

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  // Effet de défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? 'bg-background/70 backdrop-blur-lg shadow-md'
              : 'bg-transparent'
            : 'bg-neutral-900 text-white shadow-md'
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container mx-auto">
          {/* Desktop layout */}
          <div className="py-4 hidden md:flex justify-between items-center">
            <Link href="/">
              <Logo
                loading="eager"
                priority="high"
                showText={true}
                size="medium"
                textClassName=" dark:text-white"
                className=" dark:text-white"
              />
            </Link>
            <div className="flex items-center gap-6">
              <HeaderNav data={data} />
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={() => logout()}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors flex items-center"
                      aria-label="Déconnexion"
                    >
                      <IconLogout className="md:mr-2 w-5 h-5" />
                      <span className="hidden md:inline">Déconnexion</span>
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center"
                      aria-label="Connexion"
                    >
                      <IconLogin className="md:mr-2 w-5 h-5" />
                      <span className="hidden md:inline">Connexion</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="py-4 flex md:hidden justify-between items-center relative">
            {/* Menu hamburger à gauche */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 focus:outline-none text-white"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <IconX className="w-6 h-6 text-white" />
              ) : (
                <IconMenu2 className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Logo au centre */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Logo loading="eager" priority="high" showText={false} size="xl" className=" " />
            </Link>

            {/* Connexion/Déconnexion à droite */}
            <div className="flex items-center justify-end">
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={() => logout()}
                      className="p-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors flex items-center"
                      aria-label="Déconnexion"
                    >
                      <IconLogout className="w-5 h-5" />
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="p-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors flex items-center"
                      aria-label="Connexion"
                    >
                      <IconLogin className="w-5 h-5" />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile sidebar - Placé en dehors du header pour couvrir tout l'écran */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-[999] transition-opacity duration-500 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`md:hidden fixed top-0 left-0 z-[1000] w-64 h-screen bg-neutral-900 shadow-lg transform transition-all duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-800">
          <Logo
            loading="eager"
            priority="high"
            showText={false}
            size="small"
            className="invert-0"
          />
          <p className="text-white text-sm">Menu</p>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white focus:outline-none"
            aria-label="Fermer le menu"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col py-4 px-4 space-y-4 h-[calc(100vh-70px)] overflow-y-auto">
          <Link
            href="/search"
            className="flex items-center text-base font-medium hover:text-primary text-white py-2 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            <SearchIcon className="w-5 h-5 mr-3" />
            Rechercher
          </Link>

          {/* Afficher tous les éléments de navigation sauf le panier qui sera ajouté séparément */}
          {data?.navItems
            ?.filter((item) => !(item.link?.url && item.link.url.includes('/panier')))
            .map(({ link }, i) => (
              <Link
                key={i}
                href={link.url || '#'}
                className="flex text-white items-center text-base font-medium py-2 transition-all duration-200 hover:translate-x-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          {/* Ajouter le panier une seule fois */}
          <Link
            href="/panier"
            className="flex text-white items-center text-base font-medium py-2 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            Panier
          </Link>
        </nav>
      </div>
    </>
  );
};

