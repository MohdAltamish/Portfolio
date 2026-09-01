// ============================================================
// Firebase Firestore Data Layer
// Handles all reads/writes for portfolio content.
// Falls back to hardcoded defaults if Firestore is empty.
// ============================================================

import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { projects as defaultProjects } from './projects';

// ── Types ──────────────────────────────────────────────────

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  year: string;
  client: string;
  role: string;
  description: string;
  github?: string;
  live?: string;
  stack: string[];
  order?: number;
}

export interface SiteStat {
  value: string;
  suffix: string;
  label: string;
}

export interface SkillCard {
  icon: string;
  title: string;
  description: string;
  skills: string[];
}

export interface HeroData {
  firstName: string;
  lastName: string;
  statusText: string;
  taglineLeft: string;
  taglineRight: string;
}

export interface AboutData {
  heading: string;
  headingAccent: string;
  paragraphs: string[];
  stats: SiteStat[];
  certifications: string[];
  resumeDriveLink: string;
}

export interface SiteContent {
  hero: HeroData;
  about: AboutData;
  skills: SkillCard[];
}

// ── Default Data ───────────────────────────────────────────

export const defaultSiteContent: SiteContent = {
  hero: {
    firstName: 'Mohd',
    lastName: 'Altamish',
    statusText: 'Open to Internship Opportunities',
    taglineLeft: 'AI Builder · Hackathon Winner\nFull Stack Developer · Problem Solver',
    taglineRight: 'Crafting AI-Powered Products\nwith Precision & Purpose',
  },
  about: {
    heading: 'Driven by code,',
    headingAccent: 'inspired',
    paragraphs: [
      "I'm a B.Tech CSE student at GL Bajaj Institute of Technology and Management (2025–29), a freelance full stack web developer serving startups and small businesses.",
      "I'm a Google Gemini Student Ambassador, GSSoC 2026 contributor (Open Source & AI/Agents tracks), and Oracle OCI certified in both AI Foundations and DevOps.",
      "I possess a strong foundation in Python and Java, actively refining my skills in Data Structures and Algorithms.",
      "My passion lies in building full-stack and AI-powered products — from multi-agent CI/CD pipelines to healthcare platforms — and competing in hackathons across Google Cloud, GitLab, Meta, HuggingFace, and UIDAI tracks.",
    ],
    stats: [
      { value: '01', suffix: '+', label: 'Hackathon Wins' },
      { value: '07', suffix: '+', label: 'AI/ML Projects' },
      { value: '96', suffix: '%', label: 'ML Accuracy' },
    ],
    certifications: [
      'Oracle OCI DevOps',
      'Oracle AI Foundations',
      'Google Gemini Ambassador',
      'GSSoC 2026',
      'Gen AI Academy',
    ],
    resumeDriveLink: 'https://drive.google.com/file/d/1cX4JE4aCN61FYuo0B_d0DzcJqWxhIoEa/view?usp=sharing',
  },
  skills: [
    {
      icon: 'Code2',
      title: 'Programming',
      description: 'Python · Java · C · JavaScript',
      skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
    },
    {
      icon: 'Layers',
      title: 'Web Development',
      description: 'HTML · CSS · React · Next.js · Flask · Node.js',
      skills: ['Full Stack', 'Responsive Design', 'APIs'],
    },
    {
      icon: 'Cloud',
      title: 'Cloud & DevOps',
      description: 'Google Cloud · Vercel · Docker · Kubernetes · CI/CD',
      skills: ['Deployment', 'Scalability', 'Automation'],
    },
    {
      icon: 'Brain',
      title: 'AI/ML & Data',
      description: 'PyTorch · Gemini API · HuggingFace · Google ADK',
      skills: ['Neural Networks', 'Data Analytics', 'AI Agents'],
    },
  ],
};

// ── Site Content (Hero, About, Skills) ─────────────────────

const SITE_DOC = 'portfolio';

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const docRef = doc(db, 'siteContent', SITE_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as SiteContent;
      return {
        hero: { ...defaultSiteContent.hero, ...data.hero },
        about: { ...defaultSiteContent.about, ...data.about },
        skills: data.skills || defaultSiteContent.skills,
      };
    }

    // Document doesn't exist yet — return defaults without writing.
    // Seeding is done by the admin panel on first authenticated save.
    return defaultSiteContent;
  } catch (e) {
    console.warn('Firestore read failed, using defaults:', e);
    return defaultSiteContent;
  }
}

export async function updateSiteContent(data: SiteContent): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  await setDoc(docRef, data);
}

// FIX: Use updateDoc with field-path keys to avoid a round-trip read before every save.
export async function updateHero(hero: HeroData): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  try {
    // Attempt a partial update — works if the document already exists.
    await updateDoc(docRef, { hero });
  } catch {
    // Document might not exist yet — fall back to a full setDoc with defaults.
    await setDoc(docRef, { ...defaultSiteContent, hero });
  }
}

// FIX: Use updateDoc with field-path keys to avoid a round-trip read before every save.
export async function updateAbout(about: AboutData): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  try {
    await updateDoc(docRef, { about });
  } catch {
    await setDoc(docRef, { ...defaultSiteContent, about });
  }
}

// FIX: Use updateDoc with field-path keys to avoid a round-trip read before every save.
export async function updateSkills(skills: SkillCard[]): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  try {
    await updateDoc(docRef, { skills });
  } catch {
    await setDoc(docRef, { ...defaultSiteContent, skills });
  }
}

// ── Projects ───────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  try {
    // FIX: Try the ordered query first; if it fails (e.g., missing composite index
    // on a brand-new Firestore collection), fall back to a plain getDocs and sort
    // in memory — this prevents a false-empty snapshot from triggering seeding.
    let snapshot;
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(collection(db, 'projects'));
    }

    if (snapshot.empty) {
      // Collection is genuinely empty — return defaults without seeding.
      // Seeding is done by the admin panel on first authenticated save.
      return defaultProjects.map((p, i) => ({ ...p, order: i }));
    }

    const docs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Project[];

    // Sort in-memory in case the fallback (non-ordered) query was used.
    const sorted = docs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    // Deduplicate by slug — keep the first occurrence (lowest order).
    // This guards against projects being seeded multiple times in Firestore.
    const seen = new Set<string>();
    return sorted.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  } catch (e) {
    console.warn('Firestore projects read failed, using defaults:', e);
    return defaultProjects.map((p, i) => ({ ...p, order: i }));
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<string> {
  const allProjects = await fetchProjects();
  const projectWithOrder = { ...project, order: allProjects.length };
  const docRef = await addDoc(collection(db, 'projects'), projectWithOrder);
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, data);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}

// ── Admin Seeding (call from admin panel only) ─────────────

/**
 * Seeds Firestore with default site content.
 * Should only be called from an authenticated admin context.
 */
export async function seedSiteContent(): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  await setDoc(docRef, defaultSiteContent);
}

/**
 * Seeds Firestore with default projects.
 * Should only be called from an authenticated admin context.
 */
export async function seedProjects(): Promise<Project[]> {
  const seeded: Project[] = [];
  for (let i = 0; i < defaultProjects.length; i++) {
    const project = { ...defaultProjects[i], order: i };
    const docRef = await addDoc(collection(db, 'projects'), project);
    seeded.push({ ...project, id: docRef.id });
  }
  return seeded;
}

/**
 * Deletes ALL project documents in Firestore, then re-seeds from defaults.
 * Use this to permanently fix duplicate projects caused by multiple seed calls.
 * Should only be called from an authenticated admin context.
 */
export async function cleanAndReseedProjects(): Promise<Project[]> {
  // 1. Fetch all existing docs (including duplicates)
  const snapshot = await getDocs(collection(db, 'projects'));

  // 2. Delete every doc
  const deletions = snapshot.docs.map((d) => deleteDoc(doc(db, 'projects', d.id)));
  await Promise.all(deletions);

  // 3. Re-seed from defaults (each project added once)
  return seedProjects();
}

