import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoHorizontal } from './Logo';
import './Nav.css';

const links = [
  { to: '/#experiences', label: 'Experiences' },
  { to: '/#how-it-works', label: 'How It Works' },
  { to: '/#about', label: 'About Miguel' },
  { to: '/#faq', label: 'FAQ' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <header className={`site-nav ${scrolled || !isHome ? 'site-nav--solid' : ''} ${open ? 'site-nav--open' : ''}`}>
      <div className="site-nav__inner container">
        <Link to="/" className="site-nav__brand" aria-label="The Sixth Glass home">
          <LogoHorizontal light={!scrolled && isHome && !open} />
        </Link>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
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
          <a href="/#host" className="site-nav__cta btn btn--copper">
            Host an Experience
          </a>
        </nav>
      </div>
    </header>
  );
}
