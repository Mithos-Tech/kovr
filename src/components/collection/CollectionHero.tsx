import React from 'react';
import { motion } from 'motion/react';

const CollectionHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A14]">
      {/* Background Image: User Provided Collection Hero */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775605948/hero_collection_cyu2lc.webp" 
          alt="Collection Hero Background" 
          className="w-full h-full object-cover opacity-100 transition-transform duration-[8000ms] scale-[1.02] hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Lighter, More Transparent Overlays for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14]/60 via-transparent to-[#0A0A14]/60"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Color Glows for Vitality */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#1E3A8A]/10 via-transparent to-[#FF3A2D]/5 pointer-events-none"></div>
      </div>

      <div className="relative z-10 text-center px-8 pt-24 md:pt-32">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <motion.span 
            initial={{ letterSpacing: "4px", opacity: 0 }}
            animate={{ letterSpacing: "12px", opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-[#FF3A2D] font-syncopate font-bold text-[9px] md:text-[11px] block mb-10 uppercase drop-shadow-[0_0_15px_rgba(255,58,45,0.6)]"
          >
            — SEASON 2026 —
          </motion.span>
          
          <h1 className="font-bebas text-7xl sm:text-8xl md:text-[160px] lg:text-[220px] leading-[0.8] tracking-tighter text-white mb-12 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            THE NEW <br />
            <span className="text-outline-white opacity-100">STANDARD</span>
          </h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1, delay: 1 }}
            className="h-[1px] bg-[#FF3A2D] mb-12 shadow-[0_0_30px_rgba(255,58,45,1)]"
          ></motion.div>

          <p className="max-w-2xl mx-auto font-outfit text-white text-base md:text-2xl font-light leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Explora la culminación de la ingeniería urbana. Cada modelo en esta colección ha sido refinado para ofrecer el máximo rendimiento sin sacrificar la estética.
          </p>
        </motion.div>
      </div>

      {/* Interactive Scroll Indicator with Pulse */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="font-syncopate text-[8px] tracking-[6px] text-white/60 uppercase animate-pulse">EXPLORE COLLECTION</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#FF3A2D] via-[#FF3A2D]/40 to-transparent shadow-[0_0_15px_rgba(255,58,45,0.4)]"></div>
      </motion.div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </section>
  );
};

export default CollectionHero;
