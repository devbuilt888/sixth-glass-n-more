export function LogoMark({ className = '', size = 72 }) {
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
        <linearGradient id="copperGrad" x1="10" y1="5" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8D0B8" />
          <stop offset="35%" stopColor="#C9A287" />
          <stop offset="70%" stopColor="#A67C5D" />
          <stop offset="100%" stopColor="#C9A287" />
        </linearGradient>
        <linearGradient id="wineFill" x1="35" y1="45" x2="65" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B2A3A" />
          <stop offset="100%" stopColor="#452032" />
        </linearGradient>
      </defs>
      {/* Glass bowl / 6 loop */}
      <path
        d="M52 8 C78 8 88 28 82 48 C76 68 58 72 50 72 C42 72 24 68 18 48 C12 28 26 8 52 8 Z"
        stroke="url(#copperGrad)"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Wine in bowl */}
      <path
        d="M28 48 C32 62 40 68 50 68 C60 68 68 62 72 48 C68 52 60 54 50 54 C40 54 32 52 28 48 Z"
        fill="url(#wineFill)"
        opacity="0.95"
      />
      {/* Upper curve of 6 */}
      <path
        d="M52 8 C70 8 82 18 84 32"
        stroke="url(#copperGrad)"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stem */}
      <path
        d="M50 72 L50 96"
        stroke="url(#copperGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Base */}
      <path
        d="M34 104 C38 98 44 96 50 96 C56 96 62 98 66 104"
        stroke="url(#copperGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M32 106 H68"
        stroke="url(#copperGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWordmark({ light = false, compact = false }) {
  return (
    <div className={`logo-wordmark ${light ? 'logo-wordmark--light' : ''} ${compact ? 'logo-wordmark--compact' : ''}`}>
      <LogoMark size={compact ? 40 : 64} />
      <div className="logo-wordmark__text">
        <p className="logo-wordmark__brand">
          <span className="logo-wordmark__the">The</span> Sixth Glass
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
      <LogoMark size={36} />
      <span className="logo-horizontal__divider" aria-hidden="true" />
      <div>
        <p className="logo-horizontal__brand">The Sixth Glass</p>
        <p className="logo-horizontal__tag">Private Wine Experiences</p>
      </div>
    </div>
  );
}
