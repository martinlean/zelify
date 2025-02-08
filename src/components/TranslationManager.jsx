import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TranslationManager() {
  const { t, i18n } = useTranslation();
  const [translations, setTranslations] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const fetchTranslations = async () => {
      const response = await fetch('/translations');
      const data = await response.json();
      setTranslations(data);
    };
    fetchTranslations();
  }, []);

  const handleAddTranslation = async () => {
    const response = await fetch('/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: newKey,
        value: newValue,
        lng: i18n.language
      })
    });

    if (response.ok) {
      const newTranslation = await response.json();
      setTranslations([...translations, newTranslation]);
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div className="translation-manager">
      <h2>{t('translationManager')}</h2>
      
      <div className="add-translation">
        <input
          type="text"
          placeholder={t('key')}
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          placeholder={t('value')}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={handleAddTranslation}>{t('add')}</button>
      </div>

      <div className="translations-list">
        <h3>{t('existingTranslations')}</h3>
        <table>
          <thead>
            <tr>
              <th>{t('key')}</th>
              <th>{t('value')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(translations[i18n.language] || {}).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
