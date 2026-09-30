import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';

import { LegalSection, Page } from '../../types';

interface FooterProps {
  setActivePage: (page: Page) => void;
  setSelectedTrendCategory: (category: string) => void;
  onOpenLegal: (tab: LegalSection) => void;
  onNavigate?: (page: Page, sectionId?: string) => void;
  onOpenCollectionCategory?: (category: string) => void;
  onOpenStarProduct?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  setActivePage, 
  setSelectedTrendCategory, 
  onOpenLegal, 
  onNavigate,
  onOpenCollectionCategory,
  onOpenStarProduct
}) => {
  const currentYear = 2026;

  const handleNav = (page: Page, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setActivePage(page);
    }
  };

  const footerLinks = [
    {
      title: "CATÁLOGO & MODELOS",
      links: [
        { 
          name: "COLECCIÓN COMPLETA", 
          action: () => { 
            if (onOpenCollectionCategory) onOpenCollectionCategory('TODOS');
            else handleNav('collection');
          } 
        },
        { 
          name: "LIFESTYLE & STREET", 
          action: () => { 
            if (onOpenCollectionCategory) onOpenCollectionCategory('LIFESTYLE');
            else handleNav('collection');
          } 
        },
        { 
          name: "RUNNING PERFORMANCE", 
          action: () => { 
            if (onOpenCollectionCategory) onOpenCollectionCategory('RUNNING');
            else handleNav('collection');
          } 
        },
        { 
          name: "JORDAN STREETWEAR", 
          action: () => { 
            if (onOpenCollectionCategory) onOpenCollectionCategory('JORDAN');
            else handleNav('collection');
          } 
        },
        { 
          name: "TRAINING & FITNESS", 
          action: () => { 
            if (onOpenCollectionCategory) onOpenCollectionCategory('TRAINING');
            else handleNav('collection');
          } 
        },
        { 
          name: "MÁS VENDIDOS (ELITE)", 
          action: () => handleNav('home', 'bestsellers')
        }
      ]
    },
    {
      title: "EXPLORAR & ADN",
      links: [
        { 
          name: "INICIO (PORTADA)", 
          action: () => handleNav('home') 
        },
        { 
          name: "TENDENCIAS URBANAS", 
          action: () => handleNav('home', 'trends') 
        },
        { 
          name: "ADN KOVR (ESTILO)", 
          action: () => handleNav('home', 'lifestyle') 
        },
        { 
          name: "INNOVACIÓN TÉCNICA", 
          action: () => handleNav('collection', 'innovacion') 
        },
        { 
          name: "EDICIÓN APEX-70", 
          action: () => {
            if (onOpenStarProduct) onOpenStarProduct();
            else handleNav('home', 'hero');
          } 
        }
      ]
    },
    {
      title: "ASISTENCIA & LEGAL",
      links: [
        { name: "GUÍA DE TALLAS", action: () => onOpenLegal('tallas') },
        { name: "ENVÍOS Y DEVOLUCIONES", action: () => onOpenLegal('envios') },
        { name: "SOPORTE CONCIERGE (24/7)", action: () => onOpenLegal('soporte') },
        { name: "POLÍTICA DE PRIVACIDAD", action: () => onOpenLegal('privacidad') },
        { name: "TÉRMINOS Y CONDICIONES", action: () => onOpenLegal('terminos') },
        { name: "POLÍTICA DE COOKIES", action: () => onOpenLegal('cookies') }
      ]
    }
  ];

  return (
    <footer className="bg-[#0A0A14] pt-32 pb-12 relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#FF3A2D]/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5">
            <div 
              className="flex items-center gap-4 mb-10 cursor-pointer group w-fit"
              onClick={() => handleNav('home')}
            >
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
                alt="KOVR Logo" 
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
              <h2 className="font-bebas text-4xl tracking-tight text-white group-hover:text-[#FF3A2D] transition-colors">KOVR</h2>
            </div>
            <p className="font-outfit text-white/80 text-lg leading-relaxed max-w-md mb-12">
              Redefiniendo el calzado urbano a través de la ingeniería de precisión y el diseño vanguardista. Hecho para los que dominan la calle.
            </p>
            
            <div className="flex gap-6">
              {[
                { icon: <Instagram size={20} />, label: "INSTAGRAM", href: "https://instagram.com" },
                { icon: <Twitter size={20} />, label: "TWITTER", href: "https://twitter.com" },
                { icon: <Facebook size={20} />, label: "FACEBOOK", href: "https://facebook.com" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar KOVR en ${social.label}`}
                  whileHover={{ y: -5 }}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/90 hover:text-[#FF3A2D] hover:border-[#FF3A2D] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12">
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className="font-syncopate text-[10px] font-bold tracking-[4px] text-white/60 mb-6 sm:mb-10 uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <button 
                        onClick={link.action}
                        className="group flex items-center gap-2 font-outfit text-sm text-white/80 hover:text-white transition-colors duration-300 text-left cursor-pointer"
                      >
                        {link.name}
                        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Brand Identity - The "Framer" Touch */}
        <div className="relative pt-16 sm:pt-20 border-t border-white/10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="w-full text-center select-none mb-8 sm:mb-12 cursor-pointer group"
            onClick={() => handleNav('home')}
            title="Volver al inicio"
          >
            <h1 className="font-bebas text-[22vw] leading-[0.7] tracking-[-0.05em] text-white/5 group-hover:text-white/10 transition-colors inline-block">
              KOVR
            </h1>
          </motion.div>

          <div className="text-center">
            <p className="font-outfit text-xs sm:text-sm tracking-widest text-white/80">
              © {currentYear} KOVR by <span className="text-[#FF3A2D]">Inspyrio Studio</span>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
