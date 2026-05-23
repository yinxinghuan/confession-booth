import { useEffect } from 'react';
import Stamp from './Stamp';
import Chip from './Chip';
import Receipt from './Receipt';
import MetaStrip from './MetaStrip';
import CandleFlame from './CandleFlame';
import { t } from '../i18n';
import { playStampThud } from '../utils/audio';
import type { Confession } from '../types';

interface Props {
  confession: Confession;
  onAnother: () => void;
  onWall: () => void;
  /** when true, plays the stamp slam-down (used on first reveal, not on re-mount). */
  slam?: boolean;
}

export default function AbsolutionScreen({ confession, onAnother, onWall, slam }: Props) {
  useEffect(() => {
    if (slam) {
      const id = setTimeout(() => playStampThud(), 240);
      return () => clearTimeout(id);
    }
  }, [slam]);

  return (
    <div className="cb-abs">
      <MetaStrip>{t('meta_receipt')} · {confession.ticketNumber}</MetaStrip>

      <Receipt tilt={-0.6}>
        <header className="cb-abs__head">
          <div className="cb-abs__head-meta">
            <div className="cb-abs__meta-row">
              <span className="cb-abs__meta-key">{t('abs_ticket')}</span>
              <span className="cb-abs__meta-val">{confession.ticketNumber}</span>
            </div>
            <div className="cb-abs__meta-row">
              <span className="cb-abs__meta-key">{t('abs_duration')}</span>
              <span className="cb-abs__meta-val">{confession.callDuration}</span>
            </div>
          </div>
          <div className="cb-abs__candle">
            <CandleFlame width={20} height={48} noStick />
          </div>
        </header>

        <section className="cb-abs__sin">
          <p className="cb-abs__section-label">{t('abs_your')}</p>
          <p className="cb-abs__sin-text">&ldquo;{confession.sin}&rdquo;</p>
        </section>

        <hr className="cb-abs__rule" />

        <section className="cb-abs__reply">
          <p className="cb-abs__section-label">{t('abs_reply')}</p>
          {confession.operatorReply.split('\n').map((line, i) => (
            <p key={i} className="cb-abs__reply-line" style={{ animationDelay: `${i * 0.18 + 0.4}s` }}>
              {line}
            </p>
          ))}
        </section>

        <section className="cb-abs__penance">
          <p className="cb-abs__section-label cb-abs__section-label--inline">{t('abs_penance')}</p>
          <p className="cb-abs__penance-text">{confession.penance}</p>
        </section>

        <div className="cb-abs__stamp">
          <Stamp verdict={confession.verdict} size={130} slam={slam} />
        </div>
      </Receipt>

      <div className="cb-abs__actions">
        <Chip variant="secondary" onClick={onWall}>
          {t('abs_wall')}
        </Chip>
        <Chip variant="primary" onClick={onAnother} fullWidth>
          {t('abs_another')} →
        </Chip>
      </div>
    </div>
  );
}
