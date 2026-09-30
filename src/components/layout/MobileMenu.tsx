import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Heart, ShoppingCart } from 'lucide-react';
import { Page } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setActivePage: (page: Page) => void;
  onNavigate?: (page: Page, sectionId?: string) => void;
  onOpenLegal?: (tab: any) => void;
  onOpenSearch?: () => void;
  onOpenWishlist?: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  setActivePage,
  onNavigate,
  onOpenLegal,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  cartCount = 0,
  wishlistCount = 0
}) => {
  const handleNavClick = (page: Page, sectionId?: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      setActivePage(page);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
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
            className="absolute inset-0 bg-[#0A0A14]/70 backdrop-blur-md"
          />

          {/* Floating Card Menu - Framer Aesthetic */}
          <motion.div 
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[340px] max-h-[90vh] overflow-y-auto bg-[#111827]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-[0_40px_90px_rgba(0,0,0,0.8)] no-scrollbar"
          >
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Header: Logo Brand & Close Button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div 
                className="flex items-center gap-2.5 cursor-pointer group"
                onClick={() => handleNavClick('home')}
              >
                <img 
                  src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
                  alt="KOVR Logo" 
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="font-michroma font-bold text-xs tracking-tight text-white group-hover:text-[#FF3A2D] transition-colors">
                  KOVR
                </span>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Navigation Links - Fino & Menos Interlineado (Estilo Framer) */}
            <nav className="flex flex-col gap-1 py-1">
              {[
                { name: 'INICIO', action: () => handleNavClick('home') },
                { name: 'TENDENCIAS', action: () => handleNavClick('home', 'trends') },
                { name: 'COLECCIÓN', action: () => handleNavClick('collection') },
                { name: 'ADN KOVR', action: () => handleNavClick('home', 'lifestyle') }
              ].map((item, i) => (
                <motion.button 
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 + 0.1 }}
                  key={item.name} 
                  className="group relative w-full py-2.5 px-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-all duration-300 cursor-pointer text-left"
                  onClick={item.action}
                >
                  <span className="font-michroma text-[9px] tracking-[3px] text-white/80 group-hover:text-[#FF3A2D] transition-colors duration-300">
                    {item.name}
                  </span>
                  
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3A2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              ))}
            </nav>

            {/* Quick Action Dock - Search, Wishlist, Cart en un solo lugar */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
              {/* Botón Buscar */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
                className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF3A2D] hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                aria-label="Abrir buscador"
              >
                <Search size={16} className="text-white/70 group-hover:text-[#FF3A2D] transition-colors" />
                <span className="font-syncopate text-[7px] tracking-[1.5px] text-white/60 group-hover:text-white transition-colors">
                  BUSCAR
                </span>
              </button>

              {/* Botón Favoritos */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenWishlist) onOpenWishlist();
                }}
                className="relative p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FF3A2D] hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                aria-label="Ver productos favoritos"
              >
                <div className="relative">
                  <Heart size={16} className={`transition-colors ${wishlistCount > 0 ? 'fill-[#FF3A2D] text-[#FF3A2D]' : 'text-white/70 group-hover:text-[#FF3A2D]'}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#FF3A2D] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="font-syncopate text-[7px] tracking-[1.5px] text-white/60 group-hover:text-white transition-colors">
                  DESEOS
                </span>
              </button>

              {/* Botón Carrito */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenCart) onOpenCart();
                }}
                className="relative p-3 rounded-2xl bg-[#FF3A2D]/10 border border-[#FF3A2D]/30 hover:border-[#FF3A2D] hover:bg-[#FF3A2D]/20 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                aria-label="Ver carrito de compras"
              >
                <div className="relative">
                  <ShoppingCart size={16} className="text-[#FF3A2D] group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#FF3A2D] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-md">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-syncopate text-[7px] tracking-[1.5px] text-[#FF3A2D] font-bold group-hover:text-white transition-colors">
                  CARRITO
                </span>
              </button>
            </div>

            {/* Footer Info */}
            <div className="mt-5 pt-3.5 border-t border-white/10 text-center">
              <p className="font-outfit text-[9px] tracking-[2px] text-white/50">
                KOVR © 2026 by <span className="text-[#FF3A2D]">Inspyrio Studio</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
