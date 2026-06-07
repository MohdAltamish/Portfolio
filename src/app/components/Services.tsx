import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code2, Cloud, Brain, Database, Layers, GitBranch } from 'lucide-react';
import { useTheme, tc } from '../context/ThemeContext';

const skills = [
  {
    icon: Code2,
    title: "Programming",
    description: "Python · Java · C · JavaScript",
    skills: ["Data Structures", "Algorithms", "Problem Solving"]
  },
  {
    icon: Layers,
    title: "Web Development",
    description: "HTML · CSS · React · Next.js · Flask · Node.js",
    skills: ["Full Stack", "Responsive Design", "APIs"]
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Google Cloud · Vercel · Docker · Kubernetes · CI/CD",
    skills: ["Deployment", "Scalability", "Automation"]
  },
  {
    icon: Brain,
    title: "AI/ML & Data",
    description: "PyTorch · Gemini API · HuggingFace · Google ADK",
    skills: ["Neural Networks", "Data Analytics", "AI Agents"]
  }
];

export const Services = () => {
  const { isDark } = useTheme();
  const t = tc(isDark);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} id="services" className={`py-32 px-6 ${t.pageBg} relative overflow-hidden transition-colors duration-500`}>
       {/* Dynamic Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         className={`absolute -top-[20%] -right-[10%] w-[800px] h-[800px] border ${t.thinBorder} rounded-full pointer-events-none opacity-50 dashed-border`}
         style={{ borderStyle: 'dashed' }}
       />
       <motion.div
         animate={{ rotate: -360 }}
         transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
         className={`absolute top-[20%] right-[10%] w-[600px] h-[600px] border ${t.thinBorder} rounded-full pointer-events-none opacity-30`}
       />

      <div className="container mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-end">
          <div>
            <div className="flex items-center gap-6 mb-8">
               <div className="flex items-baseline gap-3">
                  <span className={`font-serif italic text-lg ${t.text}`}>03</span>
                  <span className={`text-xs font-mono uppercase tracking-[0.3em] ${t.muted}`}>/ Technical Skills</span>
               </div>
               <div className={`h-px w-32 bg-gradient-to-r ${t.gradFrom} to-transparent`} />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`text-6xl md:text-9xl font-medium tracking-tighter leading-none ${t.text}`}
            >
              Technical <br />
              <span className={`italic font-serif ${t.subtle}`}>Arsenal</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`md:pl-12 border-l ${t.border} relative`}
          >
            <div className="absolute top-0 left-[-1px] h-12 w-[1px] bg-gradient-to-b from-white to-transparent" />
            <p className={`text-xl md:text-2xl font-light ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}>
              I combine aesthetic precision with technical robustness to build products that work in production, not just in theory.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24 group/list">
          {skills.map((service, index) => (
            <motion.div
               key={index}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.8 }}
               className={`
                 relative
                 ${index % 2 === 1 ? 'lg:mt-32' : ''}
                 transition-all duration-500 ease-out
                 hover:!opacity-100 group-hover/list:opacity-20
               `}
            >
               {/* Editorial Decorative Corners */}
               <div className="absolute -top-6 -left-6 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-white/10 pointer-events-none" />
               <div className="absolute -bottom-6 -right-6 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-white/10 pointer-events-none" />

               <ServiceCard service={service} index={index} isDark={isDark} t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, isDark, t }: { service: any, index: number, isDark: boolean, t: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`group p-8 rounded-2xl border ${t.card} transition-all duration-500 backdrop-blur-sm`}
    >
      <div className={`mb-8 w-12 h-12 rounded-full ${isDark ? 'bg-white/5' : 'bg-neutral-200'} flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500`}>
        <service.icon className="w-6 h-6" />
      </div>

      <h3 className={`text-xl font-medium mb-4 tracking-tight ${t.text}`}>{service.title}</h3>
      <p className={`${t.muted} font-light leading-relaxed group-hover:${isDark ? 'text-neutral-300' : 'text-neutral-700'} transition-colors`}>
        {service.description}
      </p>
    </motion.div>
  );
};
