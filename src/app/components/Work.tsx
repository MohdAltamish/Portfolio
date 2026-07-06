import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects, type Project } from '../data/firebaseData';
import { projects as defaultProjects } from '../data/projects';
import { useTheme, tc } from '../context/ThemeContext';
import modShieldImg from '../../imports/ModShield.png';
import carbonTrackerImg from '../../imports/6.png';
import driftfixImg from '../../imports/2.png';
import neuroscanImg from '../../imports/3.png';
import glbDentalImg from '../../imports/LOGO.png';
import uidaiImg from '../../imports/5.png';
import crisisCommandImg from '../../imports/7.png';

const localImages: Record<string, string> = {
  'modshield': modShieldImg,
  'carbon-tracker': carbonTrackerImg,
  'driftfix': driftfixImg,
  'neuroscan': neuroscanImg,
  'glb-dental-intellect': glbDentalImg,
  'uidai-insights': uidaiImg,
  'crisis-command': crisisCommandImg,
};

export const Work = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  const [projects, setProjects] = useState<Project[]>(defaultProjects.map((p, i) => ({ ...p, order: i })));

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  }, []);

  return (
    <div className={`${t.pageBg} min-h-screen ${t.text} pt-32 px-6 transition-colors duration-500`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-24">
           <div>
             <Link to="/" className={`text-xs font-mono uppercase tracking-widest ${t.subtle} hover:${t.text} transition-colors mb-8 block`}>
               ← Back to Home
             </Link>
             <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9]">
               Projects <br />
               <span className={`italic font-serif ${t.subtle}`}>2025 — Present</span>
             </h1>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 pb-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/work/${project.slug}`}>
                <div className={`relative overflow-hidden aspect-[3/4] mb-6 ${t.surface} rounded-sm`}>
                   <img
                     src={localImages[project.slug] || project.image}
                     alt={project.title}
                     className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                   />
                   <div className={`absolute inset-0 ${isDark ? 'bg-black/20' : 'bg-black/10'} group-hover:bg-transparent transition-colors`} />

                   <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <ArrowUpRight className={`w-5 h-5 ${t.text}`} />
                   </div>
                </div>
                <div className={`flex justify-between items-baseline border-t ${t.border} pt-4`}>
                   <div>
                     <h3 className={`text-xl font-medium tracking-tight mb-1 ${t.text}`}>{project.title}</h3>
                     <p className={`text-xs font-mono uppercase tracking-widest ${t.subtle}`}>{project.category}</p>
                   </div>
                   <span className={`text-xs font-mono ${t.faint}`}>{project.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
