// The brass grille between confessor and operator. Tiled SVG pattern of
// brass diamonds — fills the parent (no fixed dimensions) so it scales
// across the booth-entry preview window and the full-height typing well.

interface Props {
  width?: number | string;
  height?: number | string;
  /** opacity multiplier on the brass diamonds (0–1) */
  density?: number;
  className?: string;
  /** transparent diamonds (default) or filled with dark wood color */
  fill?: 'transparent' | 'dark';
}

export default function BrassGrille({
  width = '100%',
  height = '100%',
  density = 0.9,
  className,
  fill = 'transparent',
}: Props) {
  // The pattern repeats every 44 px (a 22-px diamond grid offset by 22 between
  // rows). preserveAspectRatio is irrelevant here because the pattern tiles in
  // user-space coordinates regardless of viewBox.
  const half = 9.4; // diamond half-width

  return (
    <svg
      className={className}
      width={width}
      height={height}
      preserveAspectRatio="none"
      aria-hidden
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="cb-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8a849" />
          <stop offset="55%" stopColor="#8a6224" />
          <stop offset="100%" stopColor="#5a3e15" />
        </linearGradient>
        <linearGradient id="cb-brass-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce6a3" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#fce6a3" stopOpacity="0" />
          <stop offset="100%" stopColor="#fce6a3" stopOpacity="0" />
        </linearGradient>
        <pattern id="cb-grille-pat" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          {/* primary diamond */}
          <path
            d={`M 11 ${11 - half} L ${11 + half} 11 L 11 ${11 + half} L ${11 - half} 11 Z`}
            fill="url(#cb-brass)"
            stroke="#3a2710"
            strokeWidth="0.5"
            opacity={density}
          />
          <path
            d={`M 11 ${11 - half} L ${11 + half * 0.65} ${11 - half * 0.2} L 11 ${11 - half * 0.55} Z`}
            fill="url(#cb-brass-highlight)"
            opacity={density}
          />
        </pattern>
      </defs>
      {fill === 'dark' && <rect width="100%" height="100%" fill="#1a0f08" />}
      <rect width="100%" height="100%" fill="url(#cb-grille-pat)" />
    </svg>
  );
}
