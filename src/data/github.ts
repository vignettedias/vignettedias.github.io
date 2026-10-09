/**
 * Public repository data for github.com/vignettedias.
 *
 * The site asks the GitHub API for this at runtime, so counts stay current
 * without a redeploy. `snapshot` is what renders before that request returns,
 * and what stays on screen if it fails or is rate-limited — so it is a real
 * listing, last refreshed by hand on the date below, never a guess.
 */

export const githubUser = 'vignettedias';

export interface RepoSummary {
  name: string;
  url: string;
  language: string | null;
  /** ISO timestamp of the latest push (live) or repository update (snapshot). */
  activeAt: string;
  fork: boolean;
}

export const snapshotDate = '2026-10-09';

export const snapshot: RepoSummary[] = [
  { name: 'ILoveFortConquer', language: 'Java', activeAt: '2026-10-08T05:05:10Z' },
  { name: 'Helo_E2E', language: 'Dart', activeAt: '2026-08-20T04:19:00Z' },
  { name: 'vignettedias.github.io', language: 'TypeScript', activeAt: '2026-08-17T18:30:39Z' },
  { name: 'Dynasty', language: 'HTML', activeAt: '2026-08-02T05:29:43Z' },
  { name: 'BeastQuest-Patch', language: 'Python', activeAt: '2026-07-31T18:02:15Z' },
  { name: 'mission-control-ros2', language: 'Python', activeAt: '2026-07-13T18:39:51Z' },
  { name: 'simple-diffbot-gazebo', language: 'CMake', activeAt: '2026-07-13T17:29:14Z' },
  { name: 'securedocs-platform-VD', language: 'TypeScript', activeAt: '2026-06-20T22:42:21Z' },
  { name: 'Fernet-REST-Service', language: 'JavaScript', activeAt: '2026-06-17T18:13:08Z' },
  { name: 'SourceFormApp-VD', language: 'Kotlin', activeAt: '2026-06-04T09:27:36Z' },
  { name: 'AI-MMAIFA', language: 'Python', activeAt: '2026-05-27T10:08:03Z' },
  { name: 'MoodMusicGeneratorRemastered', language: 'C++', activeAt: '2026-03-29T17:29:07Z' },
  { name: 'ALU-6-Functions', language: 'Verilog', activeAt: '2026-03-29T10:26:27Z' },
].map((r) => ({ ...r, url: `https://github.com/${githubUser}/${r.name}`, fork: false }));
