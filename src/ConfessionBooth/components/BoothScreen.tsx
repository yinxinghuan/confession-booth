import StainedGlass from './StainedGlass';
import CandleFlame from './CandleFlame';
import BrassGrille from './BrassGrille';
import DeskLeak from './DeskLeak';
import NeonSign from './NeonSign';
import Chip from './Chip';
import MetaStrip from './MetaStrip';
import { t, getLocale } from '../i18n';

interface Props {
  weekCount: number;
  onEnter: () => void;
  onWall: () => void;
}

// Localized crash-type variants for the hero word + tagline. Kept inline
// rather than in i18n so the visual treatment per language is self-contained.
const CRASH: Record<string, { word: string; tag: string }> = {
  en: { word: 'CONFESS', tag: 'OR JUST KEEP IT IN' },
  zh: { word: '忏悔', tag: '不然就憋着' },
  es: { word: 'CONFIESA', tag: 'O TRÁGATELO' },
  pt: { word: 'CONFESSE', tag: 'OU ENGOLE' },
  ru: { word: 'ИСПОВЕДЬ', tag: 'ИЛИ МОЛЧИ' },
  ja: { word: '告解', tag: 'またはのみ込め' },
  ko: { word: '고백', tag: '아니면 삼켜' },
  fr: { word: 'CONFESSE', tag: 'OU AVALE' },
};

export default function BoothScreen({ weekCount, onEnter, onWall }: Props) {
  const loc = getLocale();
  const crash = CRASH[loc] ?? CRASH.en;
  return (
    <div className="cb-booth-v2">
      <MetaStrip>{t('meta_line')}</MetaStrip>

      {/* The chamber: pointed-arch silhouette spanning most of the viewport.
          Stained-glass transom up top, MASSIVE grille middle, dark interior
          at the bottom. Crash type sits on top of the grille and breaks
          across the lattice. */}
      <div className="cb-chamber">
        {/* Stained-glass transom */}
        <div className="cb-chamber__transom">
          <StainedGlass width={320} height={160} variant="top-strip" />
          <span className="cb-chamber__candle cb-chamber__candle--l">
            <CandleFlame width={20} height={48} noStick />
          </span>
          <span className="cb-chamber__candle cb-chamber__candle--r">
            <CandleFlame width={20} height={48} noStick />
          </span>
          {/* Diagonal light shaft */}
          <span className="cb-chamber__shaft" aria-hidden />
        </div>

        {/* Crash blackletter hero — broken across the screen above the grille */}
        <h1 className="cb-crash">
          <span className="cb-crash__word">{crash.word}</span>
          <span className="cb-crash__rule" aria-hidden />
          <span className="cb-crash__tag">{crash.tag}</span>
        </h1>

        {/* Massive brass grille with desk leak behind */}
        <div className="cb-chamber__grille-well">
          <DeskLeak className="cb-chamber__leak" noteSeed={2} />
          {/* Neon sign sits behind the grille as part of the operator's desk
              reveal (not competing with chip buttons) */}
          <NeonSign className="cb-chamber__neon" />
          <BrassGrille width="100%" height="100%" density={0.96} cell={26} />
          {/* Player-side Post-It pinned ON the grille (foreground) */}
          <span className="cb-chamber__postit cb-chamber__postit--front" aria-hidden>
            BACK
            <br />
            IN 5
          </span>
        </div>

        {/* Dark wood interior strip — buttons sit here */}
        <div className="cb-chamber__floor">
          <div className="cb-booth-v2__actions">
            <Chip variant="primary" onClick={onEnter} fullWidth>
              {t('booth_enter')} →
            </Chip>
            <div className="cb-booth-v2__action-row">
              <Chip variant="secondary" onClick={onWall}>
                {t('booth_wall')}
              </Chip>
              <span className="cb-booth-v2__count">
                <span className="cb-booth-v2__count-num">{weekCount.toLocaleString()}</span>
                <span className="cb-booth-v2__count-tag">/wk</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
