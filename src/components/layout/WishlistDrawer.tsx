import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (productId: string | number) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[4000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A14] border-l border-white/10 z-[4001] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Heart className="text-[#FF3A2D] fill-[#FF3A2D]" size={24} />
                <h2 className="font-bebas text-3xl tracking-tight">TUS FAVORITOS</h2>
                <span className="bg-white/5 px-3 py-1 rounded-full font-outfit text-[10px] text-white/40">
                  {favorites.length} GUARDADOS
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar favoritos"
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Heart size={32} className="text-white/20" />
                  </div>
                  <p className="font-syncopate text-[10px] text-white/30 tracking-[4px] uppercase mb-8">
                    No tienes modelos guardados
                  </p>
                  <button
                    onClick={onClose}
                    className="text-[#FF3A2D] font-outfit font-bold text-sm hover:underline cursor-pointer"
                  >
                    DESCUBRIR COLECCIÓN
                  </button>
                </div>
              ) : (
                favorites.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    key={`${item.id}-${i}`}
                    className="flex gap-5 group p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-20 h-20 bg-[#111827] rounded-xl overflow-hidden border border-white/5 flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bebas text-lg tracking-tight uppercase">{item.name}</h4>
                        <button
                          onClick={() => onRemoveFavorite(item.id)}
                          aria-label={`Eliminar ${item.name} de favoritos`}
                          className="text-white/30 hover:text-[#FF3A2D] transition-colors cursor-pointer p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="font-barlow font-bold text-base text-[#FF3A2D] mb-3">${item.price}</span>
                      <button
                        onClick={() => {
                          onAddToCart(item);
                          onRemoveFavorite(item.id);
                        }}
                        className="w-full py-2 bg-white/10 hover:bg-[#FF3A2D] text-white font-syncopate text-[8px] font-bold tracking-[2px] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag size={12} /> MOVER AL CARRITO
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
