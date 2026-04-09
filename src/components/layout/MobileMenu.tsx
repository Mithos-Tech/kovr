import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Page } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setActivePage: (page: Page) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  setActivePage
}) => {
  const handleNavClick = (page: Page, sectionId?: string) => {
    setActivePage(page);
    setIsOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 md:hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#0A0A14]/60 backdrop-blur-md"
          />

          {/* Floating Card Menu */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[320px] bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Close Button - Sophisticated & Minimal */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <X size={18} />
            </button>

            {/* Logo Watermark - Increased visibility */}
            <div className="flex justify-center mb-12">
              <img 
                src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
                alt="KOVR Logo" 
                className="w-10 h-10 object-contain opacity-100"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Navigation Links - Centered & Fino */}
            <div className="flex flex-col items-center gap-2">
              {[
                { name: 'INICIO', action: () => handleNavClick('home') },
                { name: 'TENDENCIAS', action: () => handleNavClick('home', 'trends') },
                { name: 'COLECCIÓN', action: () => handleNavClick('collection') },
                { name: 'ADN KOVR', action: () => handleNavClick('home', 'lifestyle') }
              ].map((item, i) => (
                <motion.button 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  key={item.name} 
                  className="group relative w-full py-4 flex flex-col items-center justify-center"
                  onClick={item.action}
                >
                  <span className="font-michroma text-[10px] tracking-[5px] text-white/80 group-hover:text-[#FF3A2D] transition-colors duration-300">
                    {item.name}
                  </span>
                  
                  {/* Underline Effect */}
                  <motion.div 
                    className="h-[1px] bg-[#FF3A2D] mt-2"
                    initial={{ width: 0 }}
                    whileHover={{ width: 20 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Footer Info - Improved visibility */}
            <div className="mt-12 pt-8 border-t border-white/20 text-center">
              <p className="font-outfit text-[10px] tracking-[4px] text-white/60 uppercase">
                KOVR © 2026
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
