import type { Accent } from './projects';

export interface DiagramNode {
  id: string;
  label: string;
  /** Percentage coordinates inside the diagram viewport. */
  x: number;
  y: number;
  accent: Accent;
  kind?: 'input' | 'stage' | 'terminal';
  detail: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export interface Diagram {
  id: string;
  /** Intrinsic width in px used for the scroll container on small screens. */
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export const mmaifaDiagram: Diagram = {
  id: 'mmaifa',
  width: 860,
  height: 620,
  nodes: [
    {
      id: 'input',
      label: 'Input image',
      x: 50,
      y: 5,
      accent: 'cyan',
      kind: 'input',
      detail:
        'A single image enters the pipeline. Nothing about its origin is assumed — camera output, diffusion sample and edited composite all take the same path.',
    },
    {
      id: 'pre',
      label: 'Preprocessing',
      x: 50,
      y: 18,
      accent: 'cyan',
      detail:
        'Normalisation before any stream sees the image, so downstream detectors compare like with like rather than reacting to format differences.',
    },
    {
      id: 'pixel',
      label: 'Pixel models',
      x: 12,
      y: 36,
      accent: 'cyan',
      detail:
        'Spatial realism analysis, patch-level inference, feature embedding extraction and visual anomaly localisation. Supports ConvNeXt, EfficientNet, Swin Transformers, DINOv2 and CLIP-compatible embeddings.',
    },
    {
      id: 'forensic',
      label: 'Forensic streams',
      x: 37,
      y: 36,
      accent: 'lime',
      detail:
        'Frequency-domain anomalies, diffusion traces, compression artifacts, sensor inconsistencies, PRNU-style patterns and spectral irregularities — the signals a classifier never looks at.',
    },
    {
      id: 'semantic',
      label: 'Semantic agents',
      x: 63,
      y: 36,
      accent: 'violet',
      detail:
        'Anatomy, perspective, lighting, reflections, typography, object relationships and contextual coherence. The question is physical: could this scene exist, not does it statistically resemble AI.',
    },
    {
      id: 'provenance',
      label: 'Provenance & metadata',
      x: 88,
      y: 36,
      accent: 'magenta',
      detail:
        'Records stream lineage, evidence contribution, contradiction traces, calibration history and semantic rationale. Every decision stays traceable back to the evidence that produced it.',
    },
    {
      id: 'fusion',
      label: 'Fusion engine',
      x: 50,
      y: 56,
      accent: 'cyan',
      detail:
        'The core reasoning layer. Aggregates evidence, resolves contradictions between streams, applies uncertainty weighting, suppresses unstable streams and balances reliability. No single stream can carry a verdict alone.',
    },
    {
      id: 'uncertainty',
      label: 'Uncertainty & OOD',
      x: 25,
      y: 73,
      accent: 'lime',
      detail:
        'Quantifies disagreement, detects generators the system has never seen, prevents overconfidence and escalates ambiguous cases. Certainty is not forced under ambiguity.',
    },
    {
      id: 'explain',
      label: 'Explainability',
      x: 75,
      y: 73,
      accent: 'violet',
      detail:
        'Grad-CAM heatmaps, spectral anomaly overlays, stream-wise evidence inspection, confidence decomposition and contradiction visualisation — the output a human reviewer can actually audit.',
    },
    {
      id: 'verdict',
      label: 'Authenticity verdict',
      x: 50,
      y: 91,
      accent: 'cyan',
      kind: 'terminal',
      detail:
        'One of five outcomes: REAL, AI_GENERATED, MANIPULATED, UNKNOWN, or HUMAN_REVIEW_REQUIRED. The last two exist because a forensic system that cannot abstain is not a forensic system.',
    },
  ],
  edges: [
    { from: 'input', to: 'pre' },
    { from: 'pre', to: 'pixel' },
    { from: 'pre', to: 'forensic' },
    { from: 'pre', to: 'semantic' },
    { from: 'pre', to: 'provenance' },
    { from: 'pixel', to: 'fusion' },
    { from: 'forensic', to: 'fusion' },
    { from: 'semantic', to: 'fusion' },
    { from: 'provenance', to: 'fusion' },
    { from: 'fusion', to: 'uncertainty' },
    { from: 'fusion', to: 'explain' },
    { from: 'uncertainty', to: 'verdict' },
    { from: 'explain', to: 'verdict' },
  ],
};

export const dynastyDiagram: Diagram = {
  id: 'dynasty',
  width: 480,
  height: 700,
  nodes: [
    {
      id: 'artisan',
      label: 'Artisan',
      x: 50,
      y: 5,
      accent: 'violet',
      kind: 'input',
      detail:
        'Onboarding through the artisan portal, with a dashboard and profile. Minting is role-gated: the session must be an authenticated artisan before any mint is allowed.',
    },
    {
      id: 'asset',
      label: 'Asset',
      x: 50,
      y: 19,
      accent: 'violet',
      detail:
        'The work itself, with title, creator, image and price in both ETH and INR. Validated before it can enter the mint — a title under three characters or a malformed price is rejected up front.',
    },
    {
      id: 'mint',
      label: 'NFT mint',
      x: 50,
      y: 33,
      accent: 'magenta',
      detail:
        'Minting writes to a persisted index and is guarded by an in-flight flag so a double submit cannot fire two mints for the same asset.',
    },
    {
      id: 'ledger',
      label: 'Blockchain ledger',
      x: 50,
      y: 47,
      accent: 'cyan',
      detail:
        'Targets the Sepolia test network. Chain IDs are normalised, and if the wallet is on the wrong network the app requests a switch and falls back to adding the network definition.',
    },
    {
      id: 'market',
      label: 'Marketplace',
      x: 50,
      y: 61,
      accent: 'violet',
      detail:
        'Minted work is listed across marketplace and product pages, driven by the shared layout and UI controller logic used site-wide.',
    },
    {
      id: 'purchase',
      label: 'Cart & checkout',
      x: 50,
      y: 75,
      accent: 'lime',
      detail:
        'Cart, checkout and address confirmation lead into settlement, ending on a payment-success page.',
    },
    {
      id: 'wallet',
      label: 'Wallet settlement',
      x: 50,
      y: 92,
      accent: 'cyan',
      kind: 'terminal',
      detail:
        'Built on the raw EIP-1193 provider — eth_requestAccounts, wallet_switchEthereumChain, eth_sendTransaction. Amounts convert to wei with BigInt arithmetic rather than floats, and the transaction links out to the Sepolia explorer.',
    },
  ],
  edges: [
    { from: 'artisan', to: 'asset' },
    { from: 'asset', to: 'mint' },
    { from: 'mint', to: 'ledger' },
    { from: 'ledger', to: 'market' },
    { from: 'market', to: 'purchase' },
    { from: 'purchase', to: 'wallet' },
  ],
};

export const securityDiagram: Diagram = {
  id: 'security',
  width: 560,
  height: 560,
  nodes: [
    {
      id: 'internet',
      label: 'Internet',
      x: 50,
      y: 6,
      accent: 'magenta',
      kind: 'input',
      detail: 'Untrusted by definition. Every control below exists because this edge cannot be reasoned about.',
    },
    {
      id: 'proxy',
      label: 'NGINX',
      x: 50,
      y: 24,
      accent: 'cyan',
      detail:
        'Reverse proxy as the single ingress. Terminates the connection so the application is never directly addressable — the pattern used in SecureDocs from its first phase.',
    },
    {
      id: 'backend',
      label: 'Application',
      x: 50,
      y: 44,
      accent: 'cyan',
      detail:
        'Security headers, rate limiting, request sanitisation and error isolation at the boundary, so a malformed request is rejected before it reaches business logic.',
    },
    {
      id: 'auth',
      label: 'Identity',
      x: 20,
      y: 65,
      accent: 'lime',
      detail:
        'Token verification before any protected operation. Self-hosted OIDC in SecureDocs; hybrid OAuth and JWT in SourceForm.',
    },
    {
      id: 'audit',
      label: 'Audit log',
      x: 80,
      y: 65,
      accent: 'violet',
      detail:
        'Authentication, upload, retrieval, integrity and security-exception events recorded. Without this, a breach is invisible after the fact.',
    },
    {
      id: 'store',
      label: 'Encrypted store',
      x: 50,
      y: 88,
      accent: 'lime',
      kind: 'terminal',
      detail:
        'Deny-by-default storage rules with backend-issued signed URLs, and metadata encrypted before it is written — so a database compromise still yields very little.',
    },
  ],
  edges: [
    { from: 'internet', to: 'proxy' },
    { from: 'proxy', to: 'backend' },
    { from: 'backend', to: 'auth' },
    { from: 'backend', to: 'audit' },
    { from: 'auth', to: 'store' },
    { from: 'audit', to: 'store' },
  ],
};

/** Hero graph — three overlapping identities. */
export interface HeroNode {
  id: string;
  label: string;
  x: number;
  y: number;
  accent: Accent;
  items: string[];
}

export const heroNodes: HeroNode[] = [
  {
    id: 'ai',
    label: 'AI / ML',
    x: 50,
    y: 14,
    accent: 'magenta',
    items: ['Deepfake detection', 'Forensic reasoning', 'Uncertainty estimation', 'Explainable AI'],
  },
  {
    id: 'security',
    label: 'Security',
    x: 16,
    y: 50,
    accent: 'cyan',
    items: ['Secure architecture', 'Cryptographic engineering', 'Identity & OIDC', 'Audit & integrity'],
  },
  {
    id: 'software',
    label: 'Software',
    x: 84,
    y: 50,
    accent: 'lime',
    items: ['Backend & APIs', 'Docker & CI/CD', 'Android', 'Full stack'],
  },
  {
    id: 'systems',
    label: 'Systems',
    x: 50,
    y: 86,
    accent: 'violet',
    items: ['ROS 2 & robotics', 'Verilog & digital logic', 'C++ services', 'Reverse engineering'],
  },
];
