import type { Accent } from './projects';

export interface Patent {
  index: string;
  title: string;
  /** Official title as filed, where it differs from the project name. */
  filedTitle?: string;
  /** Indian patent application number. */
  applicationNumber: string;
  /** Fields below are transcribed from the official publication page, where available. */
  publicationNumber?: string;
  publicationDate?: string;
  filingDate?: string;
  journalNumber?: string;
  applicant?: string;
  classifications?: string[];
  /**
   * Exactly what is claimed — nothing more. `published` renders the stronger
   * badge; `filed` renders a neutral one. No dates, jurisdictions or legal
   * status are asserted beyond this.
   */
  stage: 'published' | 'filed';
  statusLabel: string;
  domain: string;
  accent: Accent;
  /**
   * Credited only here, in the patent section. Names come from the résumé /
   * the inventor directly — never inferred.
   */
  coInventors: string[];
  summary: string;
  projectId: string;
}

export const patents: Patent[] = [
  {
    index: '01',
    title: 'MMAIFA',
    filedTitle:
      'A Multi-Modal Image Authenticity Verification System for Distinguishing Real Images from Artificially Generated Images',
    applicationNumber: '202641010474',
    stage: 'published',
    statusLabel: 'Published Patent · 2026',
    domain: 'AI · Deepfake Detection · Multi-Modal Forensics',
    accent: 'cyan',
    // A. K. Makkarh is a co-inventor on this patent only, not on Dynasty.
    coInventors: ['Soumyadeep Chowdhury', 'A. K. Makkarh', 'Taposri Saha'],
    summary:
      'Covers a unified deepfake detection framework built on the premise that no single detector is universally accurate but their errors are uncorrelated. Three concurrent pipelines — an ensemble of pixel-level neural detectors each specialised to one generator family, statistical and frequency forensics (error level analysis, spectral inspection, noise consistency), and semantic reasoning over anatomy, text and physical plausibility — feed a meta-classifier that learns which evidence to trust per context, emitting a verdict, a confidence level, and a manual-review flag when confidence is low. The specification reports a CIFAKE result of 99.53% accuracy, 99.11% sensitivity and 99.60% specificity.',
    projectId: 'mmaifa',
  },
  {
    index: '02',
    title: 'Dynasty',
    filedTitle:
      'Blockchain-based system for cultural artifact provenance verification and digital marketplace integration',
    applicationNumber: '202641067215',
    publicationNumber: 'IN 202641067215 A1',
    publicationDate: '05-06-2026',
    filingDate: '29-05-2026',
    journalNumber: '23/2026',
    applicant: 'Vellore Institute of Technology',
    classifications: ['G06Q30/018', 'G06F21/64', 'G06N20/00', 'G06F16/245', 'H04L9/32'],
    stage: 'published',
    statusLabel: 'Published Patent · 2026',
    domain: 'Blockchain Provenance · Cultural Artifacts · Marketplace',
    accent: 'violet',
    // The publication page prints Gayathri V twice (entries 1 and 2); it is one
    // person, so the duplicate is collapsed here.
    coInventors: [
      'Dr. Gayathri V',
      'Sajal Kumar',
      'Taposri Saha',
      'Soumyadeep Chowdhury',
      'Kaustuv Shreyas Jha',
    ],
    summary:
      'Grew out of a first-place win at the Culturix Ideathon Yantra 2026. Covers a cultural artifact verification platform: an artisan registration module issuing identity tokens, an artifact identity generator that hashes provenance metadata into a cultural provenance token, a blockchain provenance ledger recording ownership transfer, an AI classifier comparing artifact image feature vectors, and a smart contract module executing transactions.',
    projectId: 'dynasty',
  },
];

export const publishedCount = patents.filter((p) => p.stage === 'published').length;
