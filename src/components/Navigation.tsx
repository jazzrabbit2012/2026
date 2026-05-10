import { useRef, useCallback } from 'react';
import type { Artist } from '../types/artist';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  artists: Artist[];
  activeSlug: string;
}

export function Navigation({ artists, activeSlug }: NavigationProps) {
  const { lang, toggleLang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(`artist-${slug}`);
    if (element) {
      const navHeight = 56;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid rgba(212, 175, 122, 0.15)',
      }}
    >
      <div className="flex items-center">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex-shrink-0 px-3 md:px-5 py-3 border-r border-[rgba(212,175,122,0.15)] hover:bg-[rgba(212,175,122,0.08)] transition-colors duration-200"
        >
          <span
            className="text-[#d4af7a] text-xs tracking-[0.15em] uppercase font-medium whitespace-nowrap"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Biennale 2026
          </span>
        </button>

        {/* Scrollable artist links */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center px-2">
            {artists.map((artist) => (
              <a
                key={artist.slug}
                href={`#artist-${artist.slug}`}
                onClick={(e) => scrollToSection(e, artist.slug)}
                className="flex-shrink-0 px-2 md:px-3 py-3 text-xs tracking-[0.06em] uppercase whitespace-nowrap relative"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '10px',
                  color: activeSlug === artist.slug ? '#d4af7a' : 'rgba(244, 244, 240, 0.4)',
                }}
              >
                {artist.name}
                {activeSlug === artist.slug && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-[2px]"
                    style={{ backgroundColor: '#d4af7a' }}
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex-shrink-0 flex items-center border-l border-[rgba(212,175,122,0.15)]">
          <button
            onClick={toggleLang}
            className="px-3 md:px-4 py-3 text-xs font-medium tracking-wider uppercase hover:bg-[rgba(212,175,122,0.08)] transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span style={{ color: lang === 'zh' ? '#d4af7a' : 'rgba(244, 244, 240, 0.4)' }}>中</span>
            <span style={{ color: 'rgba(244, 244, 240, 0.25)', margin: '0 4px' }}>/</span>
            <span style={{ color: lang === 'en' ? '#d4af7a' : 'rgba(244, 244, 240, 0.4)' }}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
