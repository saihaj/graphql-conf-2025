// Very simple in-memory rate limiter (extra credit). Not production-ready.
export type RateKey = string; // e.g., user:${id} or ip:${ip}

const WINDOW_MS = 60_000; // 1 minute
const LIMIT = 60; // 60 mutations/minute

const hits: Map<RateKey, { count: number; resetAt: number }> = new Map();

export function checkRateLimit(key: RateKey) {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || now > rec.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true } as const;
  }
  if (rec.count >= LIMIT) {
    return { ok: false, resetAt: rec.resetAt } as const;
  }
  rec.count += 1;
  return { ok: true } as const;
}
