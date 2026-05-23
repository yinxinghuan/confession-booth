import { useState } from 'react';
import Stamp from './Stamp';
import Chip from './Chip';
import Receipt from './Receipt';
import MetaStrip from './MetaStrip';
import { t } from '../i18n';
import type { Confession } from '../types';

interface Props {
  entries: Confession[];
  loaded: boolean;
  onBack: () => void;
  onConfess: () => void;
}

export default function WallScreen({ entries, loaded, onBack, onConfess }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="cb-wall">
      <MetaStrip>{t('meta_wall')}</MetaStrip>

      <header className="cb-wall__hero">
        <h1>
          <span className="cb-wall__hero-a">{t('wall_hero')}</span>{' '}
          <span className="cb-wall__hero-b">{t('wall_hero_b')}</span>
        </h1>
      </header>

      {!loaded ? (
        <div className="cb-wall__empty">…</div>
      ) : entries.length === 0 ? (
        <div className="cb-wall__empty">
          <p>{t('wall_empty')}</p>
        </div>
      ) : (
        <ol className="cb-wall__list">
          {entries.map((c, i) => {
            const open = openId === c.id;
            const tilt = ((i % 2 === 0 ? 1 : -1) * (0.4 + (i % 3) * 0.3)).toFixed(2);
            return (
              <li
                key={c.id}
                className={`cb-wall__item ${open ? 'cb-wall__item--open' : ''}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  setOpenId(open ? null : c.id);
                }}
              >
                <Receipt small tilt={parseFloat(tilt)}>
                  <div className="cb-wall__row">
                    <div className="cb-wall__row-body">
                      <p className="cb-wall__sin">&ldquo;{c.sin}&rdquo;</p>
                      <p className="cb-wall__quip">— {c.quip}</p>
                      <p className="cb-wall__anon">{t('wall_anon')} · {c.ticketNumber}</p>
                    </div>
                    <div className="cb-wall__row-stamp">
                      <Stamp verdict={c.verdict} size={64} />
                    </div>
                  </div>
                  {open && (
                    <div className="cb-wall__expand">
                      <hr className="cb-abs__rule" />
                      {c.operatorReply.split('\n').map((line, j) => (
                        <p key={j} className="cb-abs__reply-line cb-wall__expand-line">{line}</p>
                      ))}
                      <p className="cb-wall__expand-penance">
                        <span className="cb-abs__section-label cb-abs__section-label--inline">{t('abs_penance')}</span>{' '}
                        {c.penance}
                      </p>
                    </div>
                  )}
                </Receipt>
              </li>
            );
          })}
        </ol>
      )}

      <div className="cb-wall__actions">
        <Chip variant="secondary" onClick={onBack}>
          {t('wall_back')}
        </Chip>
        <Chip variant="primary" onClick={onConfess} fullWidth>
          {t('wall_pray')} →
        </Chip>
      </div>
    </div>
  );
}
