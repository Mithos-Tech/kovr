import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Page } from '../../types';

interface TrendsProps {
  selectedTrendCategory: string;
  setSelectedTrendCategory: (category: string) => void;
  currentIndex: number;
  filteredProducts: Product[];
  nextSlide: () => void;
  prevSlide: () => void;
  setSelectedProduct: (product: Product) => void;
  setActivePage: (page: Page) => void;
}

const Trends: React.FC<TrendsProps> = ({
  selectedTrendCategory,
  setSelectedTrendCategory,
  currentIndex,
  filteredProducts,
  nextSlide,
  prevSlide,
  setSelectedProduct,
  setActivePage
}) => {
  return (
    <section id="trends" className="bg-[#0A0A14] bg-gradient-to-b from-[#0A0A14] via-[#111827] to-[#0A0A14] py-32 relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF3A2D]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div className="text-center lg:text-left">
            <span className="text-[#FF3A2D] font-outfit font-bold text-[10px] md:text-[12px] tracking-[5px] block mb-4 uppercase">— PRODUCTOS TENDENCIA</span>
            <h2 className="font-bebas text-6xl md:text-8xl lg:text-9xl leading-[0.8] tracking-tighter">MÁS POPULARES</h2>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-8">
            {/* Categorías Refinadas - Grid on Mobile for full visibility, Flex on Desktop */}
            <div className="w-full max-w-[340px] md:max-w-md">
              <div className="grid grid-cols-2 md:flex md:flex-row gap-2 bg-white/5 p-2 rounded-[20px] md:rounded-full border border-white/10 backdrop-blur-md">
                {['TODOS', 'HOMBRE', 'MUJER', 'KIDS'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedTrendCategory(cat)}
                    className={`px-4 py-3 md:px-6 md:py-2 rounded-[14px] md:rounded-full font-syncopate text-[8px] md:text-[9px] font-bold transition-all tracking-[2px] whitespace-nowrap ${selectedTrendCategory === cat ? 'bg-[#FF3A2D] text-white shadow-lg shadow-[#FF3A2D]/20' : 'text-white/50 hover:text-white/80'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Navegación Sofisticada Integrada - Hidden on small mobile as swipe is primary */}
            <div className="hidden md:flex gap-3">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Producto anterior"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-black disabled:opacity-20 disabled:cursor-not-allowed group/nav"
              >
                <ChevronLeft size={24} className="group-hover/nav:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={nextSlide}
                disabled={(() => {
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
                  const visibleCards = isMobile ? 1 : isTablet ? 2 : 3;
                  return currentIndex >= filteredProducts.length - visibleCards;
                })()}
                aria-label="Siguiente producto"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-black disabled:opacity-20 disabled:cursor-not-allowed group/nav"
              >
                <ChevronRight size={24} className="group-hover/nav:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel de Cards - Estilo de Alta Gama (Responsive) */}
        <div className="relative">
          <div className="relative w-full overflow-hidden py-24 md:py-32 cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) nextSlide();
                else if (info.offset.x > threshold) prevSlide();
              }}
              animate={{ 
                x: `calc(-${currentIndex} * (var(--card-width) + var(--card-gap)))` 
              }}
              className="flex [--card-gap:24px] md:[--card-gap:32px] gap-[var(--card-gap)] [--card-width:80vw] md:[--card-width:45vw] lg:[--card-width:calc(33.333%-21.33px)]"
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  return (
                    <div 
                      key={product.id} 
                      className="min-w-[var(--card-width)] w-[var(--card-width)] flex flex-col relative"
                    >
                      {/* Pantone Label Above Card */}
                      <div className="flex items-center gap-3 mb-6 ml-1">
                        <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: product.color }}></div>
                        <span className="font-syncopate text-[8px] md:text-[9px] tracking-[2px] font-bold text-white/50 uppercase">{product.pantone}</span>
                      </div>

                      {/* Card Content - Premium Design */}
                      <div 
                        onClick={() => {
                          setSelectedProduct(product);
                        }}
                        className="relative h-[520px] md:h-[560px] w-full bg-white rounded-[24px] group/card shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
                      >
                        {/* Top Colored Section */}
                        <div 
                          className="h-[35%] w-full relative p-6 md:p-8 rounded-t-[24px] overflow-hidden"
                          style={{ backgroundColor: product.color }}
                        >
                          <div className="flex items-center gap-2 text-white/80">
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/40 flex items-center justify-center">
                              <span className="font-bebas text-[10px] md:text-[12px]">K</span>
                            </div>
                            <span className="font-bebas text-base md:text-lg tracking-[0.2em]">KOVR</span>
                          </div>
                        </div>

                        {/* Bottom White Section */}
                        <div className="h-[65%] w-full bg-white p-8 md:p-10 flex flex-col items-center text-center justify-end rounded-b-[24px]">
                          <div className="mb-8 md:mb-10">
                            <span className="block font-outfit text-black/20 text-[8px] md:text-[9px] font-black tracking-[3px] uppercase mb-2">ELITE PERFORMANCE</span>
                            <h3 className="font-bebas text-3xl md:text-4xl text-black leading-none tracking-tight mb-3 md:mb-4">{product.name}</h3>
                            <p className="font-outfit text-black/50 text-[10px] md:text-[11px] leading-relaxed max-w-[200px] md:max-w-[220px] mx-auto">
                              {product.description.split('.')[0]}. Ingeniería de precisión urbana.
                            </p>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="w-full py-3.5 md:py-4 px-6 rounded-full flex items-center justify-between text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-xl group/btn"
                            style={{ backgroundColor: product.color }}
                          >
                            <span className="font-barlow font-black text-lg md:text-xl tracking-tighter">${product.price}</span>
                            <div className="flex items-center gap-3">
                              <div className="w-[1px] h-4 bg-white/30"></div>
                              <span className="font-syncopate font-bold text-[8px] md:text-[9px] tracking-[2px]">COMPRAR</span>
                              <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        </div>

                        {/* Sneaker Image - Adjusted for mobile clipping */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                          <motion.img 
                            src={product.img} 
                            alt={product.name}
                            initial={{ rotate: -25, scale: 1, y: 0 }}
                            animate={{ 
                              rotate: -25,
                              scale: 1,
                              y: 0
                            }}
                            className="w-[130%] md:w-[135%] max-w-none h-auto object-contain drop-shadow-[0_45px_55px_rgba(0,0,0,0.6)] group-hover/card:scale-110 group-hover/card:-rotate-[28deg] transition-all duration-700 ease-out"
                            style={{ marginTop: '-80%' }}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trends;
