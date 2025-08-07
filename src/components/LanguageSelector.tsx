import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const getToggleText = () => {
    return i18n.language === 'zh' ? t('common.switchToEnglish') : t('common.switchToChinese');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors whitespace-nowrap ${className}`}
    >
      <span className="text-base">{i18n.language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
      <span>{getToggleText()}</span>
    </button>
  );
};
