import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Page } from '../../types';

interface LifestyleProps {
  lifestyleRef: React.RefObject<HTMLElement | null>;
  lifestyleScroll: MotionValue<number>;
  setActivePage: (page: Page) => void;
}

const Lifestyle: React.FC<LifestyleProps> = ({
  lifestyleRef,
  lifestyleScroll,
  setActivePage
}) => {
  const yParallax = useTransform(lifestyleScroll, [0, 1], [-50, 50]);

  return (
    <section 
      id="lifestyle"
      ref={lifestyleRef}
      className="relative min-h-screen w-full bg-[#0A0A14] flex items-center justify-center overflow-hidden"
    >
      {/* Fondo: Imagen Full-Bleed 100% Nítida con Parallax sutil */}
      <motion.div 
        style={{ 
          y: yParallax,
          scale: 1.05 
        }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775499212/Estilo_yzigdi.png" 
          alt="Lifestyle Urban KOVR" 
          className="w-full h-full object-cover contrast-[1.05] brightness-[0.9]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </motion.div>

      {/* Contenido: Tarjeta de Cristal Flotante */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-center lg:justify-start">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full max-w-xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          {/* Brillo de borde animado sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10">
            <span className="text-[#FF3A2D] font-outfit font-bold text-[10px] md:text-[11px] tracking-[4px] md:tracking-[6px] block mb-6 md:mb-8 uppercase">
              — THE URBAN DNA
            </span>
            
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-8xl leading-[0.85] mb-8 md:mb-10 tracking-tighter text-white">
              DISEÑADO <br />
              <span className="text-[#FF3A2D]">PARA GANAR.</span>
            </h2>
            
            <p className="font-outfit text-white/60 text-sm md:text-lg leading-relaxed mb-10 md:mb-12 font-light">
              KOVR no es solo calzado; es una declaración de intenciones. Ingeniería aplicada al caos urbano. Cada paso es una victoria sobre el asfalto.
            </p>
            
            <div className="flex items-center gap-8 md:gap-12 mb-10 md:mb-12">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bebas text-white">200+</span>
                <span className="text-[8px] md:text-[9px] font-syncopate text-white/30 tracking-[2px] md:tracking-[3px] uppercase mt-1">Modelos</span>
              </div>
              <div className="w-[1px] h-8 md:h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bebas text-white">15+</span>
                <span className="text-[8px] md:text-[9px] font-syncopate text-white/30 tracking-[2px] md:tracking-[3px] uppercase mt-1">Países</span>
              </div>
            </div>

            <button 
              onClick={() => setActivePage('collection')}
              className="group/btn flex items-center gap-6 text-white font-syncopate text-[10px] tracking-[4px] hover:text-[#FF3A2D] transition-all duration-500"
            >
              <span className="relative py-2">
                EXPLORAR COLECCIÓN
                <span className="absolute bottom-0 left-0 w-6 h-[1px] bg-[#FF3A2D] transition-all duration-500 group-hover/btn:w-full"></span>
              </span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-[#FF3A2D] group-hover/btn:bg-[#FF3A2D] transition-all duration-500">
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decoración: Líneas técnicas minimalistas */}
      <div className="absolute top-0 left-1/2 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 w-[1px] h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
    </section>
  );
};

export default Lifestyle;
