import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import modShieldImg from '../../imports/ModShield.png';
import carbonTrackerImg from '../../imports/6.png';
import driftfixImg from '../../imports/2.png';
import neuroscanImg from '../../imports/3.png';
import glbDentalImg from '../../imports/LOGO.png';
import uidaiImg from '../../imports/5.png';
import crisisCommandImg from '../../imports/7.png';
import { useTheme, tc } from '../context/ThemeContext';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const t = tc(isDark);
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className={`min-h-screen ${t.pageBg} flex items-center justify-center ${t.text}`}>
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project not found</h1>
          <Link to="/work" className={`${t.subtle} hover:${isDark ? 'text-white' : 'text-neutral-900'} underline`}>Back to Archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${t.pageBg} min-h-screen ${t.text} pt-32 px-6 transition-colors duration-500`}>
      <div className="container mx-auto">
        <Link to="/work" className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${t.subtle} hover:${isDark ? 'text-white' : 'text-neutral-900'} transition-colors mb-12`}>
          <ArrowLeft className="w-4 h-4" /> Back to Archive
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
             <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9]">
               {project.title}
             </h1>
             <span className="font-mono text-sm text-neutral-400 mb-2">{project.category} — {project.year}</span>
          </div>

          <div className={`aspect-[16/9] w-full ${t.surface} overflow-hidden rounded-sm`}>
             <motion.img 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
               src={project.slug === 'modshield' ? modShieldImg : project.slug === 'carbon-tracker' ? carbonTrackerImg : project.slug === 'driftfix' ? driftfixImg : project.slug === 'neuroscan' ? neuroscanImg : project.slug === 'glb-dental-intellect' ? glbDentalImg : project.slug === 'uidai-insights' ? uidaiImg : project.slug === 'crisis-command' ? crisisCommandImg : project.image}
               alt={project.title}
               className="w-full h-full object-cover"
             />
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-24 mb-32">
           <div className="space-y-12">
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest ${t.faint} block mb-2`}>Event</span>
                <p className="text-xl font-light">{project.client}</p>
              </div>
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest ${t.faint} block mb-2`}>Role</span>
                <p className="text-xl font-light">{project.role}</p>
              </div>
              {(project as any).stack && (
                <div>
                  <span className={`text-xs font-mono uppercase tracking-widest ${t.faint} block mb-4`}>Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {(project as any).stack.map((tech: string) => (
                      <span key={tech} className={`px-3 py-1 ${isDark ? 'bg-white/5' : 'bg-neutral-100'} border ${t.border} rounded-full text-xs font-mono`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {((project as any).github || (project as any).live) && (
                <div className="space-y-3">
                  <span className={`text-xs font-mono uppercase tracking-widest ${t.faint} block mb-4`}>Links</span>
                  {(project as any).github && (
                    <a
                      href={(project as any).github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 ${t.muted} hover:${isDark ? 'text-white' : 'text-neutral-900'} transition-colors group`}
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  )}
                  {(project as any).live && (
                    <a
                      href={(project as any).live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 ${t.muted} hover:${isDark ? 'text-white' : 'text-neutral-900'} transition-colors group`}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  )}
                </div>
              )}
           </div>

           <div>
              <p className={`text-2xl md:text-4xl font-light leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {project.description}
              </p>
           </div>
        </div>
        
        {/* Next Project (Simple Link) */}
        <div className={`border-t ${t.border} py-24 text-center`}>
           <Link to="/work" className="group inline-flex flex-col items-center gap-4">
              <span className={`text-xs font-mono uppercase tracking-widest ${t.subtle}`}>Next Project</span>
              <span className={`text-6xl md:text-8xl font-medium tracking-tighter ${t.text} group-hover:${isDark ? 'text-neutral-400' : 'text-neutral-500'} transition-colors`}>
                View Projects
              </span>
           </Link>
        </div>
      </div>
    </div>
  );
};
