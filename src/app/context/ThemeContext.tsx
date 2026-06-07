import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
});

export const useTheme = () => useContext(ThemeContext);

/** Reusable semantic class helpers to keep components DRY */
export const tc = (isDark: boolean) => ({
  pageBg:    isDark ? 'bg-neutral-950' : 'bg-gray-50',
  surface:   isDark ? 'bg-neutral-900' : 'bg-neutral-200',
  card:      isDark ? 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10' : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50',
  text:      isDark ? 'text-white' : 'text-neutral-900',
  muted:     isDark ? 'text-neutral-400' : 'text-neutral-500',
  subtle:    isDark ? 'text-neutral-500' : 'text-neutral-400',
  faint:     isDark ? 'text-neutral-600' : 'text-neutral-400',
  border:    isDark ? 'border-white/10' : 'border-neutral-200',
  thinBorder:isDark ? 'border-white/5'  : 'border-neutral-100',
  accent:    isDark ? 'bg-white text-black' : 'bg-neutral-900 text-white',
  accentHover: isDark ? 'hover:bg-neutral-200' : 'hover:bg-neutral-700',
  grid:      isDark
    ? 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]'
    : 'bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)]',
  ringBorder:isDark ? 'border-white/10' : 'border-neutral-300',
  gradFrom:  isDark ? 'from-white/30' : 'from-neutral-400/40',
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('portfolio-theme') as Theme) || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};
