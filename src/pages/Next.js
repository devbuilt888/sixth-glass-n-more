import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import Reveal from '../components/Reveal';
import InquireForm from '../components/InquireForm';
import './Next.css';

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

function mailtoFor({ role, experience }) {
  const subject = encodeURIComponent(`Sixth Glass inquiry — ${role} — ${experience || 'next experience'}`);
  const body = encodeURIComponent(
    `Hello Miguel,\n\nI'd like to inquire about a Sixth Glass evening.\n\nRole: ${role}\nExperience: ${experience || ''}\n`
  );
  return `mailto:hello@thesixthglass.com?subject=${subject}&body=${body}`;
}

export default function Next() {
  const [params] = useSearchParams();
  const roleParam = params.get('role');
  const sourceParam = params.get('src');
  const isHost = roleParam === 'host' || sourceParam === 'host-card';
  const isGuest = !isHost && (roleParam === 'guest' || sourceParam === 'card');
  const role = isHost ? 'host' : isGuest ? 'guest' : 'visitor';
  const source = sourceParam || (isHost ? 'host-card' : isGuest ? 'card' : 'direct');

  const [experience, setExperience] = useState(
    isHost ? 'Spain in Six Glasses' : 'The Signature Sixth Glass'
  );

  useEffect(() => {
    setExperience(isHost ? 'Spain in Six Glasses' : 'The Signature Sixth Glass');
  }, [isHost]);

  const mailtoHref = useMemo(
    () => mailtoFor({ role, experience }),
    [role, experience]
  );

  const selectJourney = (title) => {
    setExperience(title);
    document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="next-page">
      <section className="next-hero">
        <div className="container next-hero__inner">
          <div className="reveal">
            <LogoMark size={64} />
          </div>
          <p className="eyebrow reveal reveal-delay-1">
            {isHost ? 'You hosted' : 'You were there'}
          </p>
          <h1 className="reveal reveal-delay-1">
            {isHost ? 'Where should we travel next?' : 'Enjoyed your Sixth Glass?'}
          </h1>
          <p className="next-hero__lead reveal reveal-delay-2">
            {isHost
              ? 'Returning hosts are welcomed back with something a little more special.'
              : 'A little something special is waiting for you.'}
          </p>
          <hr className="hairline reveal reveal-delay-2" />
          <p className="next-hero__sub reveal reveal-delay-3">
            {isHost
              ? 'Choose your next six glasses.'
              : 'Now it\'s your turn to host.'}
          </p>
        </div>
      </section>

      {!isHost && (
        <section className="section section--ivory next-guest" id="host-your-own">
          <div className="container next-split">
            <Reveal>
              <p className="eyebrow">{isGuest ? 'From your guest card' : 'For the guest'}</p>
              <h2 className="section-title">Now it&apos;s your turn to host.</h2>
              <p className="section-lead">
                You were a guest tonight. Next time, make it your table.
              </p>
            </Reveal>
            <Reveal className="next-offer" delay={120}>
              <p>
                Host your own Signature Sixth Glass experience and receive a welcome gift toward
                your first evening.
              </p>
              <div className="next-code">
                <p className="next-code__label">Use code</p>
                <p className="next-code__value">MY6THGLASS</p>
                <p className="next-code__note">
                  Illustrative offer — final amount confirmed when you inquire.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className={`section ${isHost ? 'section--wine' : 'section--ivory'} next-request`} id="request">
        <div className="container next-request__inner">
          <Reveal>
            <p className="eyebrow">{isHost ? 'Your next journey' : 'Request the evening'}</p>
            <h2 className="section-title">
              {isHost ? 'Tell us where to come next.' : 'Host your own evening.'}
            </h2>
            <p className="section-lead">
              {isHost
                ? 'Pick a journey, a date, and the address. We’ll take it from there.'
                : 'Choose a date and the place. We’ll confirm the wines with you before the night.'}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <InquireForm
              source={source}
              role={role}
              page="/next"
              experience={experience}
              onExperienceChange={setExperience}
              tone={isHost ? 'dark' : 'light'}
              submitLabel={isHost ? 'Request this journey' : 'Host your own evening'}
              mailtoHref={mailtoHref}
            />
          </Reveal>
        </div>
      </section>

      <section className={`section ${isHost ? 'section--ivory' : 'section--wine'} next-host`} id="returning-host">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{isHost ? 'Choose one' : 'Or travel further'}</p>
            <h2 className="section-title">
              {isHost ? 'Six glasses, a new place.' : 'Where should the next six glasses take you?'}
            </h2>
            {!isGuest && (
              <p className="next-host__upgrade">
                Returning hosts receive something special on their next experience—a premium sixth
                wine, a thoughtful pairing, or another upgrade that feels like hospitality, not a
                coupon.
              </p>
            )}
          </Reveal>

          <div className="next-journeys">
            {journeys.map((j, i) => (
              <Reveal
                as="article"
                key={j.title}
                className={`next-journeys__item ${experience === j.title ? 'is-selected' : ''}`}
                delay={i * 80}
              >
                <span className="next-journeys__label">{j.label}</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
                <button
                  type="button"
                  className="next-journeys__link"
                  onClick={() => selectJourney(j.title)}
                >
                  {experience === j.title ? 'Selected' : 'Request this journey'}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--charcoal next-close">
        <div className="container next-close__inner">
          <Reveal>
            <p className="next-close__line">
              Six wines. 90 minutes. Your home. Your friends.
            </p>
            <p className="next-close__brand">The Sixth Glass</p>
            <div className="next-close__actions">
              <a href="#request" className="btn btn--copper">
                {isHost ? 'Request a journey' : 'Host an Experience'}
              </a>
              <Link to="/" className="btn btn--outline">
                Back to the beginning
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
