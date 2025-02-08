import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      <header className="hero-section">
        <h1>{t('welcomeToSystem')}</h1>
        <p>{t('systemDescription')}</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button">
            {t('register')}
          </Link>
          <Link to="/login" className="cta-button">
            {t('login')}
          </Link>
        </div>
      </header>

      <section className="features-section">
        <h2>{t('features')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>{t('feature1Title')}</h3>
            <p>{t('feature1Description')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('feature2Title')}</h3>
            <p>{t('feature2Description')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('feature3Title')}</h3>
            <p>{t('feature3Description')}</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>{t('testimonials')}</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>{t('testimonial1')}</p>
            <span>- {t('testimonial1Author')}</span>
          </div>
          <div className="testimonial-card">
            <p>{t('testimonial2')}</p>
            <span>- {t('testimonial2Author')}</span>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}
