import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <h1>{t('welcome')}</h1>
      <nav>
        <ul>
          <li>{t('products')}</li>
          <li>{t('cart')}</li>
          <li>{t('checkout')}</li>
        </ul>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
