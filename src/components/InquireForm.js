import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LogoMark } from './Logo';
import './InquireForm.css';

export const FORM_ENDPOINT = 'https://formspree.io/f/mzezvydr';

export const EXPERIENCES = [
  'The Signature Sixth Glass',
  'Spain in Six Glasses',
  'Italy in Six Glasses',
  'The Sparkling Night',
  'The Red Night',
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function isoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIso(value) {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a, b) {
  return a && b && isoDate(a) === isoDate(b);
}

function monthLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function buildDays(cursor) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
}

function DateField({ value, onChange, tone }) {
  const [open, setOpen] = useState(false);
  const selected = parseIso(value);
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(() => selected || today);
  const rootRef = useRef(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const days = useMemo(() => buildDays(cursor), [cursor]);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const atMinMonth = cursor.getFullYear() === monthStart.getFullYear() && cursor.getMonth() === monthStart.getMonth();

  const shiftMonth = (amount) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  return (
    <div className={`date-field ${tone === 'dark' ? 'date-field--dark' : ''}`} ref={rootRef}>
      <span className="inquire__label" id={labelId}>Preferred date</span>
      <button
        type="button"
        className="date-field__trigger"
        aria-labelledby={labelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected ? '' : 'date-field__placeholder'}>
          {selected
            ? selected.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
            : 'Choose an evening'}
        </span>
      </button>
      <input type="hidden" name="preferred_date" value={value} />

      {open && (
        <div className="date-field__panel" role="dialog" aria-label="Choose a date">
          <div className="date-field__nav">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={atMinMonth} aria-label="Previous month">
              ‹
            </button>
            <p>{monthLabel(cursor)}</p>
            <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="date-field__week" aria-hidden="true">
            {WEEKDAYS.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
          <div className="date-field__grid" role="grid" aria-label={monthLabel(cursor)}>
            {days.map((day) => {
              const outside = day.getMonth() !== cursor.getMonth();
              const disabled = day < today;
              const isSelected = sameDay(day, selected);
              const isToday = sameDay(day, today);
              return (
                <button
                  type="button"
                  key={isoDate(day)}
                  role="gridcell"
                  disabled={disabled}
                  aria-pressed={isSelected}
                  aria-label={day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  className={[
                    'date-field__day',
                    outside ? 'is-outside' : '',
                    isSelected ? 'is-selected' : '',
                    isToday ? 'is-today' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    onChange(isoDate(day));
                    setOpen(false);
                  }}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InquireForm({
  source,
  role,
  page,
  experience,
  onExperienceChange,
  tone = 'light',
  submitLabel = 'Request this evening',
  mailtoHref,
  showMailto = true,
}) {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sentRef = useRef(null);

  const subject = `Sixth Glass inquiry — ${role} — ${experience || 'unspecified'}`;

  useEffect(() => {
    if (status !== 'sent') return;
    sentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  async function onSubmit(event) {
    event.preventDefault();
    if (!date) {
      setError('Choose an evening to continue.');
      return;
    }
    setError('');
    setStatus('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });
      if (!response.ok) throw new Error('Formspree rejected the request');
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError('The request didn’t send. Email us directly and we’ll take it from there.');
    }
  }

  if (status === 'sent') {
    const when = parseIso(date);
    const whenLabel = when
      ? when.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      : '';

    return (
      <div
        className={`inquire inquire--sent ${tone === 'dark' ? 'inquire--dark' : ''}`}
        role="status"
        ref={sentRef}
        tabIndex={-1}
      >
        <LogoMark size={72} />
        <p className="inquire__sent-kicker">Request received</p>
        <p className="inquire__thanks">Your evening is requested.</p>
        <hr className="hairline hairline--center" />
        <p className="inquire__sent-body">
          Miguel will write to you shortly to confirm the date, the venue, and the wines.
        </p>
        {(experience || whenLabel) && (
          <p className="inquire__sent-meta">
            {experience}
            {experience && whenLabel ? ' · ' : ''}
            {whenLabel}
          </p>
        )}
      </div>
    );
  }

  return (
    <form className={`inquire ${tone === 'dark' ? 'inquire--dark' : ''}`} onSubmit={onSubmit} noValidate={false}>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="page" value={page} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <div className="inquire__row">
        <label className="inquire__field">
          <span className="inquire__label">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
        </label>
        <label className="inquire__field">
          <span className="inquire__label">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </label>
      </div>

      <label className="inquire__field">
        <span className="inquire__label">Address</span>
        <input
          name="address"
          type="text"
          required
          autoComplete="street-address"
          placeholder="Home or private venue"
        />
      </label>

      <div className="inquire__row">
        <label className="inquire__field">
          <span className="inquire__label">Experience</span>
          <select
            name="experience"
            value={experience}
            onChange={(event) => onExperienceChange(event.target.value)}
            required
          >
            <option value="" disabled>Select an experience</option>
            {EXPERIENCES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="inquire__field">
          <span className="inquire__label">Guests</span>
          <input name="guests" type="number" min="1" max="20" inputMode="numeric" placeholder="10–12 is ideal" />
        </label>
      </div>

      <DateField value={date} onChange={setDate} tone={tone} />
      {!date && error && <p className="inquire__error">{error}</p>}

      <label className="inquire__field">
        <span className="inquire__label">Note <span>optional</span></span>
        <textarea name="message" rows="3" placeholder="Occasion, language, anything we should know" />
      </label>

      {error && date && <p className="inquire__error">{error}</p>}

      <div className="inquire__actions">
        <button className="btn btn--copper" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : submitLabel}
        </button>
        {showMailto && (
          <a className="inquire__mailto" href={mailtoHref}>
            Prefer to email directly
          </a>
        )}
      </div>
    </form>
  );
}
