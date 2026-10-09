/**
 * Single source of truth for identity + contact details.
 *
 * Anything left as `null` is deliberately not rendered anywhere on the site.
 * Fill it in and the corresponding UI appears automatically.
 */

export interface ContactLink {
  label: string;
  href: string | null;
  handle: string | null;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  /** Zero-pad to this many digits ("02"). */
  pad?: number;
  decimals?: number;
  note: string;
}

export const profile = {
  name: 'Vighnesh Das',
  role: 'B.Tech Cyber Security · VIT Vellore',
  disciplines: ['Cyber Security', 'AI / ML', 'Software Engineering'],
  tagline: 'I build secure systems, intelligent applications, and technically ambitious software.',
  statement:
    'Systems that are not only functional, but explainable, secure, and engineered to survive real-world constraints.',
  location: 'Vellore, India',

  bio: [
    'I am a B.Tech Cyber Security student at VIT Vellore, working across offensive security, applied AI, and backend systems. Most of what I build starts from the same question: what happens to this system when something goes wrong — a malformed request, a compromised database, an adversarial image, an unknown generator?',
    'That question is why my projects converge on the same concerns. MMAIFA fuses independent forensic evidence streams and refuses to force certainty when they disagree; it is the subject of a published patent. SourceForm encrypts submission metadata so a database compromise still leaks very little. The Fernet REST Service was written against Node’s native crypto primitives rather than a library, so the tamper detection and TTL validation are mine to reason about. Helo runs X3DH and the Double Ratchet over a relay it treats as hostile, and maps every security claim it makes to a named, passing test.',
    'On the offensive side I work through CTF rooms on TryHackMe and HackTheBox, run OWASP Top 10 analysis with Nmap, Wireshark and Metasploit, and have deployed SNORT with custom rule sets to catch port scans and brute-force attempts. I work down the stack as well as across it — Kotlin on Android, Java when a delisted game needs bringing back, Dart and Flutter for a messaging client, TypeScript and Express behind NGINX, Python for model pipelines, ROS 2 for robotics, and Verilog when the problem is a datapath rather than a service.',
  ],

  stats: [
    // Every figure here is from the résumé or countable on GitHub. The repository
    // count is replaced at runtime by the live figure from the GitHub API.
    { id: 'patents', label: 'Published patents', value: 2, pad: 2, note: 'MMAIFA · Dynasty' },
    { id: 'cgpa', label: 'CGPA', value: 8.91, decimals: 2, note: 'B.Tech Cyber Security' },
    { id: 'repos', label: 'Repositories', value: 13, note: 'github.com/vignettedias' },
  ] as Stat[],

  links: {
    github: { label: 'GitHub', href: 'https://github.com/vignettedias', handle: 'vignettedias' },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vighnesh-das-43760a321',
      handle: 'vighnesh-das',
    },
    tryhackme: {
      label: 'TryHackMe',
      href: 'https://tryhackme.com/p/dasvighnesh',
      handle: 'dasvighnesh',
    },
    email: { label: 'Email', href: 'mailto:dasvighnesh@gmail.com', handle: 'dasvighnesh@gmail.com' },
  } satisfies Record<string, ContactLink>,

  resumePath: '/resume.pdf',

  siteUrl: 'https://vignettedias.github.io/',
};

export interface Credential {
  title: string;
  issuer: string;
  period?: string;
  detail?: string;
}

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering (Cyber Security)',
    institution: 'Vellore Institute of Technology, Vellore',
    period: 'Jul 2024 – Aug 2028',
    detail: 'CGPA 8.91',
    coursework: [
      'Computer Networks',
      'Cyber Security Fundamentals',
      'Machine Learning',
      'Digital Systems Design',
      'Data Structures & Algorithms',
      'Microprocessors & Microcontrollers',
      'Software Engineering',
    ],
  },
  {
    degree: 'Class XII (ICSE) — 95.8%  ·  Class X (ICSE) — 96.7%',
    institution: 'Lakshmi School, Madurai',
    period: '',
    detail: '',
    coursework: [],
  },
];

export const credentials: Credential[] = [
  {
    title: 'Pre Security learning path',
    issuer: 'TryHackMe',
    period: 'Completed 13 Aug 2026',
    detail: '19 h 10 min across networking, Linux, web fundamentals and practical security.',
  },
  {
    title: 'Cyber Security — credential CCC1685',
    issuer: 'PreGrad',
    period: 'Jun – Sep 2025',
  },
  {
    title: 'Culturix Ideathon Yantra 2026 — 1st place',
    issuer: 'VIT Vellore',
    detail: 'Institute-level ideathon; the winning idea became the Dynasty patent.',
  },
];

export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'patents', label: 'Patents' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;
