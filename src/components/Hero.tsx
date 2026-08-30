import React from 'react';
import { ArrowRight, Code, Megaphone, Video, Palette, Flame, Shield, Award, TrendingUp, Gem, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';

interface HeroProps {
  services: Service[];
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
  onSelectService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Megaphone,
  Video,
  Palette,
  Flame,
};

// Framer motion variants for stagger lists
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    } 
  }
};

export default function Hero({ services, onViewChange, onSelectService }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative text-text-app min-h-screen overflow-hidden transition-colors duration-300"
    >
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neutral-800/[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.15] blur-[100px] pointer-events-none" />

      {/* Hero Headline Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-32 pb-20 border-b border-border-app">
        <div className="max-w-4xl">
          {/* Subtle Tagline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-app bg-card-bg mb-8"
          >
            <Gem className="w-3 h-3 text-text-app" />
            <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-text-muted">Almas Studio Collective</span>
          </motion.div>

          {/* Typography Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.08] mb-6 font-medium text-text-app"
          >
            We sculpt <span className="text-text-dim font-serif italic font-normal">digital excellence</span> with bespoke craft.
          </motion.h1>

          {/* Explanatory Lead Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-muted text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mb-10"
          >
            Tailored web engineering, high-impact marketing, cinematic video editing, and timeless identity design. No bloat. Pure craft.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              id="hero-cta-estimator"
              onClick={() => onViewChange('estimator')}
              className="px-7 py-3.5 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2.5 transition-colors duration-300 font-semibold shadow-md"
            >
              Order a Service
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              id="hero-cta-showcase"
              onClick={() => onViewChange('showcase')}
              className="px-7 py-3.5 bg-transparent border border-border-app text-text-muted font-mono text-[11px] tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:bg-card-bg hover:text-text-app"
            >
              Explore Capabilities
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Core Studio Philosophies */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-b border-border-app">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="p-7 border border-border-app bg-card-bg rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-bg-app border border-border-app flex items-center justify-center mb-5 text-text-muted group-hover:border-border-app-hover group-hover:text-text-app transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-sans font-medium tracking-tight mb-2 text-text-app">Tailored Solutions</h3>
            <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed">
              Every project is customized to your unique vision, audience, and functional specifications.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="p-7 border border-border-app bg-card-bg rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-bg-app border border-border-app flex items-center justify-center mb-5 text-text-muted group-hover:border-border-app-hover group-hover:text-text-app transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-sans font-medium tracking-tight mb-2 text-text-app">Bespoke Craft</h3>
            <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed">
              Every digital layout, campaign, and brand asset is created from scratch with meticulous detail.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="p-7 border border-border-app bg-card-bg rounded-sm transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-sm bg-bg-app border border-border-app flex items-center justify-center mb-5 text-text-muted group-hover:border-border-app-hover group-hover:text-text-app transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-sans font-medium tracking-tight mb-2 text-text-app">Measurable Impact</h3>
            <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed">
              Design and code focused on audience engagement, speed, and real business results.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Hub Highlight */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-1">Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-sans tracking-tight font-medium text-text-app">Our Services</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="hero-view-all-services"
            onClick={() => onViewChange('showcase')}
            className="group inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-text-muted hover:text-text-app transition-colors duration-200 cursor-pointer"
          >
            ALL SERVICES
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Dynamic Service Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Code;
            return (
              <motion.div 
                key={service.id} 
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  borderColor: 'var(--border-app-hover)', 
                  backgroundColor: 'var(--card-bg-solid)',
                  boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.12)'
                }}
                className="group relative flex flex-col justify-between p-7 border border-border-app bg-card-bg rounded-sm transition-all duration-300 h-[340px]"
                id={`hero-service-card-${service.id}`}
              >
                {/* Background Image Accent */}
                {service.imageRef && (
                  <div className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none">
                    <div 
                      className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.16] transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                      style={{ 
                        backgroundImage: `url(${service.imageRef})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-80" />
                  </div>
                )}

                <div>
                  <div className="w-10 h-10 rounded-sm bg-bg-app border border-border-app flex items-center justify-center mb-6 text-text-muted group-hover:text-text-app group-hover:border-border-app-hover transition-all duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-sans font-medium tracking-tight mb-2.5 text-text-app">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="pt-5 flex items-center justify-between border-t border-border-app/50 mt-4">
                  <span className="text-[10px] font-mono tracking-widest text-text-dim uppercase">
                    {service.categories.length} Categories
                  </span>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      onViewChange('estimator');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-text-muted group-hover:text-text-app transition-colors cursor-pointer font-medium"
                    id={`btn-quote-${service.id}`}
                  >
                    Order Service
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="bg-card-bg-solid border-t border-border-app py-20 lg:py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Gem className="w-7 h-7 mx-auto text-text-dim mb-6 animate-pulse stroke-[1.5]" />
          <h2 className="text-2xl sm:text-4xl font-sans tracking-tight font-medium mb-4 text-text-app">
            Have a project in mind?
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed mb-8">
            Select your service and tell us what you need. We'll review your vision and kick off immediately.
          </p>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            id="banner-cta"
            onClick={() => onViewChange('estimator')}
            className="px-7 py-3.5 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer inline-flex items-center gap-2.5 font-semibold shadow-md"
          >
            Request a Project
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
}
