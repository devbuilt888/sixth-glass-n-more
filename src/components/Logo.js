export function LogoMark({ className = '', size = 72 }) {
  const uid = `logo-${size}`;
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size * 1.15}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-copper`} x1="8" y1="0" x2="92" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D0B8" />
          <stop offset="28%" stopColor="#C9A287" />
          <stop offset="55%" stopColor="#A67C5D" />
          <stop offset="78%" stopColor="#D4B396" />
          <stop offset="100%" stopColor="#C9A287" />
        </linearGradient>
        <linearGradient id={`${uid}-wine`} x1="30" y1="42" x2="70" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B2A3A" />
          <stop offset="55%" stopColor="#452032" />
          <stop offset="100%" stopColor="#2F1522" />
        </linearGradient>
        <radialGradient id={`${uid}-sheen`} cx="38%" cy="32%" r="45%">
          <stop offset="0%" stopColor="#FFF6EC" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C9A287" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M52 7 C78 7 89 28 82.5 48.5 C76 69 58.5 73 50 73 C41.5 73 24 69 17.5 48.5 C11 28 26 7 52 7 Z"
        stroke={`url(#${uid}-copper)`}
        strokeWidth="3.1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.5 49 C32 63 40.5 69.5 50 69.5 C59.5 69.5 68 63 72.5 49 C68 53.5 59.5 55.5 50 55.5 C40.5 55.5 32 53.5 27.5 49 Z"
        fill={`url(#${uid}-wine)`}
      />
      <path
        d="M34 51.5 C40 54 45 54.5 50 54.5 C55 54.5 60 54 66 51.5"
        stroke="#89465B"
        strokeWidth="0.8"
        opacity="0.45"
      />
      <ellipse cx="42" cy="28" rx="10" ry="7" fill={`url(#${uid}-sheen)`} />
      <path
        d="M52 7 C71 7 83 18 85 33"
        stroke={`url(#${uid}-copper)`}
        strokeWidth="3.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50 73 L50 97"
        stroke={`url(#${uid}-copper)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M34 105 C38.5 98.5 44 97 50 97 C56 97 61.5 98.5 66 105"
        stroke={`url(#${uid}-copper)`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M31.5 107 H68.5"
        stroke={`url(#${uid}-copper)`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWordmark({ light = false, compact = false }) {
  return (
    <div className={`logo-wordmark ${light ? 'logo-wordmark--light' : ''} ${compact ? 'logo-wordmark--compact' : ''}`}>
      <LogoMark size={compact ? 40 : 72} />
      <div className="logo-wordmark__text">
        <p className="logo-wordmark__brand">
          <span className="logo-wordmark__the">The</span>
          <span className="logo-wordmark__sixth">Sixth</span>
          <span className="logo-wordmark__glass"> Glass</span>
        </p>
        {!compact && (
          <p className="logo-wordmark__tag">
            <span className="logo-wordmark__rule" />
            Private Wine Experiences
            <span className="logo-wordmark__rule" />
          </p>
        )}
      </div>
    </div>
  );
}

export function LogoHorizontal({ light = false }) {
  return (
    <div className={`logo-horizontal ${light ? 'logo-horizontal--light' : ''}`}>
      <LogoMark size={34} />
      <span className="logo-horizontal__divider" aria-hidden="true" />
      <div>
        <p className="logo-horizontal__brand">The Sixth Glass</p>
        <p className="logo-horizontal__tag">Private Wine Experiences</p>
      </div>
    </div>
  );
}
