/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { type Language, getLanguages } from '../api/api';
import i18n, { languageStorageKey, type TranslationKey } from '../i18n';

const fallbackLanguages: Language[] = [
  { code: 'ro', name: 'Romana', isDefault: true, isActive: true },
  { code: 'en', name: 'English', isDefault: false, isActive: true },
  { code: 'ru', name: 'Russian', isDefault: false, isActive: true },
];

type LanguageContextValue = {
  languages: Language[];
  languageCode: string;
  setLanguageCode: (code: string) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return 'ro';
  }

  return window.localStorage.getItem(languageStorageKey) || 'ro';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [languages, setLanguages] = useState<Language[]>(fallbackLanguages);
  const [languageCode, setLanguageCodeState] = useState(readStoredLanguage);

  useEffect(() => {
    let isMounted = true;

    const loadLanguages = async () => {
      try {
        const response = await getLanguages();
        if (!isMounted || response.length === 0) {
          return;
        }

        setLanguages(response);
        const currentLanguage = readStoredLanguage();
        if (!response.some((language) => language.code === currentLanguage)) {
          const fallbackCode = response.find((language) => language.isDefault)?.code ?? response[0].code;
          setLanguageCodeState(fallbackCode);
          window.localStorage.setItem(languageStorageKey, fallbackCode);
          void i18n.changeLanguage(fallbackCode);
        }
      } catch {
        setLanguages(fallbackLanguages);
      }
    };

    void loadLanguages();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLanguageCode = useCallback((code: string) => {
    setLanguageCodeState(code);
    window.localStorage.setItem(languageStorageKey, code);
    document.documentElement.lang = code;
    void i18n.changeLanguage(code);
  }, []);

  useEffect(() => {
    document.documentElement.lang = languageCode;
  }, [languageCode]);

  const value = useMemo(
    () => ({
      languages,
      languageCode,
      setLanguageCode,
      t: (key: TranslationKey) => i18n.t(key),
    }),
    [languages, languageCode, setLanguageCode],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider.');
  }

  return value;
}
