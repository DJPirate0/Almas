import React from 'react';
import { Mail, Phone, ArrowUpRight, MessageCircle, Gem } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

const STUDIO_EMAIL = 'info.almaas.studio@gmail.com';
const STUDIO_PHONE = '923261867468';

export default function Footer({ onViewChange }: FooterProps) {
  
  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello Almas Studio! I would love to collaborate on a project.");
    const whatsappUrl = `https://wa.me/${STUDIO_PHONE}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-card-bg border-t border-border-app text-text-app relative transition-colors duration-300">
      
      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        
        {/* Studio Branding summary Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-text-app text-bg-app flex items-center justify-center shadow-sm">
              <Gem className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Cinzel',serif] text-text-app font-bold text-base tracking-[0.2em] uppercase leading-none">
                Almas
              </span>
              <span className="text-text-dim font-mono text-[8px] tracking-[0.32em] uppercase block mt-1 leading-none font-medium">
                Studio
              </span>
            </div>
          </div>
          
          <p className="text-text-muted text-xs sm:text-sm font-light leading-relaxed max-w-sm">
            Compact bespoke collective crafting modern web code, brand identity, and high-impact visuals.
          </p>
          
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest mt-2 block">
            © {new Date().getFullYear()} Almas Studio. All rights reserved.
          </span>
        </div>

        {/* Sitemap Link Coordinates Column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim mb-2">Navigation</h4>
          <nav className="flex flex-col gap-2.5 font-mono text-xs">
            <button 
              onClick={() => onViewChange('home')} 
              className="text-text-muted hover:text-text-app transition-colors text-left cursor-pointer"
            >
              /HOME
            </button>
            <button 
              onClick={() => onViewChange('showcase')} 
              className="text-text-muted hover:text-text-app transition-colors text-left cursor-pointer"
            >
              /SERVICES
            </button>
            <button 
              onClick={() => onViewChange('estimator')} 
              className="text-text-app hover:text-text-app transition-colors text-left cursor-pointer flex items-center gap-1.5"
            >
              /ORDER_SERVICE
              <ArrowUpRight className="w-3 h-3 text-text-dim" />
            </button>
            <button 
              onClick={() => onViewChange('inquiries')} 
              className="text-text-muted hover:text-text-app transition-colors text-left cursor-pointer"
            >
              /MY_ORDERS
            </button>
          </nav>
        </div>

        {/* Contact Coordinates Column */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim">Contact & Orders</h4>
          
          <div className="flex flex-col gap-3 font-sans text-xs text-text-muted">
            <button
              onClick={handleWhatsAppRedirect}
              className="flex items-center gap-3 hover:text-text-app text-left transition-colors cursor-pointer group"
              id="footer-whatsapp-link"
            >
              <div className="w-8 h-8 rounded-sm bg-bg-app border border-border-app flex items-center justify-center text-text-muted group-hover:border-border-app-hover transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] text-text-dim uppercase tracking-wider block font-mono">WhatsApp</span>
                <span className="font-mono text-xs text-text-app">+92 326 1867468</span>
              </div>
            </button>

            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="flex items-center gap-3 hover:text-text-app text-left transition-colors group"
              id="footer-email-link"
            >
              <div className="w-8 h-8 rounded-sm bg-bg-app border border-border-app flex items-center justify-center text-text-muted group-hover:border-border-app-hover transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[9px] text-text-dim uppercase tracking-wider block font-mono">Studio Email</span>
                <span className="font-mono text-xs text-text-app">{STUDIO_EMAIL}</span>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* PERSISTENT FLOATING WHATSAPP BUTTON (Pinned on bottom-right of viewport) */}
      <button
        onClick={handleWhatsAppRedirect}
        id="floating-whatsapp-badge"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-text-app text-bg-app hover:opacity-90 transition-all shadow-2xl hover:scale-110 active:scale-95 duration-300 cursor-pointer flex items-center justify-center border border-border-app group"
      >
        <MessageCircle className="w-6 h-6 stroke-[2]" />
        
        {/* Floating Tooltip Label */}
        <span className="absolute right-14 scale-0 group-hover:scale-100 origin-right transition-all bg-card-bg text-text-app text-[10px] font-mono uppercase tracking-widest py-1.5 px-3 rounded-sm whitespace-nowrap border border-border-app pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </button>

    </footer>
  );
}
