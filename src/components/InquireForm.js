import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LogoMark } from './Logo';
import { useLanguage } from '../i18n/Language';
import { EXPERIENCES } from '../i18n/copy';
import './InquireForm.css';

export const FORM_ENDPOINT = 'https://formspree.io/f/mzezvydr';

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

function monthLabel(date, locale) {
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
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

function DateField({ value, onChange, tone, locale, labels }) {
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
  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, 7 + index);
    return day.toLocaleDateString(locale, { weekday: 'narrow' });
  }), [locale]);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const atMinMonth = cursor.getFullYear() === monthStart.getFullYear() && cursor.getMonth() === monthStart.getMonth();

  const shiftMonth = (amount) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  return (
    <div className={`date-field ${tone === 'dark' ? 'date-field--dark' : ''}`} ref={rootRef}>
      <span className="inquire__label" id={labelId}>{labels.date}</span>
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
            ? selected.toLocaleDateString(locale, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
            : labels.datePlaceholder}
        </span>
      </button>
      <input type="hidden" name="preferred_date" value={value} />

      {open && (
        <div className="date-field__panel" role="dialog" aria-label={labels.chooseDate}>
          <div className="date-field__nav">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={atMinMonth} aria-label={labels.prevMonth}>
              ‹
            </button>
            <p>{monthLabel(cursor, locale)}</p>
            <button type="button" onClick={() => shiftMonth(1)} aria-label={labels.nextMonth}>
              ›
            </button>
          </div>
          <div className="date-field__week" aria-hidden="true">
            {weekdays.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
          <div className="date-field__grid" role="grid" aria-label={monthLabel(cursor, locale)}>
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
                  aria-label={day.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
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
  const { copy, locale } = useLanguage();
  const labels = copy.form;

  const subject = `Sixth Glass inquiry — ${role} — ${experience || 'unspecified'}`;

  useEffect(() => {
    if (status !== 'sent') return;
    sentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  async function onSubmit(event) {
    event.preventDefault();
    if (!date) {
      setError(labels.dateError);
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
      setError(labels.sendError);
    }
  }

  if (status === 'sent') {
    const when = parseIso(date);
    const whenLabel = when
      ? when.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })
      : '';

    return (
      <div
        className={`inquire inquire--sent ${tone === 'dark' ? 'inquire--dark' : ''}`}
        role="status"
        ref={sentRef}
        tabIndex={-1}
      >
        <LogoMark size={72} />
        <p className="inquire__sent-kicker">{labels.received}</p>
        <p className="inquire__thanks">{labels.thanks}</p>
        <hr className="hairline hairline--center" />
        <p className="inquire__sent-body">{labels.confirm}</p>
        {(experience || whenLabel) && (
          <p className="inquire__sent-meta">
            {labels.labels[EXPERIENCES.find((item) => item.value === experience)?.id] || experience}
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
          <span className="inquire__label">{labels.name}</span>
          <input name="name" type="text" required autoComplete="name" placeholder={labels.namePlaceholder} />
        </label>
        <label className="inquire__field">
          <span className="inquire__label">{labels.email}</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
        </label>
      </div>

      <label className="inquire__field">
        <span className="inquire__label">{labels.address}</span>
        <input
          name="address"
          type="text"
          required
          autoComplete="street-address"
          placeholder={labels.addressPlaceholder}
        />
      </label>

      <div className="inquire__row">
        <label className="inquire__field">
          <span className="inquire__label">{labels.experience}</span>
          <select
            name="experience"
            value={experience}
            onChange={(event) => onExperienceChange(event.target.value)}
            required
          >
            <option value="" disabled>{labels.experiencePlaceholder}</option>
            {EXPERIENCES.map((item) => (
              <option key={item.id} value={item.value}>{labels.labels[item.id]}</option>
            ))}
          </select>
        </label>
        <label className="inquire__field">
          <span className="inquire__label">{labels.guests}</span>
          <input name="guests" type="number" min="1" max="20" inputMode="numeric" placeholder={labels.guestsPlaceholder} />
        </label>
      </div>

      <DateField value={date} onChange={setDate} tone={tone} locale={locale} labels={labels} />
      {!date && error && <p className="inquire__error">{error}</p>}

      <label className="inquire__field">
        <span className="inquire__label">{labels.note} <span>{labels.optional}</span></span>
        <textarea name="message" rows="3" placeholder={labels.notePlaceholder} />
      </label>

      {error && date && <p className="inquire__error">{error}</p>}

      <div className="inquire__actions">
        <button className="btn btn--copper" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? labels.sending : submitLabel}
        </button>
        {showMailto && (
          <a className="inquire__mailto" href={mailtoHref}>
            {labels.mailto}
          </a>
        )}
      </div>
    </form>
  );
}
