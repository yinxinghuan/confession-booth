import { useEffect, useState } from 'react';
import StainedGlass from './StainedGlass';
import MetaStrip from './MetaStrip';
import { t } from '../i18n';
import type { ProcessingStage } from '../types';

interface Props {
  stage: ProcessingStage | '';
}

const STAGE_KEY: Record<ProcessingStage, string> = {
  ringing: 'processing_ringing',
  hold: 'processing_hold',
  connected: 'processing_connected',
  'cross-ref': 'processing_crossref',
  stamping: 'processing_stamping',
};

const STAGE_ORDER: ProcessingStage[] = ['ringing', 'hold', 'connected', 'cross-ref', 'stamping'];

export default function ProcessingScreen({ stage }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 4), 600);
    return () => clearInterval(id);
  }, []);

  const dots = '·'.repeat(tick + 1) + ' '.repeat(3 - tick);
  const i = stage ? STAGE_ORDER.indexOf(stage) : -1;
  const label = stage ? t(STAGE_KEY[stage] as any) : '';

  return (
    <div className="cb-processing">
      <MetaStrip>{t('meta_call')}</MetaStrip>

      <div className="cb-processing__glass">
        <StainedGlass width={220} height={280} />
      </div>

      <div className="cb-processing__phone" aria-hidden>
        <svg viewBox="0 0 160 140" width={140} height={120}>
          <defs>
            <linearGradient id="cb-phone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d130a" />
              <stop offset="100%" stopColor="#0a0703" />
            </linearGradient>
          </defs>
          {/* Body */}
          <rect x="32" y="58" width="96" height="46" rx="10" fill="url(#cb-phone)" />
          {/* Cradle */}
          <rect x="38" y="62" width="84" height="6" rx="2" fill="#3d2818" />
          {/* Handset */}
          <g className={`cb-processing__handset ${stage === 'ringing' ? 'cb-processing__handset--ring' : ''}`}>
            <path d="M 30 60 Q 28 32 80 28 Q 132 32 130 60 L 122 60 Q 122 38 80 36 Q 38 38 38 60 Z" fill="#1d130a" />
            <circle cx="34" cy="60" r="6" fill="#0a0703" />
            <circle cx="126" cy="60" r="6" fill="#0a0703" />
          </g>
          {/* Sound waves */}
          {stage === 'ringing' && (
            <g className="cb-processing__waves" stroke="#e8a23a" strokeWidth="1.5" fill="none">
              <path d="M 18 50 Q 12 60 18 70" />
              <path d="M 12 44 Q 4 60 12 76" />
              <path d="M 142 50 Q 148 60 142 70" />
              <path d="M 148 44 Q 156 60 148 76" />
            </g>
          )}
          {/* Cord */}
          <path d="M 80 104 Q 96 110 112 112 Q 100 124 90 130" stroke="#3d2818" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="cb-processing__status">
        <p className="cb-processing__label">
          {label}
          <span className="cb-processing__dots">{dots}</span>
        </p>
        <div className="cb-processing__steps">
          {STAGE_ORDER.map((s, idx) => (
            <span
              key={s}
              className={`cb-processing__step ${
                idx < i ? 'cb-processing__step--done' : idx === i ? 'cb-processing__step--now' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <p className="cb-processing__fineprint">1-800-CONFESS · {t('processing_fineprint')}</p>
    </div>
  );
}
