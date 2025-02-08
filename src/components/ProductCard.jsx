import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }) {
  const { t } = useTranslation();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{t('price', { value: product.price })}</p>
      <p>{t('date', { value: product.created_at })}</p>
    </div>
  );
}
