import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoHorizontal } from './Logo';
import { useLanguage } from '../i18n/Language';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { lang, setLang, copy } = useLanguage();
  const t = copy.nav;

  const links = [
    { to: '/#experiences', label: t.experiences },
    { to: '/#how-it-works', label: t.how },
    { to: '/#about', label: t.about },
    { to: '/#faq', label: t.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className={`site-nav ${scrolled || !isHome ? 'site-nav--solid' : ''} ${scrolled ? 'site-nav--compact' : ''} ${open ? 'site-nav--open' : ''}`}>
      <div className="site-nav__inner container">
        <Link to="/" className="site-nav__brand" aria-label={t.home}>
          <LogoHorizontal light={!scrolled && isHome && !open} />
        </Link>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-label={open ? t.close : t.open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className="site-nav__links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.to} href={link.to} className="site-nav__link">
              {link.label}
            </a>
          ))}
          <div className="lang-toggle" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <span aria-hidden="true">|</span>
            <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
          </div>
          <a href="/#experiences" className="site-nav__cta btn btn--copper">
            {t.host}
          </a>
        </nav>
      </div>
    </header>
  );
}
