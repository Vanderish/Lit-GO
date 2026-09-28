export default function Logo({
  size = 32,
  className = '',
  showText = false,
  color = 'currentColor',
  textColor = 'inherit',
}) {
  return (
    <div
      className={`litgo-logo-wrapper ${className}`}
      style={{
        /* Lempar nilai props ke CSS Variables */
        '--logo-svg-color': color,
        '--logo-txt-color': textColor,
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(6, Math.round(size * 0.28))}px`,
        lineHeight: 1,
      }}
    >
      <svg
        className="litgo-logo-svg"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, display: 'block' }}
      >
        {/* Left Outer Diamond Wing */}
        <path
          d="M 97 14 L 14 97 L 14 103 L 97 186 L 97 146 L 51 100 L 97 54 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Right Outer Diamond Wing */}
        <path
          d="M 103 14 L 186 97 L 186 103 L 103 186 L 103 146 L 149 100 L 103 54 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Core Top-Left */}
        <path
          d="M 97 66 L 66 97 L 97 97 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Core Top-Right */}
        <path
          d="M 103 66 L 103 97 L 134 97 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Core Bottom-Left */}
        <path
          d="M 97 134 L 66 103 L 97 103 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Core Bottom-Right */}
        <path
          d="M 103 134 L 134 103 L 103 103 Z"
          fill="var(--logo-svg-color)"
        />
        {/* Center Spark Diamond */}
        <polygon
          points="100,94 106,100 100,106 94,100"
          fill="var(--logo-svg-color)"
        />
      </svg>

      {showText && (
        <span
          className="litgo-logo-text"
          style={{
            fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
            fontWeight: 800,
            fontSize: `${Math.round(size * 0.65)}px`,
            letterSpacing: '0.06em',
            color: 'var(--logo-txt-color)',
            textTransform: 'uppercase',
          }}
        >
          LIT-GO
        </span>
      )}
    </div>
  );
}