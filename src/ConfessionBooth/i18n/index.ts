type Locale = 'zh' | 'en';

function detectLocale(): Locale {
  const override = (typeof localStorage !== 'undefined' && localStorage.getItem('game_locale')) || '';
  if (override === 'en' || override === 'zh') return override;
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

const STRINGS = {
  en: {
    meta_line: 'ALTERU CONFESSIONAL · LINE 7 · OPERATOR ON DUTY',
    meta_call: 'CALL CONNECTED · OPERATOR LISTENING',
    meta_receipt: 'ABSOLUTION RECEIPT',
    meta_wall: 'WALL OF (MOSTLY) FORGIVEN',
    booth_hero_a: 'STEP',
    booth_hero_b: 'INSIDE',
    booth_sub: 'Confess. Be (mostly) absolved.',
    booth_count: '{n} SOULS PROCESSED THIS WEEK',
    booth_enter: 'ENTER THE BOOTH',
    booth_wall: 'BROWSE THE WALL',
    booth_dial: 'DIAL 1-800-CONFESS',
    typing_placeholder: 'Forgive me, Father, for I have…',
    typing_hint: 'Whisper your sin into the grille.',
    typing_send: 'SEND CONFESSION',
    typing_send_short: 'TRANSMIT',
    typing_chars: '{n}/280',
    typing_back: '← LEAVE BOOTH',
    processing_ringing: 'Ringing…',
    processing_hold: 'Please hold. Your sin is important to us.',
    processing_connected: 'Operator returning from break.',
    processing_crossref: 'Cross-referencing absolution database.',
    processing_stamping: 'Stamping verdict.',
    abs_your: 'YOUR CONFESSION',
    abs_reply: 'OPERATOR ON LINE',
    abs_penance: 'PENANCE',
    abs_ticket: 'TICKET',
    abs_duration: 'CALL TIME',
    abs_another: 'ANOTHER',
    abs_wall: 'WALL',
    wall_hero: 'WALL OF',
    wall_hero_b: '(mostly) forgiven',
    wall_back: '← BACK',
    wall_empty: 'No confessions yet. Be the first.',
    wall_pray: 'CONFESS NOW',
    wall_anon: 'anonymous',
    error_short: 'Try writing a few more words.',
    error_long: 'Confession too long. Trim it.',
    error_call: 'The operator dropped the call. Try again.',
  },
  zh: {
    meta_line: 'AlterU 忏悔室 · 7 号线 · 接线员值守',
    meta_call: '通话已接通 · 接线员聆听中',
    meta_receipt: '赦免收据',
    meta_wall: '（大致上）已被赦免之墙',
    booth_hero_a: '请进',
    booth_hero_b: '隔间',
    booth_sub: '忏悔。被（基本上）赦免。',
    booth_count: '本周已处理 {n} 颗灵魂',
    booth_enter: '进入隔间',
    booth_wall: '浏览忏悔之墙',
    booth_dial: '拨打 1-800-CONFESS',
    typing_placeholder: '神父请原谅，我犯下了……',
    typing_hint: '把你的罪低声送进格栅。',
    typing_send: '提交忏悔',
    typing_send_short: '发送',
    typing_chars: '{n}/280',
    typing_back: '← 离开隔间',
    processing_ringing: '振铃中……',
    processing_hold: '请稍候。你的罪对我们很重要。',
    processing_connected: '接线员休息回来了。',
    processing_crossref: '正在交叉检索赦免数据库。',
    processing_stamping: '盖戳判决。',
    abs_your: '你的忏悔',
    abs_reply: '接线员回话',
    abs_penance: '苦行',
    abs_ticket: '工单号',
    abs_duration: '通话时长',
    abs_another: '再来一次',
    abs_wall: '看墙',
    wall_hero: '已被',
    wall_hero_b: '（大致）赦免',
    wall_back: '← 返回',
    wall_empty: '还没有忏悔。来做第一个。',
    wall_pray: '现在忏悔',
    wall_anon: '匿名',
    error_short: '再多写几个字试试。',
    error_long: '太长了，剪短一点。',
    error_call: '接线员把电话挂了。再拨一次。',
  },
} as const;

type Key = keyof typeof STRINGS['en'];

let LOCALE: Locale = detectLocale();

export function t(key: Key, vars?: { n?: number | string }): string {
  const base = STRINGS[LOCALE][key] ?? STRINGS.en[key] ?? key;
  if (!vars) return base;
  return base.replace(/\{(\w+)\}/g, (_, k) => String(vars[k as 'n'] ?? ''));
}

export function getLocale(): Locale {
  return LOCALE;
}

export function setLocale(loc: Locale): void {
  LOCALE = loc;
  if (typeof localStorage !== 'undefined') localStorage.setItem('game_locale', loc);
}
