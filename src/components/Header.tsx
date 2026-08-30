import React from 'react';
import { Menu, X, Send, Sun, Moon, Gem, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: 'home' | 'showcase' | 'estimator' | 'inquiries';
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
  savedInquiriesCount: number;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Header({ currentView, onViewChange, savedInquiriesCount, theme, onThemeToggle }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'showcase', label: 'Services' },
    { id: 'estimator', label: 'Order' },
    { id: 'inquiries', label: 'My Orders' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-bg-app/90 backdrop-blur-md border-b border-border-app transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo Wordmark */}
        <button 
          onClick={() => { onViewChange('home'); setIsOpen(false); }}
          className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
          id="brand-logo"
        >
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.94 }}
            className="w-9 h-9 rounded-sm bg-text-app text-bg-app flex items-center justify-center transition-all duration-300 shadow-[0_2px_14px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_18px_rgba(255,255,255,0.15)]"
          >
            <Gem className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-['Cinzel',serif] text-text-app font-bold text-lg tracking-[0.22em] uppercase leading-none transition-opacity group-hover:opacity-85">
              Almas
            </span>
            <span className="text-text-dim font-mono text-[8px] tracking-[0.32em] uppercase block mt-1 leading-none font-medium">
              Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onViewChange(item.id)}
              className={`relative py-2 text-[12px] tracking-widest uppercase font-mono transition-colors duration-200 cursor-pointer focus:outline-none ${
                currentView === item.id 
                  ? 'text-text-app font-medium' 
                  : 'text-text-muted hover:text-text-app'
              }`}
            >
              {item.label}
              {item.id === 'inquiries' && savedInquiriesCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-4 w-4 h-4 rounded-full bg-text-app text-bg-app text-[9px] font-bold flex items-center justify-center font-mono"
                >
                  {savedInquiriesCount}
                </motion.span>
              )}
              {currentView === item.id && (
                <motion.span 
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-text-app rounded-full" 
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onThemeToggle}
            className="p-2.5 rounded-sm border border-border-app bg-card-bg text-text-muted hover:text-text-app hover:border-border-app-hover transition-colors duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            id="header-cta"
            onClick={() => onViewChange('estimator')}
            className="px-4 py-2 text-[11px] font-mono tracking-widest uppercase border border-border-app text-text-muted bg-card-bg rounded-sm hover:bg-border-app hover:text-text-app transition-colors duration-200 cursor-pointer flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-text-dim" />
            Request Project
          </motion.button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onThemeToggle}
            className="p-2 rounded-sm border border-border-app bg-card-bg text-text-muted hover:text-text-app transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          {currentView !== 'inquiries' && savedInquiriesCount > 0 && (
            <button 
              onClick={() => onViewChange('inquiries')}
              className="relative p-2 text-text-muted hover:text-text-app transition-colors cursor-pointer"
            >
              <Briefcase className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-text-app text-bg-app text-[9px] font-bold flex items-center justify-center font-mono">
                {savedInquiriesCount}
              </span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-muted hover:text-text-app focus:outline-none transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-card-bg-solid border-b border-border-app absolute top-20 left-0 w-full px-6 py-6 flex flex-col gap-4 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`py-3 text-[13px] tracking-widest uppercase font-mono text-left border-b border-border-app transition-colors ${
                    currentView === item.id ? 'text-text-app pl-2 border-l-2 border-l-text-app font-semibold' : 'text-text-muted'
                  } flex items-center justify-between`}
                >
                  <span>{item.label}</span>
                  {item.id === 'inquiries' && savedInquiriesCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-text-app text-bg-app text-[10px] font-bold flex items-center justify-center font-mono">
                      {savedInquiriesCount}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
