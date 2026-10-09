import type { Accent } from './projects';

export const principles = [
  {
    id: 'build',
    title: 'Build',
    body: 'An idea is worth nothing until it compiles, runs, and does the thing. Every project here exists as running code, not a proposal.',
  },
  {
    id: 'secure',
    title: 'Secure',
    body: 'Security is a property of the architecture, not a layer added at the end. Deny-by-default storage and encrypted metadata are decisions made on day one or not at all.',
  },
  {
    id: 'attack',
    title: 'Attack',
    body: 'You cannot defend a system you have never tried to break. CTF rooms, OWASP Top 10 analysis and custom IDS rules are how the defensive instincts get calibrated.',
  },
  {
    id: 'explain',
    title: 'Explain',
    body: 'A verdict without an explanation is not evidence. Systems that decide things about people should show their reasoning and say when they are unsure.',
  },
  {
    id: 'disprove',
    title: 'Disprove',
    body: 'The fastest route to a root cause is designing the experiment that kills your favourite hypothesis. Five disproved theories are documented in the BeastQuest repository for exactly this reason.',
  },
];

export interface JourneyEntry {
  id: string;
  category: 'Education' | 'Research' | 'Security' | 'Engineering' | 'Robotics' | 'Hardware' | 'Patents' | 'Experience';
  title: string;
  /** Only dates stated on the résumé. Omitted where none exists. */
  period?: string;
  body: string;
  accent: Accent;
  links?: { label: string; href: string }[];
}

/** Reverse chronological where a date exists; undated entries follow. */
export const journey: JourneyEntry[] = [
  {
    id: 'ideathon',
    category: 'Patents',
    period: '2025 – present',
    title: 'Published patent — Dynasty',
    body: 'Won first place at the Culturix Ideathon Yantra 2026 at VIT Vellore, filed an invention disclosure with the VIT IPR & TT Cell under faculty mentorship, and carried it through to publication as "Blockchain-based system for cultural artifact provenance verification and digital marketplace integration". Filed 29 May 2026, published 5 June 2026 (IN 202641067215 A1).',
    accent: 'violet',
    links: [{ label: 'Dynasty', href: 'https://github.com/vignettedias/Dynasty' }],
  },
  {
    id: 'mmaifa-patent',
    category: 'Patents',
    period: '2025 – 2026',
    title: 'Published patent — Multi-Modal Image Authenticity Verification System',
    body: 'Co-invented a published patent covering the detection of AI-generated imagery through multi-modal machine-learning analysis, with supervised classification over fused feature streams. Application no. 202641010474.',
    accent: 'cyan',
    links: [{ label: 'AI-MMAIFA', href: 'https://github.com/vignettedias/AI-MMAIFA' }],
  },
  {
    id: 'internship',
    category: 'Experience',
    period: 'May – Jul 2026',
    title: 'Cyber Security Intern — VIT-AP University',
    body: 'Three months on-site at Amaravati, Andhra Pradesh, on Android security, full-stack engineering and cloud deployment. Engineered and hardened SourceForm end to end: hybrid Firebase/OAuth authentication with backend token verification, defense-in-depth controls, and deployment on Google Cloud Run with Firestore and Firebase Storage under scoped cloud IAM identities. Validated it adversarially — expired tokens, cross-user access, tampered files, direct storage access, signed-URL expiry and disguised uploads.',
    accent: 'lime',
  },
  {
    id: 'snort',
    category: 'Security',
    period: 'Sept 2025',
    title: 'Network Intrusion Detection System',
    body: 'Configured SNORT for real-time traffic monitoring at VIT Vellore, developed custom detection rules for port scans, enumeration sweeps and brute-force attempts, and analysed the resulting alerts to triage suspicious network activity.',
    accent: 'lime',
  },
  {
    id: 'ctf',
    category: 'Security',
    period: 'Ongoing',
    title: 'CTF practice and offensive security testing',
    body: 'Reconnaissance, enumeration, vulnerability analysis, exploitation and privilege escalation in CTF and lab environments using Kali Linux, Nmap, Wireshark and Metasploit. Completed the TryHackMe Pre Security learning path in August 2026.',
    accent: 'cyan',
    links: [{ label: 'tryhackme.com/p/dasvighnesh', href: 'https://tryhackme.com/p/dasvighnesh' }],
  },
  {
    id: 'helo',
    category: 'Security',
    title: 'End-to-end encrypted messaging',
    body: 'Helo: X3DH session establishment, the Double Ratchet and AES-256-GCM, written as a normative Python reference first and a Flutter client second. 98 protocol tests, 22 relay tests and a claims register that maps every security property to the test that demonstrates it — and lists what is not claimed.',
    accent: 'lime',
    links: [{ label: 'Helo_E2E', href: 'https://github.com/vignettedias/Helo_E2E' }],
  },
  {
    id: 'crypto',
    category: 'Security',
    title: 'Cryptographic engineering',
    body: 'A Fernet-compatible engine built on Node’s native crypto primitives, then transformed into a Dockerised REST microservice with authentication, tests and CI/CD.',
    accent: 'lime',
    links: [{ label: 'Fernet-REST-Service', href: 'https://github.com/vignettedias/Fernet-REST-Service' }],
  },
  {
    id: 'secure-apps',
    category: 'Security',
    title: 'Secure application architecture',
    body: 'SourceForm on Android with hybrid authentication, SHA-256 integrity verification, encrypted metadata and audit logging — then SecureDocs, self-hosting the identity layer behind NGINX with Authentik, PostgreSQL and Redis.',
    accent: 'lime',
    links: [
      { label: 'SourceFormApp-VD', href: 'https://github.com/vignettedias/SourceFormApp-VD' },
      { label: 'securedocs-platform-VD', href: 'https://github.com/vignettedias/securedocs-platform-VD' },
    ],
  },
  {
    id: 'reverse',
    category: 'Engineering',
    title: 'Reverse engineering and preservation',
    body: 'Root-caused a rendering fault in a delisted Unity Android title down to a camera depth tie, after building and disproving five earlier hypotheses, and verified it on hardware. Then brought a 2012 game that crashed on launch back to Android 14–16 with eight bytecode patches and a 22-step acceptance test — gameplay untouched.',
    accent: 'magenta',
    links: [
      { label: 'BeastQuest-Patch', href: 'https://github.com/vignettedias/BeastQuest-Patch' },
      { label: 'ILoveFortConquer', href: 'https://github.com/vignettedias/ILoveFortConquer' },
    ],
  },
  {
    id: 'robotics',
    category: 'Robotics',
    title: 'ROS 2 and simulation',
    body: 'Topics, services and actions implemented against one domain in ROS 2 Humble, alongside a URDF differential-drive robot simulated in Gazebo.',
    accent: 'violet',
    links: [
      { label: 'mission-control-ros2', href: 'https://github.com/vignettedias/mission-control-ros2' },
      { label: 'simple-diffbot-gazebo', href: 'https://github.com/vignettedias/simple-diffbot-gazebo' },
    ],
  },
  {
    id: 'hardware',
    category: 'Hardware',
    period: 'Oct 2024',
    title: 'Digital logic and RTL',
    body: 'A modular 4-bit ALU in Verilog HDL supporting ADD, SUB, AND, OR, XOR and NOT, built on a carry look-ahead adder and validated by simulation testbench across all 4096 opcode and operand combinations.',
    accent: 'magenta',
    links: [{ label: 'ALU-6-Functions', href: 'https://github.com/vignettedias/ALU-6-Functions' }],
  },
  {
    id: 'education',
    category: 'Education',
    period: 'Jul 2024 – Aug 2028',
    title: 'B.Tech — Computer Science & Engineering (Cyber Security)',
    body: 'Vellore Institute of Technology, Vellore. CGPA 8.91. Coursework in computer networks, cyber security fundamentals, machine learning, digital systems design, data structures and algorithms, and microprocessors.',
    accent: 'cyan',
  },
];
