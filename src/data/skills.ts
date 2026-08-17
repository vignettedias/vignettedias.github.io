import type { Accent } from './projects';

export interface SkillGroup {
  id: string;
  name: string;
  accent: Accent;
  /** Short line explaining where these were actually used. */
  context: string;
  skills: { name: string; evidence?: string }[];
}

/**
 * `evidence` names the repository a skill is demonstrated in. Skills without
 * evidence are coursework/lab tooling and are marked as such in the UI legend.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'security',
    name: 'Cyber Security',
    accent: 'cyan',
    context: 'Security treated as architecture — identity, integrity, audit and least-privilege storage.',
    skills: [
      { name: 'Secure architecture', evidence: 'SourceForm · SecureDocs' },
      { name: 'Identity & OIDC', evidence: 'SecureDocs' },
      { name: 'JWT / OAuth flows', evidence: 'SourceForm' },
      { name: 'Integrity verification', evidence: 'SourceForm' },
      { name: 'Audit logging', evidence: 'SourceForm' },
      { name: 'Defense in depth', evidence: 'SourceForm' },
      { name: 'Kali Linux', evidence: 'CTF practice · TryHackMe' },
      { name: 'Nmap', evidence: 'OWASP Top 10 analysis' },
      { name: 'Wireshark', evidence: 'OWASP Top 10 analysis' },
      { name: 'Metasploit', evidence: 'OWASP Top 10 analysis' },
      { name: 'SNORT IDS', evidence: '15+ custom rule sets, VIT' },
      { name: 'OWASP Top 10', evidence: 'PCC2104 assessment' },
      { name: 'Cyber Kill Chain', evidence: 'PCC2104 assessment' },
      { name: 'Vulnerability analysis', evidence: 'TryHackMe · HackTheBox' },
      { name: 'Privilege escalation', evidence: '10+ TryHackMe rooms' },
      { name: 'Network security' },
    ],
  },
  {
    id: 'crypto',
    name: 'Cryptography',
    accent: 'lime',
    context: 'Primitives implemented and tested directly, not consumed through a wrapper.',
    skills: [
      { name: 'Fernet token format', evidence: 'Fernet REST Service' },
      { name: 'AES-128-CBC', evidence: 'Fernet REST Service' },
      { name: 'HMAC-SHA256', evidence: 'Fernet REST Service' },
      { name: 'PKCS7 padding', evidence: 'Fernet REST Service' },
      { name: 'TTL & tamper detection', evidence: 'Fernet REST Service' },
      { name: 'SHA-256 hashing', evidence: 'SourceForm' },
      { name: 'Metadata encryption', evidence: 'SourceForm' },
    ],
  },
  {
    id: 'languages',
    name: 'Programming',
    accent: 'violet',
    context: 'Chosen per problem — managed for services, native for systems, HDL for datapaths.',
    skills: [
      { name: 'Python', evidence: 'MMAIFA · BeastQuest · ROS 2' },
      { name: 'TypeScript', evidence: 'SecureDocs' },
      { name: 'JavaScript', evidence: 'Fernet · Dynasty' },
      { name: 'Kotlin', evidence: 'SourceForm' },
      { name: 'C++17', evidence: 'Mood Music Generator' },
      { name: 'Verilog HDL', evidence: '4-Bit ALU' },
      { name: 'Solidity' },
      { name: 'C' },
      { name: 'Java' },
    ],
  },
  {
    id: 'backend',
    name: 'Web & Backend',
    accent: 'cyan',
    context: 'API surfaces, persistence and the layer that authenticates everything above it.',
    skills: [
      { name: 'Node.js', evidence: 'Fernet · SecureDocs' },
      { name: 'Express', evidence: 'Fernet · SecureDocs' },
      { name: 'REST API design', evidence: 'Fernet · Mood Music' },
      { name: 'FastAPI', evidence: 'MMAIFA' },
      { name: 'PostgreSQL', evidence: 'SecureDocs' },
      { name: 'Prisma', evidence: 'SecureDocs' },
      { name: 'Redis', evidence: 'SecureDocs' },
      { name: 'Firestore', evidence: 'SourceForm' },
      { name: 'SQL' },
      { name: 'React', evidence: 'MMAIFA dashboard' },
    ],
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    accent: 'lime',
    context: 'Every service project ships containerised, behind a proxy, with CI attached.',
    skills: [
      { name: 'Docker', evidence: 'Fernet · SecureDocs · MMAIFA' },
      { name: 'Docker Compose', evidence: 'Fernet · SecureDocs' },
      { name: 'NGINX reverse proxy', evidence: 'SecureDocs' },
      { name: 'GitHub Actions CI/CD', evidence: 'Fernet REST Service' },
      { name: 'Authentik (self-hosted IdP)', evidence: 'SecureDocs' },
      { name: 'Linux', evidence: 'Ubuntu 22.04 · ROS 2' },
      { name: 'CMake', evidence: 'Mood Music Generator' },
      { name: 'Google Cloud Run', evidence: 'SourceForm deployment' },
      { name: 'Firebase Storage', evidence: 'SourceForm' },
      { name: 'Cloud IAM / service identities', evidence: 'SourceForm' },
      { name: 'Git' },
      { name: 'Ubuntu LTS' },
    ],
  },
  {
    id: 'ai',
    name: 'AI / ML',
    accent: 'magenta',
    context: 'Forensic reasoning under uncertainty rather than single-model classification.',
    skills: [
      { name: 'Deepfake detection', evidence: 'MMAIFA' },
      { name: 'Multi-stream fusion', evidence: 'MMAIFA' },
      { name: 'Uncertainty & OOD estimation', evidence: 'MMAIFA' },
      { name: 'Explainable AI (Grad-CAM)', evidence: 'MMAIFA' },
      { name: 'Computer vision', evidence: 'MMAIFA' },
      { name: 'PyTorch', evidence: 'MMAIFA' },
      { name: 'ConvNeXt / Swin / DINOv2', evidence: 'MMAIFA pixel stream' },
      { name: 'Confidence calibration', evidence: 'MMAIFA' },
      { name: 'Adversarial robustness testing', evidence: 'MMAIFA' },
      { name: 'Supervised classification', evidence: 'MMAIFA patent' },
      { name: 'Feature fusion', evidence: 'MMAIFA patent' },
    ],
  },
  {
    id: 'web3',
    name: 'Blockchain / Web3',
    accent: 'violet',
    context: 'Wallet and settlement built against the raw provider interface.',
    skills: [
      { name: 'EIP-1193 provider API', evidence: 'Dynasty' },
      { name: 'Wallet integration', evidence: 'Dynasty' },
      { name: 'NFT minting flow', evidence: 'Dynasty' },
      { name: 'Sepolia testnet', evidence: 'Dynasty' },
      { name: 'On-chain payment flow', evidence: 'Dynasty' },
      { name: 'Marketplace systems', evidence: 'Dynasty' },
    ],
  },
  {
    id: 'systems',
    name: 'Robotics & Hardware',
    accent: 'cyan',
    context: 'Where the system has a body, or no operating system at all.',
    skills: [
      { name: 'ROS 2 Humble', evidence: 'Mission Control' },
      { name: 'Topics / Services / Actions', evidence: 'Mission Control' },
      { name: 'URDF modelling', evidence: 'Simple DiffBot' },
      { name: 'Gazebo simulation', evidence: 'Simple DiffBot' },
      { name: 'RViz' },
      { name: 'Carry look-ahead design', evidence: '4-Bit ALU' },
      { name: 'Testbench verification', evidence: '4-Bit ALU' },
      { name: 'KiCad', evidence: '4-Bit ALU' },
      { name: 'Unity asset reverse engineering', evidence: 'BeastQuest Patch' },
      { name: 'MATLAB' },
      { name: 'Keil uVision5' },
    ],
  },
];
