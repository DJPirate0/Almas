import { Service } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    shortDescription: 'High-performance websites, web apps, and bespoke digital platforms.',
    detailedDescription: 'Fast, search-optimized web experiences engineered with modern tech stacks. Built for speed, responsiveness, security, and clean aesthetics.',
    iconName: 'Code',
    imageRef: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'web-types',
        name: 'Core Architecture',
        description: 'Choose the scope and structural format for your web presence.',
        options: [
          {
            id: 'landing-page',
            name: 'Landing Page',
            description: 'High-converting single-page layout with interactive sections and motion design.'
          },
          {
            id: 'corp-site',
            name: 'Corporate Website',
            description: 'Multi-page digital portal (up to 7 pages) with custom service showcases and team sections.'
          },
          {
            id: 'ecommerce',
            name: 'E-Commerce Store',
            description: 'Complete digital shop architecture, product grid, cart system, and secure payment checkout.'
          },
          {
            id: 'custom-app',
            name: 'Web Application & SaaS',
            description: 'Custom interactive dashboards, user authentication, database logic, and third-party API integrations.'
          }
        ]
      },
      {
        id: 'web-addons',
        name: 'Performance & Add-ons',
        description: 'Enhance organic search rankings, content autonomy, and continuous reliability.',
        options: [
          {
            id: 'seo-setup',
            name: 'Technical SEO Optimization',
            description: 'Schema markup, Core Web Vitals performance tuning, and search index optimization.'
          },
          {
            id: 'cms-integration',
            name: 'Headless CMS Integration',
            description: 'Visual publishing dashboard enabling your team to edit content without code.'
          },
          {
            id: 'maintenance-monthly',
            name: 'Ongoing Maintenance & Support',
            description: 'Routine backups, security monitoring, performance audits, and priority technical support.'
          }
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    shortDescription: 'Targeted growth campaigns, search rankings, and strategic social management.',
    detailedDescription: 'Data-backed marketing frameworks that combine storytelling with analytics to drive compounding reach, qualified leads, and brand authority.',
    iconName: 'Megaphone',
    imageRef: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'marketing-organic',
        name: 'Organic Growth & Search',
        description: 'Build organic authority across search engines and key social channels.',
        options: [
          {
            id: 'social-mgmt',
            name: 'Social Media Management',
            description: 'Content calendar planning, high-impact copywriting, posting schedule, and audience curation.'
          },
          {
            id: 'seo-monthly',
            name: 'Search Engine Optimization (SEO)',
            description: 'High-intent keyword research, technical on-page optimization, and authoritative backlink strategies.'
          },
          {
            id: 'content-copywriting',
            name: 'Content & Editorial Strategy',
            description: 'Thought-leadership articles, case studies, and email newsletter campaigns tailored for conversion.'
          }
        ]
      },
      {
        id: 'marketing-paid',
        name: 'Paid Advertising & Funnels',
        description: 'High-converting ad campaigns on high-intent search and social platforms.',
        options: [
          {
            id: 'ppc-management',
            name: 'Meta & Google Ads Management',
            description: 'Audience modeling, creative testing, pixel conversion tracking, and continuous ROI optimization.'
          },
          {
            id: 'landing-marketing',
            name: 'Funnel Optimization & Sales Copy',
            description: 'Dedicated high-converting landing page copywriting and user conversion funnel architecture.'
          }
        ]
      }
    ]
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    shortDescription: 'Cinematic post-production, viral shorts, and crisp commercial edits.',
    detailedDescription: 'Dynamic pacing, custom sound design, color grading, and motion graphics tailored for maximum audience retention across digital channels.',
    iconName: 'Video',
    imageRef: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'social-video',
        name: 'Short-Form & Social Media',
        description: 'Engaging vertical videos crafted for TikTok, Reels, and YouTube Shorts virality.',
        options: [
          {
            id: 'reel-short',
            name: 'Single Viral Reel / TikTok',
            description: 'Up to 60s edit with kinetic typography, hooks, sound design, and trend-aligned pacing.'
          },
          {
            id: 'social-bundle',
            name: 'Monthly Short-Form Content Package',
            description: 'Batch production of 12 branded shorts with sound design, color grading, and thumbnail titles.'
          }
        ]
      },
      {
        id: 'long-video',
        name: 'Long-Form & Commercial Production',
        description: 'Polished edits for YouTube channels, brand promotions, and corporate showcases.',
        options: [
          {
            id: 'corporate-promo',
            name: 'Commercial Brand Promo',
            description: 'Cinematic commercial edit with bespoke color grading, b-roll curation, and audio mastering.'
          },
          {
            id: 'youtube-edit',
            name: 'YouTube Long-Form Editorial Cut',
            description: 'Structured narrative pacing, jump-cut cleaning, sound effects, and motion overlays.'
          },
          {
            id: 'motion-graphics',
            name: 'Motion Graphics & Title Animations',
            description: 'Custom animated lower-thirds, 2D visual cues, logo stings, and infographic overlays.'
          }
        ]
      }
    ]
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Design',
    shortDescription: 'Brand design systems, marketing visuals, and vector print layouts.',
    detailedDescription: 'Clear visual communication across digital screens and physical packaging, crafted with disciplined typography and balanced negative space.',
    iconName: 'Palette',
    imageRef: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'graphic-digital',
        name: 'Digital & Social Design',
        description: 'High-impact visual collateral designed for digital advertising and web presence.',
        options: [
          {
            id: 'social-post-bundle',
            name: 'Social Media Design Kit',
            description: 'Custom multi-platform post templates, banner sets, and carousel graphics.'
          },
          {
            id: 'brand-book',
            name: 'Brand Guidelines & Design Manual',
            description: 'Comprehensive brand standards, typography hierarchies, color swatches, and usage rules.'
          },
          {
            id: 'digital-brochure',
            name: 'Pitch Deck & Presentation Design',
            description: 'High-stakes investor pitch deck, sales presentations, and interactive digital PDFs.'
          }
        ]
      },
      {
        id: 'graphic-print',
        name: 'Print, Merchandise & Packaging',
        description: 'Vector-accurate production layouts ready for physical manufacturing.',
        options: [
          {
            id: 'stationery',
            name: 'Corporate Stationery Suite',
            description: 'Business cards, letterheads, invoice templates, and branded presentation folders.'
          },
          {
            id: 'packaging-design',
            name: 'Product Packaging & Label Design',
            description: 'Custom box die-lines, bottle labels, retail packaging, and realistic 3D mockups.'
          }
        ]
      }
    ]
  },
  {
    id: 'logo-making',
    name: 'Logo Design',
    shortDescription: 'Timeless brandmarks, minimalist logos, and complete identity suites.',
    detailedDescription: 'Distinctive brand marks engineered with geometric precision to scale seamlessly from digital favicons to architectural signage.',
    iconName: 'Flame',
    imageRef: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    categories: [
      {
        id: 'logo-types',
        name: 'Brand Identity Packages',
        description: 'Select your preferred identity scope and deliverable asset package.',
        options: [
          {
            id: 'minimalist-logo',
            name: 'Minimalist Vector Logo Mark',
            description: 'Original concepts, vector source files (SVG, AI, EPS), monochrome alternates, and icon marks.'
          },
          {
            id: 'logo-premium-3d',
            name: '3D Emblem & Textured Insignia',
            description: 'Sculpted emblem styling with rich textural lighting, metallic finishes, and 3D mockups.'
          },
          {
            id: 'full-logo-suite',
            name: 'Full Visual Identity Suite',
            description: 'Primary logo, secondary badge, sub-mark, favicon, color palette, and animated logo bumper.'
          },
          {
            id: 'illustrative-mascot',
            name: 'Custom Illustrative & Mascot Mark',
            description: 'Handcrafted custom character artwork, intricate heraldic crest, or detailed visual emblem.'
          }
        ]
      }
    ]
  }
];
