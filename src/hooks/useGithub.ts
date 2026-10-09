import { useEffect, useSyncExternalStore } from 'react';
import { githubUser, snapshot, type RepoSummary } from '../data/github';

export interface GithubState {
  repos: RepoSummary[];
  /** `live` once the GitHub API has answered; `snapshot` until then, or for good if it never does. */
  source: 'live' | 'snapshot';
}

const CACHE_KEY = `gh-repos:${githubUser}`;
const CACHE_TTL_MS = 15 * 60 * 1000;
const ENDPOINT = `https://api.github.com/users/${githubUser}/repos?per_page=100&sort=pushed`;

const byRecent = (a: RepoSummary, b: RepoSummary) => b.activeAt.localeCompare(a.activeAt);

let state: GithubState = { repos: [...snapshot].sort(byRecent), source: 'snapshot' };
const listeners = new Set<() => void>();
let requested = false;

function publish(repos: RepoSummary[]) {
  state = { repos: [...repos].sort(byRecent), source: 'live' };
  listeners.forEach((notify) => notify());
}

/** Keeps only well-formed entries; anything unexpected in the response is dropped, not rendered. */
function parse(data: unknown): RepoSummary[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((raw): RepoSummary[] => {
    const r = raw as Record<string, unknown>;
    if (
      typeof r.name !== 'string' ||
      typeof r.html_url !== 'string' ||
      !r.html_url.startsWith('https://github.com/') ||
      typeof r.pushed_at !== 'string'
    ) {
      return [];
    }
    return [
      {
        name: r.name,
        url: r.html_url,
        language: typeof r.language === 'string' ? r.language : null,
        activeAt: r.pushed_at,
        fork: r.fork === true,
      },
    ];
  });
}

function readCache(): RepoSummary[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw) as { at: number; repos: RepoSummary[] };
    return Date.now() - at < CACHE_TTL_MS && Array.isArray(repos) && repos.length > 0 ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos: RepoSummary[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* storage unavailable — the next visit just asks the API again */
  }
}

/** One request per page load (or per 15 minutes per tab), shared by every component. */
function request() {
  if (requested) return;
  requested = true;

  const cached = readCache();
  if (cached) {
    publish(cached);
    return;
  }

  fetch(ENDPOINT, { headers: { Accept: 'application/vnd.github+json' } })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`GitHub API ${res.status}`))))
    .then((data: unknown) => {
      const repos = parse(data);
      if (repos.length === 0) return;
      writeCache(repos);
      publish(repos);
    })
    .catch(() => {
      /* rate-limited or offline: the snapshot stays on screen */
    });
}

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => listeners.delete(notify);
};
const getState = () => state;

export function useGithub(): GithubState {
  useEffect(request, []);
  return useSyncExternalStore(subscribe, getState, getState);
}

export interface LanguageShare {
  language: string;
  repos: string[];
}

/** Repositories grouped by primary language, most-used first. */
export function languageShares(repos: RepoSummary[]): LanguageShare[] {
  const groups = new Map<string, string[]>();
  for (const repo of repos) {
    if (!repo.language) continue;
    groups.set(repo.language, [...(groups.get(repo.language) ?? []), repo.name]);
  }
  return [...groups]
    .map(([language, names]) => ({ language, repos: names }))
    .sort((a, b) => b.repos.length - a.repos.length || a.language.localeCompare(b.language));
}
