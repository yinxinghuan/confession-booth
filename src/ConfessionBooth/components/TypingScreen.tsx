import { useEffect, useRef, useState } from 'react';
import StainedGlass from './StainedGlass';
import BrassGrille from './BrassGrille';
import Chip from './Chip';
import MetaStrip from './MetaStrip';
import CandleFlame from './CandleFlame';
import { t } from '../i18n';

const MAX = 280;

interface Props {
  onSubmit: (text: string) => void;
  onBack: () => void;
}

export default function TypingScreen({ onSubmit, onBack }: Props) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showError, setShowError] = useState('');

  useEffect(() => {
    // Auto-focus shortly after mount so keyboard rises on mobile without
    // fighting iOS scroll-to-input on Vite HMR.
    const id = setTimeout(() => textareaRef.current?.focus(), 300);
    return () => clearTimeout(id);
  }, []);

  const submit = () => {
    const trimmed = text.trim();
    if (trimmed.length < 6) {
      setShowError(t('error_short'));
      return;
    }
    if (trimmed.length > MAX) {
      setShowError(t('error_long'));
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <div className="cb-typing">
      <MetaStrip>{t('meta_call')}</MetaStrip>

      <div className="cb-typing__glass-strip">
        <StainedGlass variant="top-strip" width={300} height={120} />
        <div className="cb-typing__candle">
          <CandleFlame width={26} height={56} noStick />
        </div>
      </div>

      <p className="cb-typing__hint">{t('typing_hint')}</p>

      <div className="cb-typing__well">
        <div className="cb-typing__grille-band" aria-hidden>
          <BrassGrille width="100%" height="100%" density={0.95} />
        </div>
        <textarea
          ref={textareaRef}
          className="cb-typing__input"
          placeholder={t('typing_placeholder')}
          maxLength={MAX + 20}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (showError) setShowError('');
          }}
        />
        <div className="cb-typing__well-meta">
          <span className={`cb-typing__chars ${text.length > MAX ? 'cb-typing__chars--over' : ''}`}>
            {t('typing_chars', { n: text.length })}
          </span>
        </div>
      </div>

      {showError && <p className="cb-typing__error">{showError}</p>}

      <div className="cb-typing__actions">
        <Chip variant="ghost" onClick={onBack}>
          {t('typing_back')}
        </Chip>
        <Chip variant="primary" onClick={submit} disabled={text.trim().length < 6}>
          {t('typing_send')} →
        </Chip>
      </div>
    </div>
  );
}
