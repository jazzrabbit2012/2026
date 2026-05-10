import { useState, useCallback } from 'react';
import { artists } from './data/artists';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { ArtistSection } from './components/ArtistSection';

function AppContent() {
  const [activeSlug, setActiveSlug] = useState(artists[0].slug);

  const handleVisible = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation artists={artists} activeSlug={activeSlug} />
      <HeroSection />
      {artists.map((artist, index) => (
        <ArtistSection
          key={artist.slug}
          artist={artist}
          index={index}
          onVisible={handleVisible}
        />
      ))}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: '#0a0a0a',
        color: '#f4f4f0',
        minHeight: '100vh',
        padding: '0 6vw',
      }}
    >
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.25em',
        textTransform: 'uppercase' as const,
        color: '#d4af7a',
        marginBottom: '32px',
      }}>
        Biennale Arte 2026
      </p>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        fontWeight: 500,
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: '#f4f4f0',
        marginBottom: '16px',
      }}>
        In Minor Keys
      </h1>

      <p style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        fontWeight: 400,
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        fontStyle: 'italic',
        color: 'rgba(244, 244, 240, 0.45)',
        letterSpacing: '0.02em',
      }}>
        2026威尼斯双年展 — 主题馆参展艺术家
      </p>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: 'rgba(244, 244, 240, 0.3)',
        }}>
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-[rgba(244,244,240,0.15)]" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      color: 'rgba(244, 244, 240, 0.35)',
      padding: '80px 6vw',
    }}>
      <div className="mx-auto" style={{ maxWidth: '960px' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: '#d4af7a',
              marginBottom: '8px',
            }}>
              Biennale Arte 2026
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              color: 'rgba(244, 244, 240, 0.3)',
            }}>
              In Minor Keys — 主题馆参展艺术家
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'rgba(244, 244, 240, 0.2)',
            }}>
              {artists.length} 位艺术家
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(244, 244, 240, 0.08)' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'rgba(244, 244, 240, 0.15)',
          }}>
            内容来源 labiennale.org — 策展人 Koyo Kouoh
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
