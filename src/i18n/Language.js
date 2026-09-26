import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries } from './copy';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'sixth-glass-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    copy: dictionaries[lang],
    locale: lang === 'es' ? 'es-ES' : 'en-US',
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
