import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Work', to: '/work' },
    { name: 'About', to: '/#about' },
    { name: 'Skills', to: '/#services' },
    { name: 'Contact', to: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-neutral-950/80 backdrop-blur-md py-4 border-b border-white/5'
            : 'bg-white/80 backdrop-blur-md py-4 border-b border-black/5'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-2xl font-bold tracking-tighter mix-blend-difference z-50">
            ALTAMISH
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={item.to}
                className={`text-sm uppercase tracking-widest transition-colors relative group ${isDark ? 'hover:text-white/70' : 'text-neutral-700 hover:text-neutral-900'}`}
                onClick={(e) => {
                  if (item.to.includes('#')) {
                    e.preventDefault();
                    const id = item.to.split('#')[1];
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full ${isDark ? 'bg-white' : 'bg-neutral-900'}`} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Theme Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-colors duration-300 ${
            isDark
              ? 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
              : 'border-black/10 text-neutral-500 hover:text-neutral-900 hover:border-black/30'
          }`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden z-50 ${isDark ? 'text-white' : 'text-neutral-900'}`}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "tween", duration: 0.4 }}
              className={`fixed inset-0 flex flex-col items-center justify-center gap-12 md:hidden ${isDark ? 'bg-neutral-950' : 'bg-white'}`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-4xl font-medium tracking-tight transition-colors ${isDark ? 'hover:text-neutral-500' : 'text-neutral-900 hover:text-neutral-500'}`}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};