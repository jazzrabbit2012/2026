import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  t: (en: string, zh: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  toggleLang: () => {},
  setLang: () => {},
  t: (en: string) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('zh');

  const toggleLang = useCallback(() => {
    setLangState(prev => prev === 'en' ? 'zh' : 'en');
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
  }, []);

  const t = useCallback((en: string, zh: string) => {
    return lang === 'zh' ? zh : en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
