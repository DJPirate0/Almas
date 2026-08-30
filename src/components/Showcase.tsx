import React from 'react';
import { ArrowRight, Code, Megaphone, Video, Palette, Flame, Check, Gem, Clock, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';

interface ShowcaseProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Megaphone,
  Video,
  Palette,
  Flame,
};

// Additional specs for the showcase
const EXTRA_SPECS: Record<string, {
  timeline: string;
  deliverables: string[];
  process: string[];
}> = {
  'web-dev': {
    timeline: '2–4 Weeks',
    deliverables: [
      'Clean React / Next.js code',
      'Figma source designs',
      '90+ PageSpeed score',
      'Deployment & SSL setup'
    ],
    process: ['Wireframes', 'Frontend UI', 'API Integration', 'Launch & QA']
  },
  'digital-marketing': {
    timeline: 'Monthly Cycles',
    deliverables: [
      'Monthly analytics reports',
      'Custom ad creatives & copy',
      'Target audience segments',
      'A/B test logs & pacing'
    ],
    process: ['Audience Research', 'Campaign Setup', 'Launch Creatives', 'ROI Optimization']
  },
  'video-editing': {
    timeline: '3–5 Days',
    deliverables: [
      '4K / 1080p Master exports',
      'Dynamic caption files (.SRT)',
      'Multi-aspect ratios (9:16, 16:9)',
      'Licensed sound staging'
    ],
    process: ['Rough Cut', 'Pacing & Captions', 'Color & Sound', 'Final Master']
  },
  'graphic-designing': {
    timeline: '5–7 Days',
    deliverables: [
      'Vector files (AI, SVG, Figma)',
      'High-res web & print assets',
      'Design style sheet',
      'Full commercial rights'
    ],
    process: ['Brief & Moodboard', 'Visual Concepts', 'Refinements', 'Asset Delivery']
  },
  'logo-making': {
    timeline: '1–2 Weeks',
    deliverables: [
      'Primary & secondary marks',
      'Vector files (SVG, PDF, EPS)',
      'Color palette & type pairings',
      'Social profile icon kit'
    ],
    process: ['Discovery', 'Geometry & Marks', 'Type Pairings', 'Asset Package']
  }
};

export default function Showcase({ services, onSelectService, onViewChange }: ShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.id === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-text-app min-h-screen pb-24 overflow-hidden transition-colors duration-300"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.08] blur-[120px] pointer-events-none" />

      {/* Page Title Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10 border-b border-border-app">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-2">Capabilities</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight mb-4 text-text-app">Our Services</h1>
          <p className="text-text-muted text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Explore our bespoke digital engineering, brand identity, and creative production services.
          </p>
        </motion.div>
      </section>

      {/* Categories Switch Filter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap items-center gap-2.5 border-b border-border-app">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory('all')}
          className={`relative px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-text-app text-bg-app border-text-app font-semibold shadow-sm'
              : 'bg-transparent text-text-muted border-border-app hover:text-text-app hover:border-border-app-hover'
          }`}
          id="filter-all"
        >
          All Services
        </motion.button>
        {services.map((service) => (
          <motion.button
            key={service.id}
            id={`filter-${service.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(service.id)}
            className={`relative px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-widest border transition-all cursor-pointer ${
              selectedCategory === service.id
                ? 'bg-text-app text-bg-app border-text-app font-semibold shadow-sm'
                : 'bg-transparent text-text-muted border-border-app hover:text-text-app hover:border-border-app-hover'
            }`}
          >
            {service.name}
          </motion.button>
        ))}
      </section>

      {/* Main Service Detailed List */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col gap-20">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Code;
            const specs = EXTRA_SPECS[service.id] || { timeline: 'Flexible', deliverables: [], process: [] };

            return (
              <motion.div 
                layout
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start scroll-mt-24 border-b border-border-app/40 pb-16 last:border-0 last:pb-0"
                id={`showcase-service-${service.id}`}
              >
                
                {/* Left Column: Core Info & Visual */}
                <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-sm bg-bg-app border border-border-app flex items-center justify-center text-text-app">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-text-app">{service.name}</h2>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-text-dim font-mono uppercase">
                        <Clock className="w-3 h-3" />
                        <span>Timeline: {specs.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main description */}
                  <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed">
                    {service.detailedDescription}
                  </p>

                  {/* Custom Visual Imagery */}
                  {service.imageRef && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[16/10] w-full rounded-sm overflow-hidden border border-border-app relative group shadow-sm bg-card-bg"
                    >
                      <img 
                        src={service.imageRef} 
                        alt={service.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] brightness-[0.98] dark:brightness-[0.9] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-bg-app/90 backdrop-blur-md border border-border-app text-[9px] font-mono uppercase tracking-wider text-text-app shadow-sm pointer-events-none">
                        {service.name}
                      </div>
                    </motion.div>
                  )}

                  {/* Order CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectService(service.id);
                      onViewChange('estimator');
                    }}
                    id={`showcase-cta-${service.id}`}
                    className="px-5 py-3.5 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-md hover:opacity-90"
                  >
                    Order This Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Right Column: Deliverables, Process & Modules Catalog */}
                <div className="lg:col-span-7 flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-border-app lg:pl-10 pt-6 lg:pt-0">
                  
                  {/* Deliverables */}
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-3">Deliverables</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {specs.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-1.5 rounded-sm">
                          <Check className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                          <span className="text-text-muted text-xs font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-3">Workflow</h3>
                    <div className="flex flex-wrap gap-2">
                      {specs.process.map((step, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-card-bg border border-border-app text-xs font-light text-text-muted"
                        >
                          <span className="text-[10px] font-mono text-text-dim">{i+1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Modules & Capabilities */}
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Available Modules & Scopes
                    </h3>
                    <div className="flex flex-col gap-3">
                      {service.categories.map((cat) => (
                        <div key={cat.id} className="border border-border-app bg-card-bg p-5 rounded-sm">
                          <h4 className="text-xs font-sans font-medium mb-3 text-text-app border-b border-border-app pb-2">{cat.name}</h4>
                          <div className="flex flex-col gap-3">
                            {cat.options.map((opt) => (
                              <div key={opt.id} className="flex items-start justify-between gap-3 pb-2.5 border-b border-border-app/50 last:border-0 last:pb-0">
                                <div>
                                  <span className="text-xs font-sans font-medium text-text-app block">{opt.name}</span>
                                  <span className="text-[11px] text-text-muted block leading-relaxed mt-0.5">{opt.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Bottom Showcase CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-16 mt-8 border-t border-border-app">
        <Gem className="w-6 h-6 mx-auto text-text-dim mb-5 animate-pulse stroke-[1.5]" />
        <h3 className="text-xl sm:text-2xl font-sans font-medium mb-3 text-text-app">Ready to bring your project to life?</h3>
        <p className="text-text-muted text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed mb-6">
          Submit your project requirements directly to our team.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange('estimator')}
          className="px-6 py-3.5 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer inline-flex items-center gap-2 font-semibold shadow-md hover:opacity-90 transition-opacity"
        >
          Request a Project
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </section>
    </motion.div>
  );
}
