import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import Reveal from '../components/Reveal';
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

export default function Next() {
  return (
    <main className="next-page">
      <section className="next-hero">
        <div className="container next-hero__inner">
          <div className="reveal">
            <LogoMark size={64} />
          </div>
          <p className="eyebrow reveal reveal-delay-1">You were there</p>
          <h1 className="reveal reveal-delay-1">Enjoyed your Sixth Glass?</h1>
          <p className="next-hero__lead reveal reveal-delay-2">
            A little something special is waiting for you.
          </p>
          <hr className="hairline reveal reveal-delay-2" />
          <p className="next-hero__sub reveal reveal-delay-3">
            Where should your next six glasses take you?
          </p>
        </div>
      </section>

      <section className="section section--ivory next-guest" id="host-your-own">
        <div className="container next-split">
          <Reveal>
            <p className="eyebrow">For the guest</p>
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
            <a
              className="btn btn--copper"
              href="mailto:hello@thesixthglass.com?subject=Host%20my%20own%20Sixth%20Glass%20%7C%20MY6THGLASS&body=Hi%20Miguel%2C%0A%0AI%20was%20a%20guest%20at%20a%20Sixth%20Glass%20experience%20and%20would%20like%20to%20host%20my%20own.%0A%0ACode%3A%20MY6THGLASS%0A"
            >
              Host your own evening
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section--wine next-host" id="returning-host">
        <div className="container">
          <Reveal>
            <p className="eyebrow">For the original host</p>
            <h2 className="section-title">You&apos;ve hosted The Sixth Glass.</h2>
            <p className="section-lead">Now choose your next journey.</p>
            <p className="next-host__upgrade">
              Returning hosts receive something special on their next experience—a premium sixth
              wine, a thoughtful pairing, or another upgrade that feels like hospitality, not a
              coupon.
            </p>
          </Reveal>

          <div className="next-journeys">
            {journeys.map((j, i) => (
              <Reveal
                as="article"
                key={j.title}
                className="next-journeys__item"
                delay={i * 80}
              >
                <span className="next-journeys__label">{j.label}</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
                <a
                  className="next-journeys__link"
                  href={`mailto:hello@thesixthglass.com?subject=Next%20journey%3A%20${encodeURIComponent(j.title)}`}
                >
                  Inquire about this journey
                </a>
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
              <a href="#host-your-own" className="btn btn--copper">
                Host an Experience
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
