const DAY = 24 * 60 * 60 * 1000;

/** "today", "yesterday", "5 days ago", "3 weeks ago", "2 months ago". */
export function relativeTime(iso: string, now = Date.now()): string {
  const days = Math.floor((now - new Date(iso).getTime()) / DAY);
  if (Number.isNaN(days)) return '';
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

/** True when an ISO date falls within the last `days` days. */
export function isRecent(iso: string | undefined, days: number, now = Date.now()): boolean {
  if (!iso) return false;
  const age = now - new Date(iso).getTime();
  return age >= 0 && age < days * DAY;
}
