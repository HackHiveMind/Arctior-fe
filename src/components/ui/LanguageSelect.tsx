import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const shortLabels: Record<string, string> = {
  ro: 'RO',
  en: 'EN',
  ru: 'RU',
};

type LanguageSelectProps = {
  compact?: boolean;
};

const LanguageSelect: React.FC<LanguageSelectProps> = ({ compact = false }) => {
  const { languages, languageCode, setLanguageCode, t } = useLanguage();

  return (
    <label className="flex items-center gap-2 rounded-lg border border-ark-gold/30 bg-black/20 px-3 py-2 text-ark-gold">
      {!compact && <Languages size={16} aria-hidden="true" />}
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={languageCode}
        onChange={(event) => setLanguageCode(event.target.value)}
        className="bg-transparent text-xs font-semibold uppercase tracking-[0.16em] text-ark-gold outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} className="bg-ark-purple text-white">
            {compact ? shortLabels[language.code] ?? language.code.toUpperCase() : language.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelect;
