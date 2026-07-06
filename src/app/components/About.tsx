import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import { useTheme, tc } from '../context/ThemeContext';
import myWall from '../../imports/My-Wall.png';
import myResume from '../../imports/My-Resume.pdf?url';
import { fetchSiteContent, defaultSiteContent, type AboutData } from '../data/firebaseData';

export const About = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const [about, setAbout] = useState<AboutData>(defaultSiteContent.about);

  useEffect(() => {
    fetchSiteContent().then((content) => setAbout(content.about));
  }, []);

  return (
    <section ref={containerRef} id="about" className={`py-32 relative ${t.pageBg} overflow-hidden transition-colors duration-500`}>
      {/* Background Grid - Technical Texture */}
      <div className={`absolute inset-0 ${t.grid} [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none`} />

      <div className="container mx-auto px-6">

        {/* Section Header - Consistent Style */}
        <div className="flex items-center gap-6 mb-24">
           <div className="flex items-baseline gap-3">
              <span className={`font-serif italic text-lg ${t.text}`}>02</span>
              <span className={`text-xs font-mono uppercase tracking-[0.3em] ${t.muted}`}>About Me</span>
           </div>
           <div className={`h-px w-32 bg-gradient-to-r ${t.gradFrom} to-transparent`} />
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">

          {/* Text Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9] ${t.text}`}
            >
              {about.heading} <br />
              <span className={`italic font-serif ${t.subtle}`}>{about.headingAccent}</span> by innovation.
            </motion.h2>

            <div className={`grid md:grid-cols-2 gap-12 text-lg font-light ${t.muted} leading-relaxed`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-6"
              >
                {about.paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                {about.paragraphs.slice(2).map((p, i) => (
                  <p key={i} className={i === about.paragraphs.slice(2).length - 1 ? (isDark ? 'text-white/80' : 'text-neutral-700') : ''}>
                    {p}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Stats & Trust */}
            <div className={`mt-16 pt-16 border-t ${t.thinBorder}`}>
               <div className="grid grid-cols-3 gap-8 mb-16">
                 {about.stats.map((stat, i) => (
                   <div key={i} className={`space-y-2 ${i < about.stats.length - 1 ? `border-r ${t.thinBorder}` : ''}`}>
                     <h4 className={`text-4xl font-light ${t.text}`}>{stat.value}<span className={`${t.faint} text-lg`}>{stat.suffix}</span></h4>
                     <p className={`text-xs uppercase tracking-widest ${t.subtle}`}>{stat.label}</p>
                   </div>
                 ))}
               </div>

               {/* Certifications & Programs */}
               <div className="mb-12">
                 <span className={`text-xs font-mono uppercase tracking-widest ${t.faint} block mb-6`}>Certifications & Programs</span>
                 <div className={`flex flex-wrap gap-x-12 gap-y-4 ${t.muted} font-light text-lg`}>
                   {about.certifications.map((cert, i) => (
                     <motion.span
                       key={cert}
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       transition={{ delay: 0.5 + (i * 0.1) }}
                       className={`hover:${t.text} transition-colors cursor-default`}
                     >
                       {cert}
                     </motion.span>
                   ))}
                 </div>
               </div>

               {/* Resume */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4, duration: 0.7 }}
                 className={`pt-12 border-t ${t.thinBorder} flex flex-col sm:flex-row gap-4`}
               >
                 <a
                   href={myResume}
                   download="Mohd-Altamish-Resume.pdf"
                   className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full ${t.accent} ${t.accentHover} transition-all duration-300 text-sm font-mono uppercase tracking-widest`}
                 >
                   <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                   Download Resume
                 </a>
                 <a
                   href={about.resumeDriveLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border ${t.border} ${t.muted} hover:${t.text} transition-all duration-300 text-sm font-mono uppercase tracking-widest`}
                 >
                   <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   View Resume
                 </a>
               </motion.div>
            </div>
          </div>

          {/* Image Area */}
          <motion.div
            style={{ opacity }}
            className="relative lg:mt-24"
          >
            <div className="relative z-10">
               <motion.div
                 whileHover={{ scale: 0.98 }}
                 transition={{ duration: 0.5 }}
                 className={`aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out ${t.surface}`}
               >
                 <img
                   src={myWall}
                   alt="Mohd Altamish"
                   className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
               </motion.div>

               {/* Decorative Ring */}
               <div className={`absolute -bottom-12 -left-12 w-48 h-48 border ${t.border} rounded-full flex items-center justify-center backdrop-blur-sm hidden md:flex`} style={{ animation: 'spin 15s linear infinite' }}>
                 <style dangerouslySetInnerHTML={{__html: `
                   @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                 `}} />
                 <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                   <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                   <text className={`${isDark ? 'fill-neutral-500' : 'fill-neutral-400'} text-[10px] uppercase tracking-widest font-mono`}>
                     <textPath href="#circlePath">
                       FOUNDER · BUILDER · DEVELOPER ·
                     </textPath>
                   </text>
                 </svg>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
