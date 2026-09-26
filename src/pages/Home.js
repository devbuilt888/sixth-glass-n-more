import { useState } from 'react';
import { LogoMark } from '../components/Logo';
import Reveal from '../components/Reveal';
import InquireForm from '../components/InquireForm';
import FramePhoto from '../components/FramePhoto';
import { useLanguage } from '../i18n/Language';
import './Home.css';

export default function Home() {
  const { copy } = useLanguage();
  const [experience, setExperience] = useState('The Signature Sixth Glass');
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main className="home">
      <section className="hero" aria-label="The Sixth Glass">
        <div className="hero__media" aria-hidden="true">
          <img src="/images/hero-table.png" alt="" />
          <div className="hero__glow" />
          <div className="hero__veil" />
        </div>
        <div className="hero__content container">
          <div className="hero__mark reveal">
            <LogoMark size={118} />
          </div>
          <p className="hero__line reveal reveal-delay-1">
            {copy.hero.line1}
            <br />
            {copy.hero.line2}
          </p>
          <p className="hero__region reveal reveal-delay-2">{copy.hero.region}</p>
          <div className="hero__cta reveal reveal-delay-3">
            <a href="#experiences" className="btn btn--copper">
              {copy.hero.cta}
            </a>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="section section--ivory intro">
        <div className="container intro__grid">
          <Reveal>
            <p className="eyebrow">{copy.intro.eyebrow}</p>
            <h2 className="section-title">{copy.intro.title}</h2>
            <hr className="hairline" />
            <p className="section-lead">{copy.intro.lead}</p>
          </Reveal>
          <div className="intro__aside">
            <FramePhoto src="/images/moment-pour.jpg" alt={copy.photos.pour} tone="ivory" ratio="landscape" />
            <Reveal className="intro__copy" delay={120}>
              <p>{copy.intro.p1}</p>
              <p>{copy.intro.p2}</p>
              <ul className="intro__nos">
                {copy.intro.nos.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="intro__close">{copy.intro.close}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--wine journey" id="journey">
        <div className="container">
          <div className="journey__head">
            <Reveal>
              <p className="eyebrow">{copy.journey.eyebrow}</p>
              <h2 className="section-title">{copy.journey.title}</h2>
            </Reveal>
            <FramePhoto src="/images/moment-toast.jpg" alt={copy.photos.toast} tone="wine" ratio="portrait" />
          </div>
          <div className="journey__grid">
            {copy.journey.items.map((g, i) => (
              <Reveal
                key={g.n}
                as="article"
                delay={i * 70}
                className={`journey__card ${g.mystery ? 'journey__card--mystery' : ''}`}
              >
                <p className="journey__n">{copy.journey.glass} {g.n}</p>
                <h3>{g.title}</h3>
                <p className="journey__q">{g.q}</p>
                <p>{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory learn">
        <div className="container learn__grid">
          <Reveal>
            <p className="eyebrow">{copy.learn.eyebrow}</p>
            <h2 className="section-title">{copy.learn.title}</h2>
            <p className="section-lead">{copy.learn.lead}</p>
            <hr className="hairline" />
            <p>{copy.learn.body}</p>
          </Reveal>
          <div className="learn__aside">
            <FramePhoto src="/images/moment-taste.jpg" alt={copy.photos.taste} tone="ivory" ratio="portrait" />
            <Reveal className="learn__ritual" delay={100} aria-label={copy.learn.ritualLabel}>
              {copy.learn.ritual.map((step, i) => (
                <div key={step} className="learn__step">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal as="ul" className="learn__ideas" delay={160}>
            {copy.learn.ideas.map((idea) => <li key={idea}>{idea}</li>)}
          </Reveal>
          <Reveal as="p" className="learn__truth" delay={220}>
            {copy.learn.truth}
          </Reveal>
        </div>
      </section>

      <section className="section section--rosewood gathering">
        <div className="container gathering__layout">
          <Reveal className="gathering__inner">
            <p className="eyebrow">{copy.gathering.eyebrow}</p>
            <h2 className="section-title">{copy.gathering.title}</h2>
            <p className="section-lead">{copy.gathering.lead}</p>
            <hr className="hairline" />
            <p className="gathering__intro">{copy.gathering.intro}</p>
            <dl className="gathering__facts">
              {copy.gathering.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="gathering__es">{copy.gathering.both}</p>
            <p className="gathering__occasions">{copy.gathering.occasions}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory about" id="about">
        <div className="container about__grid">
          <Reveal className="about__portrait">
            <FramePhoto src="/images/miguel-portrait.jpg" alt={copy.photos.miguel} tone="ivory" ratio="portrait" />
            <p className="about__caption">{copy.about.caption}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h2 className="section-title">{copy.about.name}</h2>
            <hr className="hairline" />
            <div className="about__copy">
              <p>{copy.about.p1}</p>
              <p>{copy.about.p2}</p>
              <p className="about__emphasis">{copy.about.emphasis}</p>
            </div>
          </Reveal>
        </div>
        <div className="container about__aside">
          <FramePhoto src="/images/miguel-table.jpg" alt={copy.photos.miguelTable} tone="ivory" ratio="landscape" />
        </div>
      </section>

      <section className="section section--wine how" id="how-it-works">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{copy.how.eyebrow}</p>
            <h2 className="section-title">{copy.how.title}</h2>
          </Reveal>
          <ol className="how__list">
            {copy.how.steps.map(([n, title, body], i) => (
              <Reveal as="li" key={n} delay={i * 80}>
                <span className="how__n">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory experiences" id="experiences">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{copy.signature.eyebrow}</p>
            <h2 className="section-title">{copy.signature.title}</h2>
            <p className="section-lead">{copy.signature.lead}</p>
          </Reveal>

          <Reveal as="article" className="signature" id="host" delay={100}>
            <div className="signature__badge">{copy.signature.badge}</div>
            <h3>{copy.signature.name}</h3>
            <ul className="signature__list">
              {copy.signature.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="signature__meta">{copy.signature.meta}</p>
            <div className="signature__actions">
              <button
                type="button"
                className="btn btn--copper"
                aria-expanded={formOpen}
                aria-controls="host-form"
                onClick={() => setFormOpen((open) => !open)}
              >
                {copy.signature.inquire}
              </button>
              <a
                className="btn btn--outline-wine"
                href="mailto:hello@thesixthglass.com?subject=Inquire%20about%20a%20Sixth%20Glass%20experience"
              >
                {copy.signature.email}
              </a>
            </div>
            {formOpen && (
              <div id="host-form">
                <InquireForm
                  source="web"
                  role="prospect"
                  page="/"
                  experience={experience}
                  onExperienceChange={setExperience}
                  submitLabel={copy.signature.send}
                  mailtoHref="mailto:hello@thesixthglass.com?subject=Inquire%20about%20a%20Sixth%20Glass%20experience"
                  showMailto={false}
                />
              </div>
            )}
            <p className="signature__legal">{copy.signature.legal}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--charcoal next-teaser">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{copy.nextTeaser.eyebrow}</p>
            <h2 className="section-title">{copy.nextTeaser.title}</h2>
          </Reveal>
          <div className="next-teaser__grid">
            {copy.journeys.map((j, i) => (
              <Reveal as="article" key={j.id} className="next-teaser__item" delay={i * 80}>
                <span className="next-teaser__soon">{copy.nextTeaser.soon}</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="next-teaser__close">{copy.nextTeaser.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory faq" id="faq">
        <div className="container faq__inner">
          <Reveal>
            <p className="eyebrow">{copy.faq.eyebrow}</p>
            <h2 className="section-title">{copy.faq.title}</h2>
          </Reveal>
          <Reveal className="faq__list" delay={100}>
            {copy.faq.items.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--wine closing">
        <div className="container closing__inner">
          <Reveal>
            <p className="eyebrow">{copy.closing.eyebrow}</p>
            <h2 className="section-title">{copy.closing.title}</h2>
            <p className="closing__answer">{copy.closing.answer}</p>
            <hr className="hairline hairline--center" />
            <p className="closing__tag">{copy.closing.tag}</p>
            <p className="closing__brand">The Sixth Glass</p>
            <p className="closing__verbs">{copy.closing.verbs}</p>
            <a href="#experiences" className="btn btn--copper">
              {copy.closing.cta}
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
