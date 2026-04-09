import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Product, Page } from '../../types';

interface BestSellersProps {
  setSelectedProduct: (product: any) => void;
  setActivePage: (page: Page) => void;
}

const BestSellers: React.FC<BestSellersProps> = ({
  setSelectedProduct,
  setActivePage
}) => {
  const bestSellers = [
    { 
      id: 'best-1', 
      name: "KOVR APEX ONE", 
      price: 215, 
      oldPrice: 245,
      img: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775508587/KOVR_STREET_PR_ivovdo.png",
      tag: "ELITE SERIES",
      color: "#FF6B00"
    },
    { 
      id: 'best-2', 
      name: "KOVR TITAN PRO", 
      price: 195, 
      oldPrice: 225,
      img: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775503579/KOVR_STREET_PRO_ljhyps.png",
      tag: "PRO PERFORMANCE",
      color: "#FBBF24"
    },
    { 
      id: 'best-3', 
      name: "KOVR PHANTOM X", 
      price: 230, 
      oldPrice: 265,
      img: "https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775503579/KOVR_URBAN_X_r6gskp.png",
      tag: "LIMITED EDITION",
      color: "#60A5FA"
    }
  ];

  return (
    <section className="bg-[#0A0A14] py-40 relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#FF3A2D]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="mb-40">
          <span className="text-[#FF3A2D] font-outfit font-bold text-[12px] tracking-[5px] block mb-4">— ELITE SELECTION</span>
          <h2 className="font-bebas text-7xl md:text-9xl leading-[0.8] tracking-tighter">LOS MÁS VENDIDOS</h2>
        </div>

        {/* Grid de Productos - Estilo "Framer Gallery Showcase" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="group relative"
            >
              {/* Card Container */}
              <div 
                onClick={() => {
                  setSelectedProduct(product);
                }}
                className="relative h-[560px] w-full bg-[#111827] rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-white/10 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] cursor-pointer"
              >
                
                {/* Background Accent Glow */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${product.color}, transparent 70%)` }}
                ></div>

                {/* Product Image - Tilted & Centered */}
                <div className="relative h-[60%] flex items-center justify-center p-8">
                  <motion.img 
                    src={product.img} 
                    alt={product.name} 
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-15, -13, -15]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    className="w-full h-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Product Info - Compact & Balanced */}
                <div className="h-[40%] p-8 flex flex-col justify-between bg-gradient-to-t from-black/40 to-transparent">
                  <div>
                    <span className="font-syncopate text-[7px] tracking-[4px] text-white/30 font-bold uppercase block mb-3">
                      {product.tag}
                    </span>
                    <h3 className="font-bebas text-5xl text-white tracking-tight leading-none mb-4 group-hover:text-[#FF3A2D] transition-colors duration-500">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-barlow font-black text-3xl text-white">${product.price}</span>
                      <span className="text-white/10 text-[10px] line-through font-outfit tracking-[3px] uppercase">
                        USD {product.oldPrice}
                      </span>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="px-6 py-3 bg-white text-black font-syncopate font-bold text-[9px] tracking-[2px] rounded-full hover:bg-[#FF3A2D] hover:text-white transition-all duration-300 active:scale-95"
                    >
                      VER MÁS
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón de Explorar Más */}
        <div className="mt-40 flex justify-center">
          <motion.button
            onClick={() => setActivePage('collection')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-[#FF3A2D]"
          >
            <div className="absolute inset-0 bg-[#FF3A2D] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 font-syncopate text-[11px] tracking-[6px] text-white group-hover:text-white flex items-center gap-6">
              VER TODO EL CATÁLOGO <ArrowRight size={18} />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
