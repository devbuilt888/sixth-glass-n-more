export function LogoMark({ className = '', size = 72 }) {
  return (
    <img
      className={`logo-mark ${className}`}
      src="/images/logo-mark.png"
      alt=""
      width={size}
      height={size}
      decoding="async"
      style={{ width: size, height: size }}
    />
  );
}

export function LogoWordmark({ light = false, compact = false }) {
  return (
    <div className={`logo-wordmark ${light ? 'logo-wordmark--light' : ''} ${compact ? 'logo-wordmark--compact' : ''}`}>
      <LogoMark size={compact ? 44 : 96} />
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
      <LogoMark size={40} />
      <span className="logo-horizontal__divider" aria-hidden="true" />
      <div>
        <p className="logo-horizontal__brand">The Sixth Glass</p>
        <p className="logo-horizontal__tag">Private Wine Experiences</p>
      </div>
    </div>
  );
}
