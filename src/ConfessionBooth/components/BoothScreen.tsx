import StainedGlass from './StainedGlass';
import CandleFlame from './CandleFlame';
import BrassGrille from './BrassGrille';
import Chip from './Chip';
import MetaStrip from './MetaStrip';
import { t } from '../i18n';

interface Props {
  weekCount: number;
  onEnter: () => void;
  onWall: () => void;
}

export default function BoothScreen({ weekCount, onEnter, onWall }: Props) {
  return (
    <div className="cb-booth">
      <MetaStrip>{t('meta_line')}</MetaStrip>

      <div className="cb-booth__glass-wrap">
        <StainedGlass width={260} height={330} />
        <div className="cb-booth__candle cb-booth__candle--left">
          <CandleFlame width={28} height={66} />
        </div>
        <div className="cb-booth__candle cb-booth__candle--right">
          <CandleFlame width={28} height={66} />
        </div>
      </div>

      <h1 className="cb-booth__hero">
        <span className="cb-booth__hero-a">{t('booth_hero_a')}</span>
        <span className="cb-booth__hero-b">{t('booth_hero_b')}</span>
      </h1>

      <p className="cb-booth__sub">{t('booth_sub')}</p>

      <div className="cb-booth__grille-wrap" aria-hidden>
        <BrassGrille width={300} height={84} density={0.95} fill="dark" />
        <div className="cb-booth__grille-veil" />
      </div>

      <div className="cb-booth__actions">
        <Chip variant="primary" onClick={onEnter} fullWidth>
          {t('booth_enter')} →
        </Chip>
        <Chip variant="secondary" onClick={onWall} fullWidth>
          {t('booth_wall')}
        </Chip>
      </div>

      <div className="cb-booth__count">{t('booth_count', { n: weekCount.toLocaleString() })}</div>
    </div>
  );
}
