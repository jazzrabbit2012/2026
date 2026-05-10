import { useRef, useEffect } from 'react';
import type { Artist } from '../types/artist';
import { useLanguage } from '../contexts/LanguageContext';

interface ArtistSectionProps {
  artist: Artist;
  index: number;
  onVisible: (slug: string) => void;
}

export function ArtistSection({ artist, index, onVisible }: ArtistSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasReported = useRef(false);
  const { lang } = useLanguage();

  const isDark = index % 2 === 1;
  const bgColor = isDark ? '#0a0a0a' : '#f4f4f0';
  const textColor = isDark ? '#f4f4f0' : '#1a1a1a';
  const mutedColor = isDark ? 'rgba(244, 244, 240, 0.45)' : 'rgba(26, 26, 26, 0.45)';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasReported.current) {
          hasReported.current = true;
          onVisible(artist.slug);
        }
      },
      { threshold: 0.15, rootMargin: '-80px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [artist.slug, onVisible]);

  const description = lang === 'zh' ? artist.descriptionZh : artist.description;

  return (
    <section
      ref={sectionRef}
      id={`artist-${artist.slug}`}
      className="w-full"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '960px', paddingLeft: '6vw', paddingRight: '6vw' }}>
        {/* Artist Name - bilingual display */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 500,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          {artist.name}
        </h2>

        {/* Chinese name */}
        {artist.nameZh && artist.nameZh !== artist.name && (
          <p
            className="mt-2"
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              fontWeight: 400,
              color: isDark ? 'rgba(244, 244, 240, 0.55)' : 'rgba(26, 26, 26, 0.5)',
              letterSpacing: '0.05em',
            }}
          >
            {artist.nameZh}
          </p>
        )}

        {/* Divider line */}
        <div
          className="mt-6 mb-8"
          style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#d4af7a',
          }}
        />

        {/* Location & Birth */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: mutedColor,
            lineHeight: 1.8,
            maxWidth: '700px',
          }}
        >
          {artist.location}
        </p>

        {/* Description */}
        <div className="mt-10">
          <DescriptionText description={description} isDark={isDark} />
        </div>

        {/* Image */}
        {artist.image && (
          <div className="mt-16">
            <img
              src={artist.image}
              alt={`${artist.name} — artwork`}
              className="w-full"
              style={{ maxWidth: '600px', display: 'block' }}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function DescriptionText({ description, isDark }: { description: string; isDark: boolean }) {
  const paragraphs = description.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="space-y-5" style={{ maxWidth: '720px' }}>
      {paragraphs.map((para, i) => {
        const dashMatch = para.match(/^\s*—(.+)$/);
        if (dashMatch) {
          return (
            <p
              key={i}
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontSize: '15px',
                fontWeight: 500,
                fontStyle: 'italic',
                color: isDark ? 'rgba(244, 244, 240, 0.55)' : 'rgba(26, 26, 26, 0.5)',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}
            >
              —{dashMatch[1].trim()}
            </p>
          );
        }

        return (
          <p
            key={i}
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: 'clamp(15px, 1.15vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.75,
              letterSpacing: '0.01em',
              color: isDark ? 'rgba(244, 244, 240, 0.78)' : 'rgba(26, 26, 26, 0.78)',
            }}
          >
            {para.trim()}
          </p>
        );
      })}
    </div>
  );
}
