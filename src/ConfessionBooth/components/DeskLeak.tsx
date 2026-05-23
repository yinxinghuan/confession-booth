// What the player sees BEHIND the brass grille — small fragments of the
// operator's call-center desk leaking through the lattice. Composed of:
//   - a faint CRT screensaver glow (sickly green)
//   - the silhouette of a desk lamp + headset cord
//   - a coffee cup with steam
//   - a sticky Post-It with the operator's scribble
//   - a thin slice of a yellow neon "1-800" reflection
//
// Positioned absolutely; consumer wraps with a parent that has overflow
// hidden so leaks only show through the grille area.

interface Props {
  className?: string;
  /** seed for which Post-It text variant. Default 0. */
  noteSeed?: number;
}

const NOTES = [
  'BACK IN 5',
  '☕ refill',
  'CALL #4827\nsounds\ngenuine',
  'tell\nmavis',
  'Karen\n1pm',
  'kid asleep\nno yelling',
];

export default function DeskLeak({ className, noteSeed = 0 }: Props) {
  const note = NOTES[noteSeed % NOTES.length];
  return (
    <div className={`cb-leak ${className ?? ''}`} aria-hidden>
      {/* CRT glow */}
      <div className="cb-leak__crt" />
      {/* Neon sign reflection — angled bright slash near top corner */}
      <div className="cb-leak__neon">
        <span>1-800</span>
      </div>
      {/* Desk lamp silhouette */}
      <svg className="cb-leak__lamp" viewBox="0 0 80 90" aria-hidden>
        <defs>
          <radialGradient id="cb-lamp-glow" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#ffd97a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffd97a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="18" rx="36" ry="22" fill="url(#cb-lamp-glow)" />
        {/* Lampshade */}
        <path d="M 18 22 Q 40 -2 62 22 L 56 36 L 24 36 Z" fill="#1a0f08" />
        {/* Arm */}
        <path d="M 40 36 L 40 70 L 12 86" stroke="#1a0f08" strokeWidth="3" fill="none" />
      </svg>
      {/* Coffee cup */}
      <svg className="cb-leak__cup" viewBox="0 0 60 70" aria-hidden>
        {/* Steam */}
        <g className="cb-leak__steam" stroke="#f3e4c2" strokeWidth="1.4" fill="none" opacity="0.5" strokeLinecap="round">
          <path d="M 18 22 Q 14 14 18 6" />
          <path d="M 30 24 Q 26 16 30 4" />
          <path d="M 42 22 Q 38 14 42 6" />
        </g>
        {/* Cup */}
        <path d="M 12 30 L 16 64 Q 16 68 20 68 L 40 68 Q 44 68 44 64 L 48 30 Z" fill="#1a0f08" />
        {/* Handle */}
        <path d="M 48 38 Q 58 40 56 50 Q 54 56 46 56" stroke="#1a0f08" strokeWidth="3" fill="none" />
      </svg>
      {/* Post-it */}
      <div className="cb-leak__postit">
        {note.split('\n').map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
      {/* Headset cord curling */}
      <svg className="cb-leak__cord" viewBox="0 0 200 80" aria-hidden preserveAspectRatio="none">
        <path
          d="M -10 40 Q 30 12 50 30 Q 70 50 90 28 Q 110 8 130 30 Q 150 52 170 32 Q 190 14 210 32"
          stroke="#0a0703"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
