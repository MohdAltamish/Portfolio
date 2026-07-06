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
    } else {
      // Seed Firestore with defaults on first load
      await setDoc(docRef, defaultSiteContent);
      return defaultSiteContent;
    }
  } catch (e) {
    console.warn('Firestore read failed, using defaults:', e);
    return defaultSiteContent;
  }
}

export async function updateSiteContent(data: SiteContent): Promise<void> {
  const docRef = doc(db, 'siteContent', SITE_DOC);
  await setDoc(docRef, data);
}

export async function updateHero(hero: HeroData): Promise<void> {
  const current = await fetchSiteContent();
  await updateSiteContent({ ...current, hero });
}

export async function updateAbout(about: AboutData): Promise<void> {
  const current = await fetchSiteContent();
  await updateSiteContent({ ...current, about });
}

export async function updateSkills(skills: SkillCard[]): Promise<void> {
  const current = await fetchSiteContent();
  await updateSiteContent({ ...current, skills });
}

// ── Projects ───────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Seed Firestore with default projects
      const seeded: Project[] = [];
      for (let i = 0; i < defaultProjects.length; i++) {
        const project = { ...defaultProjects[i], order: i };
        const docRef = await addDoc(collection(db, 'projects'), project);
        seeded.push({ ...project, id: docRef.id });
      }
      return seeded;
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Project[];
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
