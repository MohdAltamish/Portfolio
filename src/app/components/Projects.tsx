import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects'; // Import shared data
import { useTheme, tc } from '../context/ThemeContext';
import modShieldImg from '../../imports/ModShield.png';
import carbonTrackerImg from '../../imports/6.png';
import driftfixImg from '../../imports/2.png';
import neuroscanImg from '../../imports/3.png';
import glbDentalImg from '../../imports/LOGO.png';
import uidaiImg from '../../imports/5.png';
import crisisCommandImg from '../../imports/7.png';

export const Projects = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  // Use first 4 projects for home
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="work" className={`py-32 px-6 ${t.pageBg} transition-colors duration-500`}>
      <div className="container mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-baseline gap-3">
                <span className={`font-serif italic text-lg ${t.text}`}>01</span>
                <span className={`text-xs font-mono uppercase tracking-[0.3em] ${t.muted}`}>Projects & Experience</span>
              </div>
              <div className={`h-px w-32 bg-gradient-to-r ${t.gradFrom} to-transparent`} />
            </div>
            <h2 className={`text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] ${t.text}`}>
              Curated <br />
              <span className={`italic font-serif ${t.subtle}`}>Excellence</span>
            </h2>
          </div>
          <div className="hidden md:block mb-2">
             <Link to="/work" className={`text-xs font-mono uppercase tracking-widest border-b ${t.border} pb-2 hover:${t.muted} transition-colors inline-block ${t.text}`}>
               View All Projects
             </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isDark={isDark} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, isDark, t }: { project: any, index: number, isDark: boolean, t: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ y: isEven ? 0 : y }}
      className={`group cursor-pointer relative ${!isEven ? 'md:mt-32' : ''}`}
    >
      <Link to={`/work/${project.slug}`}>
        <div className={`relative overflow-hidden rounded-sm aspect-[4/3] mb-8 ${t.surface}`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            src={project.slug === 'modshield' ? modShieldImg : project.slug === 'carbon-tracker' ? carbonTrackerImg : project.slug === 'driftfix' ? driftfixImg : project.slug === 'neuroscan' ? neuroscanImg : project.slug === 'glb-dental-intellect' ? glbDentalImg : project.slug === 'uidai-insights' ? uidaiImg : project.slug === 'crisis-command' ? crisisCommandImg : project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          {/* Hover Overlay */}
          <div className={`absolute inset-0 ${isDark ? 'bg-neutral-950/20' : 'bg-neutral-900/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10`}>
            <div className={`bg-white/10 backdrop-blur-md p-5 rounded-full border ${t.border} scale-0 group-hover:scale-100 transition-transform duration-500 ease-[0.16,1,0.3,1]`}>
              <ArrowUpRight className={`w-6 h-6 ${t.text}`} />
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-end border-t ${t.border} pt-6`}>
          <div>
            <h3 className={`text-3xl font-medium tracking-tight mb-2 group-hover:${t.muted} transition-colors ${t.text}`}>{project.title}</h3>
            <p className={`font-mono text-xs uppercase tracking-widest ${t.subtle}`}>{project.category}</p>
          </div>
          <span className={`font-mono text-xs ${t.faint}`}>{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
};
