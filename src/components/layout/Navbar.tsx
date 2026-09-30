import React from 'react';
import { motion } from 'motion/react';
import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Page } from '../../types';

interface NavbarProps {
  isVisible: boolean;
  activePage: Page;
  setActivePage: (page: Page) => void;
  cartCount: number;
  wishlistCount?: number;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setSelectedTrendCategory: (category: string) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist?: () => void;
  onNavigate?: (page: Page, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isVisible,
  activePage,
  setActivePage,
  cartCount,
  wishlistCount = 0,
  setIsMobileMenuOpen,
  setSelectedTrendCategory,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onNavigate
}) => {
  const handleNavClick = (page: Page, sectionId?: string) => {
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

  if (!isVisible) return null;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, scale: 0.95 }}
      animate={{ y: 30, opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring', 
        damping: 25, 
        stiffness: 150,
        opacity: { duration: 0.2 }
      }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-[1100px]"
    >
      <div className="bg-[#0A0A14]/40 backdrop-blur-3xl border border-white/10 rounded-full px-3 py-2 flex items-center justify-between shadow-[0_30px_70px_rgba(0,0,0,0.9)] group/nav hover:bg-[#0A0A14]/70 transition-all duration-700 hover:border-white/20">
        
        {/* Logo & Brand */}
        <div 
          className="flex items-center gap-3 pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer shrink-0 group/logo" 
          onClick={() => handleNavClick('home')}
        >
          <motion.img 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
            alt="KOVR Logo" 
            className="w-7 h-7 object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="font-michroma font-bold text-sm tracking-tighter block group-hover/logo:text-[#FF3A2D] transition-colors">KOVR</span>
        </div>

        {/* Navigation Links - Centered Pill */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 gap-1 border border-white/5 shadow-inner">
          {[
            { name: 'INICIO', action: () => handleNavClick('home') },
            { name: 'TENDENCIAS', action: () => handleNavClick('home', 'trends') },
            { name: 'COLECCIÓN', action: () => handleNavClick('collection') },
            { name: 'ADN KOVR', action: () => handleNavClick('home', 'lifestyle') }
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={item.action}
              className="px-5 py-2 rounded-full font-michroma text-[8px] tracking-[3px] transition-all hover:bg-white/10 hover:text-[#FF3A2D] relative group overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">{item.name}</span>
              <motion.span 
                className="absolute inset-0 bg-[#FF3A2D]/10 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover"
              />
            </button>
          ))}
        </div>

        {/* Actions - Desktop shows full controls; Mobile displays clean dedicated Menu */}
        <div className="flex items-center gap-2 pr-1 sm:pr-2">
          {/* Desktop Reaction & Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              type="button"
              aria-label="Abrir buscador de productos"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
              onClick={onOpenSearch}
            >
              <Search size={18} className="hover:text-[#FF3A2D] transition-colors" />
            </button>
            <button 
              type="button"
              aria-label="Ver productos favoritos guardados"
              onClick={onOpenWishlist}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
            >
              <Heart size={18} className={`hover:text-[#FF3A2D] transition-colors ${wishlistCount > 0 ? 'fill-[#FF3A2D] text-[#FF3A2D]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3A2D] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              type="button"
              aria-label={`Ver carrito de compras con ${cartCount} productos`}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#FF3A2D]/10 hover:bg-[#FF3A2D]/20 transition-colors cursor-pointer group/cart" 
              onClick={onOpenCart}
            >
              <ShoppingCart size={18} className="text-[#FF3A2D] group-hover/cart:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-[#FF3A2D] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile Single Menu Button (Clean, Sophisticated Header) */}
          <button 
            type="button"
            aria-label="Abrir menú de navegación móvil"
            className="relative w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF3A2D] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
