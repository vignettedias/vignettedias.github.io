/**
 * Project catalogue.
 *
 * Every claim below is traceable to the repository README or source at
 * github.com/vignettedias. Nothing here is estimated, rounded, or inferred.
 */

export type Accent = 'cyan' | 'lime' | 'violet' | 'magenta';

export interface Project {
  id: string;
  title: string;
  /** Full expansion / subtitle, where the repo defines one. */
  subtitle?: string;
  category: string;
  accent: Accent;
  /** One line. Shown on the card. */
  description: string;
  technologies: string[];
  githubUrl: string;
  featured?: boolean;
  patented?: boolean;
  /** Repo's stated status, when it states one. */
  status?: string;
  problem: string;
  approach: string;
  architecture: string[];
  highlights: string[];
  contribution: string;
}

export const projects: Project[] = [
  {
    id: 'mmaifa',
    title: 'MMAIFA',
    subtitle: 'Multi-Modal AI Image Forensic Analyzer',
    category: 'AI · Digital Forensics',
    accent: 'cyan',
    description:
      'A modular forensic AI framework that decides whether an image is real, generated, or manipulated — and says how confident it is.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker', 'ONNX Runtime', 'OpenCV', 'timm', 'transformers', 'FAISS'],
    githubUrl: 'https://github.com/vignettedias/AI-MMAIFA',
    featured: true,
    patented: true,
    status: 'Active research and engineering project',
    problem:
      'Modern generative models have made pixel realism worthless as evidence. GAN artifacts are disappearing, diffusion output imitates natural photography, and smartphone computational photography already looks synthetic. Detectors built as image classifiers fail on all of it — and they fail confidently.',
    approach:
      'MMAIFA is built as a probabilistic multi-stream forensic reasoning engine rather than a classifier. No single evidence stream is trusted; every stream can fail independently, so all of them are fused probabilistically. Physical realism overrides weak artifact suspicion, and the system is allowed to answer UNKNOWN or HUMAN_REVIEW_REQUIRED instead of forcing a verdict under ambiguity.',
    architecture: [
      'Preprocessing normalises the input before any stream sees it.',
      'Four independent streams run in parallel: pixel models, forensic signal extraction, semantic agents, and provenance/metadata analysis.',
      'The fusion engine aggregates evidence, resolves contradictions between streams, and suppresses unstable ones.',
      'Uncertainty and out-of-distribution analysis quantify disagreement and detect unseen generators.',
      'The decision layer emits REAL, AI_GENERATED, MANIPULATED, UNKNOWN or HUMAN_REVIEW_REQUIRED, with an explainability output attached.',
    ],
    highlights: [
      'Contradiction-aware fusion — disagreement between streams is treated as information, not noise.',
      'Uncertainty is mandatory: the framework escalates ambiguous cases rather than guessing.',
      'Explicit false-positive mitigation for HDR, cinematic and smartphone-processed photography.',
      'Explainability via Grad-CAM heatmaps, spectral anomaly overlays and stream-wise evidence inspection.',
      'Provenance layer records stream lineage, evidence contribution and contradiction traces, so every decision is traceable.',
      'Regression-safe workflow with adversarial robustness tests under tests/adversarial/.',
    ],
    contribution:
      'Architecture, module boundaries and interface contracts across the twenty-package layout — pixel models, forensic streams, semantic reasoning, fusion, uncertainty, provenance, calibration, API and evaluation — plus the phased branching strategy the work is developed under.',
  },
  {
    id: 'dynasty',
    title: 'D.Y.N.A.S.T.Y',
    subtitle: 'Cultural artifact provenance and marketplace',
    category: 'Blockchain · Web3',
    accent: 'violet',
    description:
      'A marketplace where artisans mint cultural artifacts with ledger-backed provenance, and buyers settle on-chain through a browser wallet.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'EIP-1193 wallet API', 'MetaMask', 'Ethereum (Sepolia testnet)'],
    githubUrl: 'https://github.com/vignettedias/Dynasty',
    featured: true,
    patented: true,
    problem:
      'Cultural artifacts sold through conventional marketplaces carry no durable, verifiable record of who made them or who has owned them since — and no direct settlement path from buyer to maker.',
    approach:
      'A multi-page front-end application that carries a piece from artisan onboarding through minting, listing, cart and checkout, to a wallet-settled purchase. Role-gated: minting requires an authenticated artisan session, checked before any mint is allowed in flight.',
    architecture: [
      'Artisan portal and profile — onboarding, dashboard, artisan login.',
      'NFT minting module with input validation on title, creator, image and price, and a persisted minted index.',
      'Marketplace and product pages listing minted work.',
      'Cart, checkout, address confirmation and payment-success flow.',
      'Wallet module: connection, chain detection, network switching and value transfer.',
      'Shared layout and UI controller logic across pages.',
    ],
    highlights: [
      'Wallet integration against the raw EIP-1193 provider — eth_requestAccounts, wallet_switchEthereumChain and eth_sendTransaction, with no web3 abstraction library.',
      'Targets the Sepolia test network with explicit chain-ID normalisation and an add-network fallback.',
      'ETH amounts converted to wei with BigInt arithmetic and a strict 18-decimal input pattern, avoiding float rounding on currency.',
      'Mint guarded by role checks (artisan/artist) and a re-entrancy flag so a mint cannot be fired twice.',
      'Transactions linked out to the Sepolia block explorer for independent verification.',
    ],
    contribution:
      'Front-end application architecture, the minting and wallet modules, and the purchase flow that connects them.',
  },
  {
    id: 'securedocs',
    title: 'SecureDocs Platform',
    category: 'Secure Backend · Infrastructure',
    accent: 'lime',
    description:
      'A self-hosted document management platform built security-first, with its own identity layer behind a reverse proxy.',
    technologies: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Authentik', 'OIDC', 'Docker', 'Docker Compose', 'NGINX'],
    githubUrl: 'https://github.com/vignettedias/securedocs-platform-VD',
    status: 'Phase 2.3 — Identity Integration',
    problem:
      'Document platforms usually hand identity to a third party and expose storage directly. Both are single points of compromise, and neither is something you can audit yourself.',
    approach:
      'Fully self-hosted, modular service architecture. Phase 1 established the TypeScript/Express backend, containerisation, NGINX reverse proxy and Compose orchestration. Phase 2 is building the identity layer on Authentik as an OIDC provider, with PostgreSQL and Redis behind it.',
    architecture: [
      'Android client → NGINX reverse proxy → Node.js + Express backend → PostgreSQL.',
      'Identity layer: Authentik as OIDC provider, backed by Redis, with the SecureDocs application registered against it.',
      'Prisma ORM between the backend and PostgreSQL.',
      'Planned services: Fernet encryption service, MinIO object storage, Prometheus, Grafana.',
    ],
    highlights: [
      'Self-hosted OIDC rather than a managed identity provider — user groups and test users provisioned in Authentik.',
      'Reverse proxy in front of the application from Phase 1, not retrofitted afterwards.',
      'Health-check endpoint and Compose orchestration in place before feature work began.',
    ],
    contribution: 'Platform architecture, backend service, container and proxy topology, and the identity integration currently in progress.',
  },
  {
    id: 'sourceform',
    title: 'SourceForm',
    subtitle: 'Secure Cloud Intake Platform',
    category: 'Android · Secure Systems',
    accent: 'lime',
    description:
      'An Android document intake app with a hardened backend that never exposes storage directly.',
    technologies: ['Kotlin', 'Android SDK', 'Node.js', 'Express', 'Firebase Auth', 'JWT', 'OAuth (Google / Facebook / GitHub)', 'Google Cloud Run', 'Firestore', 'Firebase Storage', 'SHA-256', 'Fernet-compatible encryption'],
    githubUrl: 'https://github.com/vignettedias/SourceFormApp-VD',
    problem:
      'Upload systems tend to leak in two places: storage that is reachable by direct URL, and metadata sitting in plaintext next to the files it describes.',
    approach:
      'Deny-by-default storage rules, so documents are never publicly readable, combined with backend-mediated signed URL issuance for retrieval. Sensitive submission metadata is encrypted before storage using a custom Fernet-compatible implementation, which limits exposure even if the database is compromised.',
    architecture: [
      'Submission → authentication verification → input validation → file validation.',
      'Integrity hash generation → metadata encryption → audit logging.',
      'Private cloud storage for the document; Firestore for the encrypted metadata.',
      'Retrieval goes through the backend, which issues a signed URL — the client never touches storage directly.',
    ],
    highlights: [
      'Hybrid authentication: OAuth via Google, Facebook and GitHub alongside native JWT registration and login.',
      'SHA-256 fingerprint on every document, enabling tamper detection and verification that a stored file is unchanged.',
      'Defense-in-depth at the API: Helmet headers, rate limiting, request sanitisation, error isolation.',
      'Upload hardening: MIME and extension validation, size limits, filename randomisation, secure multipart processing.',
      'Audit subsystem recording authentication, upload, retrieval, integrity and security-exception events.',
      'Session hardening in the app: inactivity timeout and automatic logout after submission.',
      'Deployed on Google Cloud Run with environment-based configuration, managed secret injection and scoped IAM service identities.',
      'Magic-number file validation and short-lived signed URLs, verified by negative testing against expired tokens, cross-user access, tampered files, direct storage access and disguised uploads.',
    ],
    contribution: 'Built during the VIT-AP summer internship — Android client, backend security pipeline, metadata encryption, signed-URL retrieval model and the Google Cloud deployment.',
  },
  {
    id: 'fernet',
    title: 'Fernet REST Service',
    category: 'Cryptography · Service Engineering',
    accent: 'cyan',
    description:
      'A Fernet-compatible cryptographic engine written from native primitives, then turned into a containerised REST service.',
    technologies: ['Node.js 22', 'Express', 'Native crypto module', 'AES-128-CBC', 'HMAC-SHA256', 'Jest', 'Supertest', 'Docker', 'Docker Compose', 'GitHub Actions'],
    githubUrl: 'https://github.com/vignettedias/Fernet-REST-Service',
    problem:
      'Calling a crypto library teaches you nothing about the token format. Building one exposes what actually protects the ciphertext: the authentication tag, the timestamp, and what happens when either is wrong.',
    approach:
      'The Fernet token format was implemented directly on Node’s native crypto primitives — AES-128-CBC with PKCS7 padding, HMAC-SHA256 authentication, timestamp encoding and URL-safe Base64. That SDK was then transformed into a service with routes, controllers, middleware, authentication, logging, containerisation and CI/CD.',
    architecture: [
      'Client → API gateway / NGINX → Fernet REST Service.',
      'Service layer: routes, controllers, middleware, authentication, structured logging.',
      'Engine layer: AES-128-CBC, HMAC-SHA256, PKCS7, TTL validation, tamper detection.',
      'Endpoints: health, generate-key, encrypt, decrypt, metadata — all under /api/v1.',
    ],
    highlights: [
      'Tamper detection and TTL validation implemented in the engine rather than delegated.',
      'API-key authentication and request validation at the service boundary.',
      'Automated test suite with Jest and Supertest, wired into GitHub Actions CI/CD.',
      'Ships as a Docker Compose deployment — one command to stand up.',
    ],
    contribution: 'The cryptographic engine, the service layer around it, and the container/CI pipeline.',
  },
  {
    id: 'beastquest',
    title: 'BeastQuest Patch',
    category: 'Reverse Engineering · Preservation',
    accent: 'magenta',
    description:
      'Compatibility patches that fix a delisted Unity Android title’s rendering on modern hardware, found by disproving five wrong hypotheses first.',
    technologies: ['Python', 'UnityPy', 'Unity serialized assets', 'Android'],
    githubUrl: 'https://github.com/vignettedias/BeastQuest-Patch',
    status: 'Verified on hardware (Galaxy S25, Android 15)',
    problem:
      'In Beast Quest’s Epos world, the loading screen’s map artwork stayed visible through the sky during gameplay — occluded by foreground geometry, fixed on screen regardless of camera movement. It looked exactly like stale framebuffer content, which is the wrong diagnosis.',
    approach:
      'The loading scene stays resident during gameplay and its camera keeps drawing every frame. It ties the Epos main camera at depth -1.0, and camera execution order on a tie is not guaranteed. The decisive experiment: move the main camera to -2.0 so it renders first. The map then covered the world entirely instead of showing through gaps — only a live camera can invert like that, so it was never a stale buffer.',
    architecture: [
      'Locate the camera fields inside Unity serialized data with UnityPy.',
      'Overwrite individual values in place — loading camera depth -1.0 → -3.0 in level4.',
      'Recolour level3 camera clear colour from Unity’s default blue to a volcanic tone.',
      'Net effect on the archive: two zip entries differ from the original.',
    ],
    highlights: [
      'Root cause identified as a camera depth tie with "Don\'t Clear" flags, not a stale framebuffer.',
      'Epos camera depths deliberately left untouched — reordering them lets a depth-0 camera take the frame and the world stops rendering.',
      'Five earlier attempts documented as disproved in docs/DEAD-ENDS.md, including one that crashed on launch.',
      'The repository ships no game content: no APK, no assets, no decompiled code — the tools operate on a copy the user already owns.',
    ],
    contribution: 'Root-cause analysis, the patch tooling, and the written record of what was tried and disproved.',
  },
  {
    id: 'diffbot',
    title: 'Simple DiffBot Gazebo',
    category: 'Robotics · Simulation',
    accent: 'violet',
    description: 'A differential-drive mobile robot modelled in URDF and simulated in Gazebo under ROS 2.',
    technologies: ['ROS 2', 'Gazebo', 'URDF', 'RViz'],
    githubUrl: 'https://github.com/vignettedias/simple-diffbot-gazebo',
    problem: 'Navigation and SLAM work needs a robot model you can iterate on without hardware in the loop.',
    approach: 'Build the robot as a URDF model, simulate it in Gazebo, implement differential drive control, then add sensors as the simulation matures.',
    architecture: [
      'urdf/ — robot model description.',
      'launch/ — simulation bring-up.',
      'worlds/ — Gazebo environments.',
      'config/ and meshes/ — controller configuration and geometry.',
    ],
    highlights: [
      'URDF-based model rather than a hand-tuned simulation primitive.',
      'Differential drive control implemented against the model.',
      'Sensor stack (LiDAR, camera, IMU) and SLAM/navigation set as the project’s stated goals.',
    ],
    contribution: 'Robot model, simulation environment and control setup.',
  },
  {
    id: 'mission-control',
    title: 'Mission Control',
    subtitle: 'ROS 2 Humble',
    category: 'Robotics · Distributed Systems',
    accent: 'violet',
    description: 'A ROS 2 package exercising the three core communication mechanisms: topics, services and actions.',
    technologies: ['ROS 2 Humble', 'Python (rclpy)', 'Ubuntu 22.04 LTS'],
    githubUrl: 'https://github.com/vignettedias/mission-control-ros2',
    problem: 'Topics, services and actions solve different coordination problems, and the difference only becomes concrete when you build all three against one domain.',
    approach: 'One mission_control package implementing a publisher/subscriber pair, an emergency-stop service, and an autonomous mission action, with launch files and CLI testing.',
    architecture: [
      'Topics — publisher and subscriber for continuous telemetry.',
      'Services — emergency stop, request/response.',
      'Actions — autonomous mission, long-running with feedback.',
      'Launch files and ROS 2 CLI testing over the package.',
    ],
    highlights: [
      'All three ROS 2 communication patterns implemented in one coherent package.',
      'Emergency stop modelled as a service — the correct primitive for an immediate, acknowledged command.',
      'Autonomous mission modelled as an action, which is the pattern that carries feedback and cancellation.',
    ],
    contribution: 'Package design and all three communication implementations.',
  },
  {
    id: 'alu',
    title: '4-Bit ALU',
    category: 'Digital Logic · Hardware',
    accent: 'magenta',
    description:
      'A modular 4-bit ALU in Verilog with a carry look-ahead adder, validated exhaustively across all 4096 input combinations.',
    technologies: ['Verilog HDL', 'ModelSim / Questa', 'Icarus Verilog', 'GTKWave', 'KiCad'],
    githubUrl: 'https://github.com/vignettedias/ALU-6-Functions',
    problem: 'Ripple-carry addition serialises the carry chain. A 4-bit datapath with status flags needs the carry computed in parallel to stay fast.',
    approach:
      'Partition the design into reusable synthesisable blocks — a parameterised 2:1 mux, a 4:1 mux built from it, a carry look-ahead adder, and a top-level integration module — then verify exhaustively rather than by sampling.',
    architecture: [
      'A and B pass through negation-control multiplexers (op[3] negates A, op[2] negates B).',
      'A conditioned logic path computes AND, OR, XOR.',
      'A conditioned arithmetic path computes ADD/SUB with the carry look-ahead adder.',
      'op[1:0] selects the final output through mux_4; flags cout, neg and zero are generated at the top level.',
    ],
    highlights: [
      'Carry look-ahead built from parallel generate/propagate equations rather than a ripple chain.',
      'Exhaustive testbench over every opcode (0000–1111) and every input pair (A=0..15, B=0..15) — 4096 vectors, 0 errors against the reference model.',
      'Subtraction implemented as A + ~B + 1 through the same operand-negation path, no separate subtractor.',
      'KiCad schematic and PCB representation alongside the RTL.',
    ],
    contribution: 'Team project. RTL design, carry look-ahead logic and the exhaustive verification testbench.',
  },
  {
    id: 'moodmusic',
    title: 'Mood Music Generator',
    category: 'C++ · Systems',
    accent: 'cyan',
    description:
      'A C++17 service that classifies mood from text and generates MIDI arrangements to match, exposed over a REST API.',
    technologies: ['C++17', 'CMake', 'cpp-httplib', 'nlohmann/json', 'RtMidi', 'GoogleTest', 'Docker'],
    githubUrl: 'https://github.com/vignettedias/MoodMusicGeneratorRemastered',
    problem: 'A recommendation is more useful when it can explain itself, and more interesting when it can generate something rather than only retrieve it.',
    approach:
      'A lightweight keyword-weight classifier detects mood from text; a recommendation engine maps mood to music with an explainable rationale; a generator produces MIDI arrangements using Markov-style note transitions across four modes — studio, live, adaptive and generative.',
    architecture: [
      'Domain/model layer — mood weights, training, prediction, recommendation mapping, MIDI arrangement.',
      'Application layer — predictor coordinating inference, confidence and generation intensity.',
      'Infrastructure layer — logging, text normalisation and tokenisation, optional RtMidi playback.',
      'Transport layer — REST endpoints (POST /predict, GET /health, GET /modes), validation and static hosting.',
      'Interface layer — browser dashboard calling /predict.',
    ],
    highlights: [
      'Explainable rationale attached to each recommendation, not just a ranked list.',
      'Optional real-time MIDI output through RtMidi for live mode.',
      'GoogleTest coverage over predictor behaviour, arrangement generation and the /predict API contract.',
      'Model weights trainable from a dataset and persisted to a binary artefact.',
    ],
    contribution: 'Team project. Layered architecture, predictor and arrangement generation, REST layer and test coverage.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const secondaryProjects = projects.filter((p) => !p.featured);
export const projectById = (id: string) => projects.find((p) => p.id === id);
