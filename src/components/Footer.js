import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <LogoMark size={48} />
          <p className="site-footer__name">The Sixth Glass</p>
          <p className="site-footer__motto">
            Good wine <span>|</span> Better company <span>|</span> Brighter conversations
          </p>
        </div>

        <div className="site-footer__cols">
          <div>
            <p className="site-footer__label">Explore</p>
            <a href="/#experiences">Experiences</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#about">About Miguel</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div>
            <p className="site-footer__label">After your evening</p>
            <Link to="/next">Your next six glasses</Link>
            <a href="/#host">Host an Experience</a>
          </div>
          <div>
            <p className="site-footer__label">Contact</p>
            <a href="mailto:hello@thesixthglass.com">hello@thesixthglass.com</a>
            <p className="site-footer__note">Central Florida · English &amp; Spanish</p>
          </div>
        </div>
      </div>

      <div className="site-footer__legal container">
        <p>
          Wine is purchased separately by the host. The Sixth Glass provides private educational
          and entertainment services and does not sell alcoholic beverages.
        </p>
        <p>© {new Date().getFullYear()} The Sixth Glass</p>
      </div>
    </footer>
  );
}
