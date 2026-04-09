import React from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden hero-gradient flex items-center">
      {/* Capa 1: Fondo de Imagen (Figma/Cloudinary) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1774558459/hero_01_cv1fex.webp" 
          alt="KOVR Hero Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Overlay sofisticado para profundidad y contraste - Optimizado para claridad */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/40 via-transparent to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A14] to-transparent"></div>
      </motion.div>

      <div className="max-w-[1440px] mx-auto w-full px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center relative h-full z-10">
        
        {/* 1. Text Content - Top on Mobile, Left on Desktop */}
        <div className="relative z-30 w-full md:max-w-xl pt-32 md:pt-0 md:-mt-32 flex flex-col items-center md:items-start text-center md:text-left shrink-0">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
            <div className="hidden md:block w-12 h-[1px] bg-[#FF3A2D]"></div>
            <span className="text-[#FF3A2D] font-michroma text-[8px] md:text-[9px] tracking-[4px] md:tracking-[5px]">
              EDICIÓN LIMITADA
            </span>
          </motion.div>

          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-michroma text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-6 tracking-tight uppercase leading-[1.1] drop-shadow-2xl"
          >
            KOVR <br />
            <span className="text-[#FF3A2D] drop-shadow-[0_0_20px_rgba(255,58,45,0.6)]">APEX-70</span>
          </motion.h2>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="font-outfit font-bold text-2xl md:text-4xl">$210.00</span>
            </div>
          </motion.div>
        </div>

        {/* 2. Sneaker Showcase - Middle on Mobile, Center on Desktop */}
        <div className="flex-1 w-full relative z-20 flex items-center justify-center py-8 md:py-0 md:absolute md:inset-0 pointer-events-none">
          <motion.div 
            className="relative animate-float w-full flex justify-center items-center"
            initial={{ scale: 1.2, opacity: 0, rotate: 20 }}
            animate={{ scale: 1, opacity: 1, rotate: -15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <img 
              src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010591/running_hero_cknqsf.png" 
              alt="Sneaker Hero" 
              className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[750px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] md:drop-shadow-[0_80px_120px_rgba(0,0,0,0.6)] drop-shadow-[0_0_100px_rgba(255,58,45,0.3)]"
              referrerPolicy="no-referrer"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* 3. CTA Action - Bottom on Mobile, Bottom Center on Desktop */}
        <div className="relative md:absolute md:left-1/2 md:bottom-[15%] md:-translate-x-1/2 z-40 w-full md:w-auto px-8 md:px-0 pb-12 md:pb-0 flex flex-col items-center">
          <motion.button 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05, letterSpacing: "8px" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-white text-black hover:bg-[#FF3A2D] hover:text-white transition-all duration-500 font-michroma text-[9px] md:text-[10px] px-12 md:px-16 py-5 md:py-4 rounded-full tracking-[4px] md:tracking-[6px] uppercase shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
          >
            ADQUIRIR AHORA
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
