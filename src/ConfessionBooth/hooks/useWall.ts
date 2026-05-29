// The Wall of (Mostly) Forgiven. Pulls 6 most-recent users' latest save
// rows and yields ALL confessions across them — anonymized, no userId,
// no avatar (per design: complete anonymity).
//
// We throttle at publish (already daily-quota'd), never at display —
// see feedback_throttle_at_input_not_output. Older confessions must
// stay browsable; the older one is often the more interesting one.

import { useCallback, useEffect, useState } from 'react';
import {
  callAigramAPI,
  isInAigram,
  type AigramResponse,
} from '@shared/runtime/bridge';
import { getGameUuid } from '@shared/runtime/game-id';
import type { Confession } from '../types';

interface SaveRow {
  user_id: string;
  time?: string;
  resource_data?: string;
}

export interface ConfessionSave {
  confessions: Confession[];
}

export interface UseWall {
  entries: Confession[]; // anonymized — userId stripped
  loaded: boolean;
  refresh: () => void;
}

export function useWall(): UseWall {
  const [entries, setEntries] = useState<Confession[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [nonce, setNonce] = useState(0);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    const sessionId = getGameUuid();
    if (!isInAigram || !sessionId) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await callAigramAPI<AigramResponse<SaveRow[]>>(
          `/note/aigram/ai/game/get/data/list?session_id=${encodeURIComponent(sessionId)}`,
          'GET',
        );
        const rows = Array.isArray(res?.data) ? res.data : [];
        // Flatten ALL confessions from each user's save row. Older
        // pattern took confessions[0] only, hiding every author's
        // older sins behind their newest. Throttle at publish.
        const parsed: Confession[] = [];
        for (const row of rows) {
          if (!row.resource_data) continue;
          try {
            const save = JSON.parse(row.resource_data) as ConfessionSave;
            for (const c of save.confessions || []) {
              if (c && c.sin && c.operatorReply) parsed.push(c);
            }
          } catch {
            /* skip corrupt row */
          }
        }
        // Newest first across all authors, cap visible count.
        parsed.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        const limited = parsed.slice(0, 24);
        if (cancelled) return;
        setEntries(limited);
      } catch {
        if (!cancelled) setEntries([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return { entries, loaded, refresh };
}
