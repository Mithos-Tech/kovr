import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Shield, Zap, Cpu, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const specs = [
    { icon: <Cpu size={18} />, label: "NÚCLEO", value: "REACTIVO V2" },
    { icon: <Shield size={18} />, label: "PROTECCIÓN", value: "GRADO MILITAR" },
    { icon: <Zap size={18} />, label: "TRACCIÓN", value: "URBAN GRIP" }
  ];

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A0A14]/95 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#111827] rounded-[24px] md:rounded-[32px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row overflow-hidden"
          >
            {/* Close Button - Fixed relative to the modal container */}
            <button 
              onClick={onClose}
              aria-label="Cerrar detalles del producto"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FF3A2D] hover:border-[#FF3A2D] transition-all duration-300 shadow-lg"
            >
              <X size={20} className="md:hidden" />
              <X size={24} className="hidden md:block" />
            </button>

            {/* Scrollable Container for Mobile */}
            <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto lg:overflow-hidden no-scrollbar">
              {/* Left Side: Image Showcase */}
              <div className="w-full lg:w-1/2 relative bg-[#0A0A14] flex items-center justify-center p-8 md:p-12 overflow-hidden min-h-[320px] md:min-h-[450px] lg:min-h-full shrink-0">
                {/* Ambient Glow */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}, transparent 70%)` }}
                ></div>
                
                <motion.img 
                  initial={{ rotate: -15, scale: 1.2, opacity: 0 }}
                  animate={{ rotate: -15, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  src={product.img} 
                  alt={product.name} 
                  className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] md:drop-shadow-[0_50px_80px_rgba(0,0,0,0.8)] relative z-10"
                  referrerPolicy="no-referrer"
                />

                {/* Brand Watermark */}
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 font-bebas text-6xl md:text-8xl text-white/5 select-none">
                  KOVR
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#111827] relative">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3A2D]/5 blur-[60px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <span className="text-[#FF3A2D] font-syncopate font-bold text-[9px] md:text-[10px] tracking-[4px] uppercase">
                      {product.tag || 'ELITE SERIES'}
                    </span>
                    <div className="h-[1px] flex-1 max-w-[40px] bg-[#FF3A2D]/30"></div>
                  </div>
                  
                  <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-white mb-6 md:mb-8 uppercase">
                    {product.name}
                  </h2>
                  
                  <div className="flex items-baseline gap-4 mb-8 md:mb-10">
                    <span className="font-barlow font-black text-4xl md:text-5xl text-white tracking-tighter">${product.price}</span>
                    {product.oldPrice > product.price && (
                      <span className="text-white/20 line-through font-outfit text-lg md:text-xl font-medium">${product.oldPrice}</span>
                    )}
                  </div>

                  <div className="space-y-8 md:space-y-12">
                    <p className="font-outfit text-white/50 text-base md:text-lg leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specs Grid - More sophisticated layout */}
                    <div className="grid grid-cols-3 gap-4">
                      {specs.map((spec, i) => (
                        <div key={i} className="group/spec flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF3A2D] mb-3 transition-colors group-hover/spec:bg-[#FF3A2D] group-hover/spec:text-white">
                            {spec.icon}
                          </div>
                          <span className="font-syncopate text-[7px] text-white/30 tracking-widest mb-1 uppercase">{spec.label}</span>
                          <span className="font-outfit font-bold text-[10px] text-white tracking-wide uppercase">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Size Selector */}
                    <div>
                      <div className="flex justify-between items-center mb-5">
                        <span className="font-syncopate text-[9px] text-white/40 tracking-[3px] font-bold">TALLA (EU)</span>
                        <button className="font-outfit text-[10px] text-[#FF3A2D] font-bold tracking-wider hover:underline">GUÍA DE TALLAS</button>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {[40, 41, 42, 43, 44, 45].map((size) => (
                          <button 
                            key={size}
                            className="aspect-square rounded-xl border border-white/10 flex items-center justify-center font-outfit font-bold text-sm transition-all hover:border-[#FF3A2D] hover:text-[#FF3A2D] hover:bg-[#FF3A2D]/5 active:scale-90"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="flex-[2] bg-[#FF3A2D] text-white font-syncopate font-bold text-[11px] tracking-[4px] py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_40px_rgba(255,58,45,0.3)] group/buy"
                      >
                        <ShoppingCart size={18} className="group-hover/buy:scale-110 transition-transform" /> 
                        AÑADIR AL CARRITO
                      </button>
                      <button className="flex-1 py-6 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center group/heart">
                        <Heart size={20} className="group-hover/heart:fill-[#FF3A2D] group-hover/heart:text-[#FF3A2D] transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
