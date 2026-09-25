import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoWordmark } from '../components/Logo';
import Reveal from '../components/Reveal';
import InquireForm from '../components/InquireForm';
import './Home.css';

const glasses = [
  {
    n: 'One',
    title: 'It begins with bubbles.',
    q: 'Why does sparkling wine feel so alive?',
    body: 'We start with freshness, bubbles and acidity—and learn the first secret of tasting wine.',
  },
  {
    n: 'Two',
    title: 'Discover freshness.',
    q: 'What makes your mouth water?',
    body: "You'll experience acidity rather than simply hearing someone explain it.",
  },
  {
    n: 'Three',
    title: 'What did the winemaker do?',
    q: 'Oak. Texture. Body.',
    body: 'Two wines can come from similar grapes and taste completely different because of the choices people make.',
  },
  {
    n: 'Four',
    title: 'Red changes everything.',
    q: 'Fruit. Skins. Color. Tannin.',
    body: "You'll discover why red wine is red—and what people actually mean when they talk about tannin.",
  },
  {
    n: 'Five',
    title: 'Now put it together.',
    q: 'Fruit. Acidity. Tannin. Alcohol. Body.',
    body: 'This is where we discover one of the most important ideas in wine: Balance.',
  },
  {
    n: 'Six',
    title: "You'll have to wait.",
    q: 'Every Sixth Glass experience ends with one final wine.',
    body: "You won't know what it is. You'll taste it first. You'll decide what you think. And only then will you discover the story behind The Sixth Glass.",
    mystery: true,
  },
];

const steps = [
  {
    n: '01',
    title: 'You invite the people.',
    body: 'Choose your group and the evening.',
  },
  {
    n: '02',
    title: 'We design the six wines.',
    body: "You'll receive the wine selection and purchasing instructions in advance. The host purchases the wines directly.",
  },
  {
    n: '03',
    title: 'I come to you.',
    body: "I'll guide the complete 90-minute experience in your home or private venue.",
  },
  {
    n: '04',
    title: 'You pour. Taste. Discover. Laugh.',
    body: 'And somewhere along the way, wine becomes a lot less complicated.',
  },
  {
    n: '05',
    title: 'Then comes the sixth glass.',
    body: 'That part stays a surprise.',
  },
];

const faqs = [
  {
    q: 'Do we need to know about wine?',
    a: 'Not at all. The experience was specifically designed to be enjoyable whether you know almost nothing about wine or already love it.',
  },
  {
    q: 'Do you provide the wine?',
    a: "No. You'll receive a carefully designed wine list before the experience and purchase the wines directly. That also means the wine belongs to you—and anything left after the tasting stays with you.",
  },
  {
    q: 'How much wine will we drink?',
    a: 'Six wines are tasted in small tasting portions throughout the approximately 90-minute experience.',
  },
  {
    q: "What if someone doesn't like a particular wine?",
    a: 'Perfect. Not liking a wine can be just as interesting as loving one. There are no correct answers here.',
  },
  {
    q: 'Is this a formal wine class?',
    a: "Definitely not. You'll learn quite a bit, but that's almost a side effect. The objective is to create a memorable evening with your friends.",
  },
  {
    q: 'Can you come to vacation homes or private rentals?',
    a: "Yes, subject to the property's rules and location.",
  },
  {
    q: 'Can you create experiences for corporate or private events?',
    a: "Yes. Contact us and we'll discuss the group and occasion.",
  },
];

const journeys = [
  {
    label: 'Spain',
    title: 'Spain in Six Glasses',
    body: 'From Atlantic freshness to Mediterranean warmth. Six wines, six places, one country.',
  },
  {
    label: 'Italy',
    title: 'Italy in Six Glasses',
    body: "Six wines through one of the world's most wonderfully complicated wine countries.",
  },
  {
    label: 'Sparkling',
    title: 'The Sparkling Night',
    body: 'Not everything that bubbles is Champagne. Six sparkling wines and some surprises.',
  },
  {
    label: 'Red',
    title: 'The Red Night',
    body: 'From elegant Pinot Noir to powerful Cabernet—and everything structure, tannin and body can teach us along the way.',
  },
];

export default function Home() {
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
          <div className="reveal">
            <LogoWordmark light />
          </div>
          <p className="hero__line reveal reveal-delay-1">
            Six wines. 90 minutes. Your home. Your friends.
            <br />
            And wait for the sixth glass.
          </p>
          <div className="hero__cta reveal reveal-delay-2">
            <a href="#host" className="btn btn--copper">
              Host The Sixth Glass
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
            <p className="eyebrow">The invitation</p>
            <h2 className="section-title">This isn&apos;t a wine class.</h2>
            <hr className="hairline" />
            <p className="section-lead">
              It&apos;s an evening with friends that happens to make you better at wine.
            </p>
          </Reveal>
          <Reveal className="intro__copy" delay={120}>
            <p>
              The Sixth Glass is a private, interactive wine experience brought to your home.
            </p>
            <p>
              Over 90 minutes, we&apos;ll taste six carefully selected wines, discover why they
              taste the way they do, challenge a few things you thought you knew about wine—and
              probably laugh quite a bit along the way.
            </p>
            <ul className="intro__nos">
              <li>No lectures.</li>
              <li>No intimidating wine language.</li>
              <li>No experience required.</li>
            </ul>
            <p className="intro__close">
              Just good wine, good people and a different way to spend an evening together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--wine journey" id="journey">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The tasting</p>
            <h2 className="section-title">Six glasses. One journey.</h2>
          </Reveal>
          <div className="journey__grid">
            {glasses.map((g, i) => (
              <Reveal
                key={g.n}
                as="article"
                delay={i * 70}
                className={`journey__card ${g.mystery ? 'journey__card--mystery' : ''}`}
              >
                <p className="journey__n">Glass {g.n}</p>
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
            <p className="eyebrow">What you take home</p>
            <h2 className="section-title">You don&apos;t need to know anything about wine.</h2>
            <p className="section-lead">Actually, that&apos;s part of the fun.</p>
            <hr className="hairline" />
            <p>
              You won&apos;t be asked to memorize grape varieties, regions or complicated
              terminology. Instead, we&apos;ll use simple ideas you can remember the next time
              you open a bottle.
            </p>
          </Reveal>
          <Reveal className="learn__ritual" delay={100} aria-label="Tasting ritual">
            {['Look', 'Smell', 'Taste', 'Decide'].map((step, i) => (
              <div key={step} className="learn__step" style={{ '--i': i }}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </Reveal>
          <Reveal as="ul" className="learn__ideas" delay={160}>
            <li>Why acidity makes your mouth water</li>
            <li>Why tannin makes it feel dry</li>
            <li>How grape skins transform wine</li>
            <li>What oak actually does</li>
            <li>How to think about body</li>
            <li>Why an expensive wine isn&apos;t necessarily the wine you&apos;ll enjoy most</li>
          </Reveal>
          <Reveal as="p" className="learn__truth" delay={220}>
            Because quality and preference aren&apos;t the same thing.
          </Reveal>
        </div>
      </section>

      <section className="section section--rosewood gathering">
        <div className="container gathering__inner">
          <Reveal>
            <p className="eyebrow">The setting</p>
            <h2 className="section-title">Your home. Your people.</h2>
            <p className="section-lead">
              Invite the friends. Set the table. We&apos;ll bring the experience.
            </p>
            <hr className="hairline" />
            <p className="gathering__intro">
              The Sixth Glass is designed for intimate groups where everyone can participate, talk,
              taste and have fun together.
            </p>
            <dl className="gathering__facts">
              <div>
                <dt>Ideal group</dt>
                <dd>8–16 guests</dd>
              </div>
              <div>
                <dt>Sweet spot</dt>
                <dd>10–12 guests</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>~90 minutes</dd>
              </div>
              <div>
                <dt>Wines</dt>
                <dd>Six</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Your home or private venue</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>English or Spanish</dd>
              </div>
            </dl>
            <p className="gathering__es">
              La experiencia completa está disponible en ambos idiomas.
            </p>
            <p className="gathering__occasions">
              Perfect for dinner parties, birthdays, couples&apos; nights, celebrations—or simply
              an excuse to get your favorite people around the same table.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory about" id="about">
        <div className="container about__grid">
          <Reveal className="about__portrait" aria-hidden="true">
            <div className="about__frame">
              <div className="about__orb" />
              <p className="about__initials">MB</p>
              <p className="about__caption">Host · Guide · Storyteller</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Meet your host</p>
            <h2 className="section-title">Miguel A. Beas</h2>
            <hr className="hairline" />
            <div className="about__copy">
              <p>
                I was born in southeastern Spain, a region surrounded by vineyards, generations of
                winemaking and some of the country&apos;s distinctive Denominations of Origin.
              </p>
              <p>
                Wine was always part of the landscape—but what fascinated me wasn&apos;t simply
                drinking it. It was discovering why one wine could taste completely different from
                another, and how grape, place, people and time could all end up inside a single
                glass.
              </p>
              <p>
                That curiosity eventually became a passion for studying wine, tasting it,
                traveling through wine regions and, most importantly, sharing what I&apos;ve
                learned with other people.
              </p>
              <p className="about__emphasis">
                But The Sixth Glass isn&apos;t about showing you how much I know. It&apos;s about
                helping you discover how much you can taste.
              </p>
              <p>
                For 90 minutes, I&apos;ll be part host, part storyteller and part guide. I&apos;ll
                ask questions. We&apos;ll experiment. We&apos;ll disagree about wines. We&apos;ll
                laugh. And hopefully, by the end of the evening, you&apos;ll never taste wine
                quite the same way again.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--wine how" id="how-it-works">
        <div className="container">
          <Reveal>
            <p className="eyebrow">The evening, simply</p>
            <h2 className="section-title">How it works</h2>
          </Reveal>
          <ol className="how__list">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80}>
                <span className="how__n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivory experiences" id="experiences">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Start here</p>
            <h2 className="section-title">The Experience</h2>
            <p className="section-lead">New to The Sixth Glass? Begin with the Signature.</p>
          </Reveal>

          <Reveal as="article" className="signature" id="host" delay={100}>
            <div className="signature__badge">Flagship</div>
            <h3>The Sixth Glass — Signature Private Experience</h3>
            <ul className="signature__list">
              <li>Six wines</li>
              <li>Approximately 90 minutes</li>
              <li>Interactive guided tasting</li>
              <li>Wine experiments and demonstrations</li>
              <li>Tasting materials</li>
              <li>A mystery sixth wine and finale</li>
              <li>Designed for up to 10 guests</li>
            </ul>
            <p className="signature__meta">
              Experiences now being scheduled in Central Florida.
              <br />
              Available in English or Spanish.
            </p>
            <div className="signature__actions">
              <button
                type="button"
                className="btn btn--copper"
                aria-expanded={formOpen}
                aria-controls="host-form"
                onClick={() => setFormOpen((open) => !open)}
              >
                Inquire about an experience
              </button>
              <a
                className="btn btn--outline-wine"
                href="mailto:hello@thesixthglass.com?subject=Inquire%20about%20a%20Sixth%20Glass%20experience"
              >
                Email directly
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
                  submitLabel="Send request"
                  mailtoHref="mailto:hello@thesixthglass.com?subject=Inquire%20about%20a%20Sixth%20Glass%20experience"
                  showMailto={false}
                />
              </div>
            )}
            <p className="signature__legal">
              Wine is purchased separately by the host. The Sixth Glass provides private
              educational and entertainment services and does not sell alcoholic beverages.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--charcoal next-teaser">
        <div className="container">
          <Reveal>
            <p className="eyebrow">After the Signature</p>
            <h2 className="section-title">You&apos;ve had The Sixth Glass. What&apos;s next?</h2>
            <p className="section-lead">
              Where should your next six glasses take you?
            </p>
          </Reveal>
          <div className="next-teaser__grid">
            {journeys.map((j, i) => (
              <Reveal
                as="article"
                key={j.title}
                className="next-teaser__item"
                delay={i * 80}
              >
                <span className="next-teaser__label">{j.label}</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="next-teaser__more">More experiences coming…</p>
            <Link to="/next" className="btn btn--outline">
              Explore what comes next
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory faq" id="faq">
        <div className="container faq__inner">
          <Reveal>
            <p className="eyebrow">Before you host</p>
            <h2 className="section-title">Frequently asked questions</h2>
          </Reveal>
          <Reveal className="faq__list" delay={100}>
            {faqs.map((item) => (
              <details key={item.q} className="faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--wine closing">
        <div className="container closing__inner">
          <Reveal>
            <p className="eyebrow">One last question</p>
            <h2 className="section-title">What happens at the sixth glass?</h2>
            <p className="closing__answer">There&apos;s only one way to find out.</p>
            <hr className="hairline hairline--center" />
            <p className="closing__tag">
              Six wines. 90 minutes. Your home. Your friends.
            </p>
            <p className="closing__brand">The Sixth Glass</p>
            <p className="closing__verbs">Taste. Discover. Laugh. Connect.</p>
            <a href="#host" className="btn btn--copper">
              Host The Sixth Glass
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
