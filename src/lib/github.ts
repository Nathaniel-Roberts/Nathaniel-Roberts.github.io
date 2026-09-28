// Build-time fetch of the public GitHub contributions calendar. No token needed.
// If GitHub is unreachable the site still builds; the graph section is simply omitted.
export interface Day { date: string; level: number; count: number }
export interface Contributions { days: Day[]; total: number; from: string; to: string }

let cache: Contributions | null | undefined;

export async function getContributions(user: string): Promise<Contributions | null> {
  if (cache !== undefined) return cache;
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, { headers: { 'user-agent': 'nathanielroberts.tech build', accept: 'text/html' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const days: Day[] = [];
    const ids = new Map<string, Day>();
    const attr = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    for (const m of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
      const tag = m[0];
      const date = attr(tag, 'data-date');
      const level = attr(tag, 'data-level');
      const id = attr(tag, 'id');
      if (!date || level === undefined) continue;
      const d = { date, level: Number(level), count: 0 };
      days.push(d);
      if (id) ids.set(id, d);
    }
    if (!days.length) throw new Error('no cells parsed');
    const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
    for (const m of html.matchAll(tipRe)) {
      const d = ids.get(m[1]);
      if (!d) continue;
      const n = m[2].match(/^(\d+) contribution/);
      d.count = n ? Number(n[1]) : 0;
    }
    days.sort((a, b) => a.date.localeCompare(b.date));
    cache = { days, total: days.reduce((s, d) => s + d.count, 0), from: days[0].date, to: days[days.length - 1].date };
  } catch (err) {
    console.warn('[github] contributions unavailable:', (err as Error).message);
    cache = null;
  }
  return cache;
}
