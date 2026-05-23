import type { ReactNode } from 'react';

// Two-tier button system in the confessional aesthetic:
//   primary   — warm cream tablet with carved serif label + brass studs
//   secondary — dark walnut tablet with brass nameplate
//   ghost     — text-only, gold underline accent

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function Chip({ variant = 'primary', onClick, disabled, children, fullWidth, className }: Props) {
  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        if (!disabled && onClick) onClick();
      }}
      disabled={disabled}
      className={`cb-chip cb-chip--${variant} ${fullWidth ? 'cb-chip--full' : ''} ${className ?? ''}`}
    >
      {/* Brass studs at 4 corners */}
      <span className="cb-chip__stud cb-chip__stud--tl" />
      <span className="cb-chip__stud cb-chip__stud--tr" />
      <span className="cb-chip__stud cb-chip__stud--bl" />
      <span className="cb-chip__stud cb-chip__stud--br" />
      <span className="cb-chip__label">{children}</span>
    </button>
  );
}
