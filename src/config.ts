import type { CourseModule } from '@/types'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE SETTINGS
 * ─────────────────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  name: 'Nerve Surgery Academy',
  tagline: 'Online learning modules in peripheral nerve surgery',
  subtitle:
    'Interactive modules for junior surgical trainees, built with Articulate and hosted here as self-contained HTML5 packages.',
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  MODULE CATALOGUE
 * ─────────────────────────────────────────────────────────────────────────
 *  To publish a module:
 *   1. In Articulate, publish as "Web" (HTML5).
 *   2. Unzip the output into  public/courses/<module-id>/
 *      so that story.html (Storyline) or index.html (Rise) sits directly
 *      inside that folder.
 *   3. Add an entry below with the same id and the correct entryFile.
 *
 *  Modules without an entryFile appear in the catalogue as "Content pending".
 */
export const modules: CourseModule[] = [
  {
    id: 'getting-started',
    title: 'Welcome: How This Portal Works',
    description:
      'A short interactive walkthrough of the learning portal — navigating modules, tracking your progress, and what to expect from the interactive content.',
    category: 'Orientation',
    level: 'Foundation',
    durationMinutes: 5,
    entryFile: 'story.html',
    tags: ['orientation', 'demo'],
    updatedAt: '2026-10-15',
  },
  {
    id: 'nerve-anatomy-refresher',
    title: 'Peripheral Nerve Anatomy: A Quick Refresher',
    description:
      'A sample micro-module demonstrating how published Articulate content appears inside the portal — slides, media, and quizzes all run in the embedded player.',
    category: 'Basic Science',
    level: 'Foundation',
    durationMinutes: 8,
    entryFile: 'story.html',
    tags: ['anatomy', 'sample'],
    updatedAt: '2026-10-15',
  },
  {
    id: 'nerve-injury-classification',
    title: 'Classification of Nerve Injury: Seddon & Sunderland',
    description:
      'Neurapraxia, axonotmesis and neurotmesis — mechanisms, clinical correlation, and how grade guides timing of intervention.',
    category: 'Basic Science',
    level: 'Foundation',
    durationMinutes: 20,
    entryFile: 'story.html',
    tags: ['nerve injury', 'classification'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'electrodiagnostics',
    title: 'Electrodiagnostic Studies for the Junior Surgeon',
    description:
      'Reading nerve conduction studies and EMG reports: what to order, when to order it, and how results change management.',
    category: 'Diagnostics',
    level: 'Intermediate',
    durationMinutes: 30,
    entryFile: 'story.html',
    tags: ['NCS', 'EMG', 'diagnostics'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'nerve-repair-principles',
    title: 'Principles of Primary Nerve Repair',
    description:
      'Timing, tension, and technique — epineurial vs group fascicular repair, and the evidence behind modern microsurgical practice.',
    category: 'Nerve Repair',
    level: 'Intermediate',
    durationMinutes: 35,
    entryFile: 'story.html',
    tags: ['microsurgery', 'repair'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'nerve-grafting-conduits',
    title: 'Nerve Grafting, Conduits and Allografts',
    description:
      'Autograft remains gold standard — but when are conduits and processed allografts appropriate? Gap length, donor morbidity, and outcomes.',
    category: 'Nerve Repair',
    level: 'Advanced',
    durationMinutes: 40,
    entryFile: 'story.html',
    tags: ['grafting', 'conduits', 'allograft'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'nerve-transfers',
    title: 'Nerve Transfers: Concepts and Common Donor Sets',
    description:
      'Indications, timing, and the workhorse transfers for upper-limb reconstruction — including distal transfers for isolated deficits.',
    category: 'Reconstruction',
    level: 'Advanced',
    durationMinutes: 45,
    entryFile: 'story.html',
    tags: ['nerve transfer', 'reconstruction'],
    updatedAt: '2026-10-18',
  },
  {
    id: 'compressive-neuropathies',
    title: 'Compressive Neuropathies: Carpal & Cubital Tunnel',
    description:
      'Diagnosis, conservative management, surgical decompression, and what the recent evidence says about outcomes and recurrence.',
    category: 'Clinical Practice',
    level: 'Foundation',
    durationMinutes: 25,
    entryFile: 'story.html',
    tags: ['carpal tunnel', 'cubital tunnel', 'entrapment'],
    updatedAt: '2026-10-18',
  },
]

/** Categories derived automatically from the catalogue. */
export const categories = Array.from(new Set(modules.map((m) => m.category))).sort()
