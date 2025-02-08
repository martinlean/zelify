import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TranslationCache() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      localStorage.setItem('i18nextLng', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  return null;
}
