import type { Accent } from '../data/projects';

/** Maps an accent name to the CSS class that sets `--accent`. */
export const accentClass = (accent: Accent): string => `accent-${accent}`;

export const accentHex: Record<Accent, string> = {
  cyan: '#3ae7ff',
  lime: '#5df2a8',
  violet: '#9b7bff',
  magenta: '#ff5ccd',
};
