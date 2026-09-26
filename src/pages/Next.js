import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import Reveal from '../components/Reveal';
import InquireForm from '../components/InquireForm';
import { useLanguage } from '../i18n/Language';
import { EXPERIENCES } from '../i18n/copy';
import './Next.css';

function valueFor(id) {
  return EXPERIENCES.find((item) => item.id === id)?.value || EXPERIENCES[0].value;
}

function mailtoFor({ role, experience }) {
  const subject = encodeURIComponent(`Sixth Glass inquiry — ${role} — ${experience || 'next experience'}`);
  const body = encodeURIComponent(
    `Hello Miguel,\n\nI'd like to inquire about a Sixth Glass evening.\n\nRole: ${role}\nExperience: ${experience || ''}\n`
  );
  return `mailto:hello@thesixthglass.com?subject=${subject}&body=${body}`;
}

export default function Next() {
  const { copy } = useLanguage();
  const t = copy.next;
  const [params] = useSearchParams();
  const roleParam = params.get('role');
  const sourceParam = params.get('src');
  const isHost = roleParam === 'host' || sourceParam === 'host-card';
  const isGuest = !isHost && (roleParam === 'guest' || sourceParam === 'card');
  const role = isHost ? 'host' : isGuest ? 'guest' : 'visitor';
  const source = sourceParam || (isHost ? 'host-card' : isGuest ? 'card' : 'direct');

  const [experience, setExperience] = useState(valueFor(isHost ? 'spain' : 'signature'));

  useEffect(() => {
    setExperience(valueFor(isHost ? 'spain' : 'signature'));
  }, [isHost]);

  const mailtoHref = useMemo(
    () => mailtoFor({ role, experience }),
    [role, experience]
  );

  const selectJourney = (id) => {
    setExperience(valueFor(id));
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
            {isHost ? t.hostedEyebrow : t.guestEyebrow}
          </p>
          <h1 className="reveal reveal-delay-1">
            {isHost ? t.hostedTitle : t.guestTitle}
          </h1>
          <p className="next-hero__lead reveal reveal-delay-2">
            {isHost ? t.hostedLead : t.guestLead}
          </p>
          <hr className="hairline reveal reveal-delay-2" />
          <p className="next-hero__sub reveal reveal-delay-3">
            {isHost ? t.hostedSub : t.guestSub}
          </p>
        </div>
      </section>

      {!isHost && (
        <section className="section section--ivory next-guest" id="host-your-own">
          <div className="container next-split">
            <Reveal>
              <p className="eyebrow">{isGuest ? t.fromCard : t.forGuest}</p>
              <h2 className="section-title">{t.turnTitle}</h2>
              <p className="section-lead">{t.turnLead}</p>
            </Reveal>
            <Reveal className="next-offer" delay={120}>
              <p>{t.turnBody}</p>
              <div className="next-code">
                <p className="next-code__label">{t.code}</p>
                <p className="next-code__value">MY6THGLASS</p>
                <p className="next-code__note">{t.codeNote}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className={`section ${isHost ? 'section--wine' : 'section--ivory'} next-request`} id="request">
        <div className="container next-request__inner">
          <Reveal>
            <p className="eyebrow">{isHost ? t.hostEyebrow : t.requestEyebrow}</p>
            <h2 className="section-title">{isHost ? t.hostTitle : t.requestTitle}</h2>
            <p className="section-lead">{isHost ? t.hostLead : t.requestLead}</p>
          </Reveal>
          <Reveal delay={100}>
            <InquireForm
              source={source}
              role={role}
              page="/next"
              experience={experience}
              onExperienceChange={setExperience}
              tone={isHost ? 'dark' : 'light'}
              submitLabel={isHost ? t.hostSubmit : t.guestSubmit}
              mailtoHref={mailtoHref}
            />
          </Reveal>
        </div>
      </section>

      <section className={`section ${isHost ? 'section--ivory' : 'section--wine'} next-host`} id="returning-host">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{isHost ? t.choose : t.further}</p>
            <h2 className="section-title">{isHost ? t.chooseTitle : t.furtherTitle}</h2>
            {!isGuest && <p className="next-host__upgrade">{t.upgrade}</p>}
          </Reveal>

          <div className="next-journeys">
            {copy.journeys.map((j, i) => {
              const selected = experience === valueFor(j.id);
              return (
                <Reveal
                  as="article"
                  key={j.id}
                  className={`next-journeys__item ${selected ? 'is-selected' : ''}`}
                  delay={i * 80}
                >
                  <span className="next-journeys__label">{j.label}</span>
                  <h3>{j.title}</h3>
                  <p>{j.body}</p>
                  <button
                    type="button"
                    className="next-journeys__link"
                    onClick={() => selectJourney(j.id)}
                  >
                    {selected ? t.selected : t.requestJourney}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--charcoal next-close">
        <div className="container next-close__inner">
          <Reveal>
            <p className="next-close__line">{t.line}</p>
            <p className="next-close__brand">The Sixth Glass</p>
            <div className="next-close__actions">
              <a href="#request" className="btn btn--copper">
                {isHost ? t.requestCta : t.hostCta}
              </a>
              <Link to="/" className="btn btn--outline">
                {t.back}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
