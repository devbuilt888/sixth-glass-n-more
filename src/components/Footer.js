import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import { useLanguage } from '../i18n/Language';
import './Footer.css';

export default function Footer() {
  const { copy } = useLanguage();
  const t = copy.footer;

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <LogoMark size={48} />
          <p className="site-footer__name">The Sixth Glass</p>
          <p className="site-footer__motto">{t.motto}</p>
        </div>

        <div className="site-footer__cols">
          <div>
            <p className="site-footer__label">{t.explore}</p>
            <a href="/#experiences">{copy.nav.experiences}</a>
            <a href="/#how-it-works">{copy.nav.how}</a>
            <a href="/#about">{copy.nav.about}</a>
            <a href="/#faq">{copy.nav.faq}</a>
          </div>
          <div>
            <p className="site-footer__label">{t.after}</p>
            <Link to="/next">{t.next}</Link>
            <a href="/#experiences">{t.host}</a>
          </div>
          <div>
            <p className="site-footer__label">{t.contact}</p>
            <a href="mailto:hello@thesixthglass.com">hello@thesixthglass.com</a>
            <p className="site-footer__note">{t.note}</p>
          </div>
        </div>
      </div>

      <div className="site-footer__legal container">
        <p>{t.legal}</p>
        <p>© {new Date().getFullYear()} The Sixth Glass</p>
      </div>
    </footer>
  );
}
