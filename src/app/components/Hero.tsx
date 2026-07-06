import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme, tc } from '../context/ThemeContext';
import { fetchSiteContent, defaultSiteContent, type HeroData } from '../data/firebaseData';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { isDark } = useTheme();
  const t = tc(isDark);

  const [hero, setHero] = useState<HeroData>(defaultSiteContent.hero);

  useEffect(() => {
    fetchSiteContent().then((content) => setHero(content.hero));
  }, []);

  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className={`relative h-screen flex items-center justify-center overflow-hidden px-6 ${t.pageBg} transition-colors duration-500`}>

      {/* Background glows */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className={`absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] ${isDark ? 'bg-violet-900/20' : 'bg-violet-200/40'} rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]`} />
        <div className={`absolute bottom-[-20%] right-[20%] w-[50vw] h-[50vw] ${isDark ? 'bg-blue-900/20' : 'bg-blue-200/40'} rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]`} />
      </motion.div>

      {/* Grid overlay */}
      <div className={`absolute inset-0 ${t.grid} bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0`} />

      {/* Geometric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className={`absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border ${t.ringBorder} border-dashed opacity-50`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className={`absolute w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border ${t.ringBorder} opacity-40`}
        >
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${isDark ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-neutral-800 shadow-[0_0_12px_rgba(0,0,0,0.3)]'} rounded-full`} />
        </motion.div>
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className={`absolute w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] rounded-full border ${isDark ? 'border-white/5' : 'border-neutral-200'} border-dotted opacity-50`}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${t.border} ${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md text-xs font-mono tracking-widest uppercase ${t.muted}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {hero.statusText}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`text-7xl md:text-[11rem] font-medium tracking-tighter leading-[0.85] mb-12 ${t.text}`}
        >
          {hero.firstName} <br />
          <span className={`italic font-serif ${t.subtle}`}>{hero.lastName}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col md:flex-row items-center gap-6 md:gap-16 text-lg font-light ${t.muted} max-w-4xl mx-auto`}
        >
          <p className="md:text-right flex-1 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {hero.taglineLeft}
          </p>
          <div className={`w-px h-16 ${isDark ? 'bg-white/10' : 'bg-neutral-300'} hidden md:block`} />
          <p className="md:text-left flex-1 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {hero.taglineRight}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className={`text-[10px] font-mono uppercase tracking-widest ${t.faint}`}>Scroll</span>
        <div className={`w-[1px] h-24 bg-gradient-to-b from-transparent ${isDark ? 'via-white/20' : 'via-neutral-400'} to-transparent overflow-hidden`}>
          <motion.div
            animate={{ y: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className={`w-full h-1/2 bg-gradient-to-b from-transparent ${isDark ? 'via-white' : 'via-neutral-700'} to-transparent`}
          />
        </div>
      </motion.div>
    </section>
  );
};
