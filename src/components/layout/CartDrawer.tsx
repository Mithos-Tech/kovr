import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveFromCart: (productId: string | number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4000]"
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
                <ShoppingBag className="text-[#FF3A2D]" size={24} />
                <h2 className="font-bebas text-3xl tracking-tight">TU CARRITO</h2>
                <span className="bg-white/5 px-3 py-1 rounded-full font-outfit text-[10px] text-white/40">
                  {cartItems.length} ITEMS
                </span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-white/20" />
                  </div>
                  <p className="font-syncopate text-[10px] text-white/20 tracking-[4px] uppercase mb-8">El carrito está vacío</p>
                  <button 
                    onClick={onClose}
                    className="text-[#FF3A2D] font-outfit font-bold text-sm hover:underline"
                  >
                    CONTINUAR COMPRANDO
                  </button>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={`${item.id}-${i}`} 
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 bg-[#111827] rounded-2xl overflow-hidden border border-white/5 flex-shrink-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bebas text-xl tracking-tight uppercase">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-white/20 hover:text-[#FF3A2D] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-white/40 text-[10px] font-outfit tracking-widest uppercase mb-2">{item.category}</p>
                      <span className="font-barlow font-bold text-lg text-[#FF3A2D]">${item.price}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-[#111827]/50 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="font-syncopate text-[10px] text-white/40 tracking-[4px]">SUBTOTAL</span>
                  <span className="font-barlow font-black text-4xl text-white">${total}</span>
                </div>
                <button className="w-full bg-[#FF3A2D] text-white font-syncopate font-bold text-[11px] tracking-[4px] py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_40px_rgba(255,58,45,0.2)]">
                  FINALIZAR COMPRA <ArrowRight size={18} />
                </button>
                <p className="text-center font-outfit text-[10px] text-white/20 uppercase tracking-widest">
                  Envío gratuito y devoluciones en 30 días
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
