import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, ArrowRight, Mail, X } from 'lucide-react';
import { Product, Page } from '../types';
import CollectionHero from '../components/collection/CollectionHero';
import InnovationSection from '../components/collection/InnovationSection';

interface CollectionProps {
  collectionProducts: Product[];
  setSelectedProduct: (product: Product) => void;
  setActivePage: (page: Page) => void;
}

const Collection: React.FC<CollectionProps> = ({
  collectionProducts,
  setSelectedProduct,
  setActivePage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const categories = ['TODOS', 'LIFESTYLE', 'RUNNING', 'JORDAN', 'TRAINING'];

  const filteredProducts = useMemo(() => {
    return collectionProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'TODOS' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [collectionProducts, searchQuery, selectedCategory]);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <motion.main 
      key="collection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A14] min-h-screen relative overflow-hidden"
    >
      <CollectionHero />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#FF3A2D]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-24 md:py-32">
        {/* Header de Colección */}
        <div className="flex flex-col mb-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[#FF3A2D] font-syncopate font-bold text-[10px] tracking-[4px]">CATÁLOGO</span>
            <div className="h-[1px] w-12 bg-[#FF3A2D]"></div>
          </motion.div>
          <h2 className="font-bebas text-7xl sm:text-8xl md:text-[120px] leading-[0.8] tracking-tighter mb-12">
            COLECCIÓN <br />
            <span className="text-outline">COMPLETA</span>
          </h2>
          
          {/* Barra de Filtros Refinada */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pt-8 border-t border-white/10">
            <div className="hidden lg:flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-full font-outfit text-[11px] font-bold tracking-[2px] transition-all border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/40 text-white/60 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full flex justify-between items-center">
              <button 
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-outfit text-[11px] font-bold tracking-[2px]"
              >
                <Menu size={16} /> FILTROS
              </button>
              <span className="font-outfit text-[11px] text-white/40 tracking-[2px]">
                {filteredProducts.length} RESULTADOS
              </span>
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="BUSCAR MODELO..." 
                  className="bg-[#111827] border border-white/5 rounded-full py-4 pl-14 pr-12 font-outfit text-[11px] tracking-widest focus:outline-none focus:border-[#FF3A2D] w-full lg:w-72 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Menu */}
          <AnimatePresence>
            {isFilterMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mt-4 flex flex-wrap gap-2"
              >
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterMenuOpen(false);
                    }}
                    className={`px-6 py-2.5 rounded-full font-outfit text-[10px] font-bold tracking-[2px] transition-all border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/60'}`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid de Productos - Diseño Limpio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setActivePage('collection');
                }}
              >
                <div className="relative aspect-square bg-[#111827] rounded-[16px] overflow-hidden mb-6 border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-black/50">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-white text-black text-[8px] font-bold px-3 py-1 rounded-full font-syncopate tracking-widest shadow-lg z-20 uppercase">
                      {product.tag}
                    </span>
                  )}
                  {/* Sophisticated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-white/60 text-[10px] font-outfit tracking-widest uppercase mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {product.category}
                    </p>
                    <p className="text-white text-xs font-syncopate font-bold tracking-tighter transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      EXPLORAR MODELO
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-barlow font-black text-xl tracking-tight leading-tight group-hover:text-[#FF3A2D] transition-colors duration-300 uppercase">{product.name}</h3>
                    <span className="font-barlow font-bold text-lg text-[#FF3A2D]">${product.price}</span>
                  </div>
                  <p className="text-white/40 text-[10px] font-outfit tracking-widest uppercase font-medium">{product.category} — 2026</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-syncopate text-white/20 text-sm tracking-[4px] uppercase">No se encontraron modelos</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('TODOS');
              }}
              className="mt-8 text-[#FF3A2D] font-outfit font-bold text-xs tracking-[2px] hover:underline"
            >
              LIMPIAR FILTROS
            </button>
          </div>
        )}

        {/* Paginación Minimalista */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-16 border-t border-white/5">
            <button className="font-syncopate text-[10px] tracking-[4px] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-4">
              <ArrowRight size={16} className="rotate-180" /> ANTERIOR
            </button>
            <div className="flex gap-6 md:gap-8 font-outfit font-bold text-sm">
              <span className="text-[#FF3A2D]">01</span>
              <span className="opacity-40 hover:opacity-100 cursor-pointer">02</span>
              <span className="opacity-40 hover:opacity-100 cursor-pointer">03</span>
              <span className="opacity-40 hover:opacity-100 cursor-pointer hidden sm:inline">...</span>
              <span className="opacity-40 hover:opacity-100 cursor-pointer">12</span>
            </div>
            <button className="font-syncopate text-[10px] tracking-[4px] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-4">
              SIGUIENTE <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <InnovationSection />

      {/* Brand Identity Marquee - Refined Single Row */}
      <section className="py-20 bg-[#0A0A14] overflow-hidden border-t border-b border-white/5 relative">
        {/* Faded Edges Overlay */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#0A0A14] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#0A0A14] to-transparent z-20 pointer-events-none"></div>

        <div className="relative flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 md:gap-32 items-center"
          >
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="flex gap-20 md:gap-32 items-center">
                <div className="flex items-center gap-8">
                  <img 
                    src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
                    alt="KOVR Logo" 
                    className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-bebas text-[100px] md:text-[150px] leading-none text-white tracking-tighter">KOVR</span>
                </div>
                <span className="font-syncopate text-[10px] md:text-[12px] tracking-[8px] text-[#FF3A2D] font-bold">DOMINA LA CALLE</span>
                <div className="flex items-center gap-8">
                  <span className="font-bebas text-[100px] md:text-[150px] leading-none text-outline tracking-tighter opacity-30">KOVR</span>
                  <img 
                    src="https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010678/Logo_Guepardo_B_ozmroq.svg" 
                    alt="KOVR Logo" 
                    className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-40 grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-syncopate text-[10px] md:text-[12px] tracking-[8px] text-white/20 font-bold uppercase">INGENIERÍA URBANA</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 md:py-40 bg-[#0A0A14] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF3A2D]/5 blur-[200px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-[#FF3A2D] font-syncopate font-bold text-[11px] tracking-[8px] block mb-12 uppercase">
            — ÚNETE AL MOVIMIENTO —
          </span>
          <h2 className="font-bebas text-6xl md:text-9xl leading-[0.95] tracking-tighter mb-16 text-white">
            NO TE PIERDAS <br />
            <span className="text-outline">EL PRÓXIMO DROP</span>
          </h2>
          
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <div className="relative w-full md:w-96">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="TU EMAIL AQUÍ..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-16 pr-8 font-outfit text-sm tracking-widest focus:outline-none focus:border-[#FF3A2D] transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full md:w-auto px-12 py-6 bg-[#FF3A2D] text-white font-syncopate font-bold text-[11px] tracking-[4px] rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_40px_rgba(255,58,45,0.2)]"
            >
              {subscribed ? '¡GRACIAS!' : 'SUSCRIBIRSE'}
            </button>
          </form>
          
          {subscribed && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-[#FF3A2D] font-outfit text-sm font-bold tracking-widest uppercase"
            >
              Te has unido al movimiento. Revisa tu bandeja de entrada.
            </motion.p>
          )}
          
          <p className="mt-12 font-outfit text-white/20 text-[10px] md:text-xs tracking-widest uppercase">
            Al suscribirte, aceptas nuestra política de privacidad y términos de servicio.
          </p>
        </div>
      </section>
    </motion.main>
  );
};

export default Collection;
