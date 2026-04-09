import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product, Page } from '../../types';
import { ALL_PRODUCTS } from '../../constants/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedProduct: (product: Product) => void;
  setActivePage: (page: Page) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, setSelectedProduct, setActivePage }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return [];
    return ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] bg-[#0A0A14]/95 backdrop-blur-2xl flex flex-col p-8 md:p-24"
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center mb-12">
              <span className="font-syncopate text-[10px] text-[#FF3A2D] tracking-[8px] font-bold uppercase">BÚSQUEDA INTELIGENTE</span>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-16">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={32} />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿QUÉ ESTÁS BUSCANDO?" 
                className="w-full bg-transparent border-b-2 border-white/10 py-8 pl-16 pr-8 font-bebas text-5xl md:text-7xl focus:outline-none focus:border-[#FF3A2D] transition-all placeholder:text-white/5 uppercase"
              />
            </div>

            <div className="space-y-8">
              {results.length > 0 ? (
                results.map((product, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="group flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 bg-[#111827] rounded-2xl overflow-hidden border border-white/5">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bebas text-3xl tracking-tight group-hover:text-[#FF3A2D] transition-colors uppercase">{product.name}</h4>
                        <p className="font-outfit text-white/40 text-xs tracking-widest uppercase">{product.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-[#FF3A2D] group-hover:translate-x-2 transition-all" size={24} />
                  </motion.div>
                ))
              ) : query && (
                <div className="text-center py-12">
                  <p className="font-syncopate text-white/20 text-sm tracking-[4px] uppercase">No se encontraron resultados para "{query}"</p>
                </div>
              )}
            </div>

            {!query && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h5 className="font-syncopate text-[9px] text-white/20 tracking-[4px] mb-6 uppercase">BÚSQUEDAS POPULARES</h5>
                  <div className="flex flex-wrap gap-3">
                    {['APEX', 'TITAN', 'PHANTOM', 'RUNNING', 'EDICIÓN LIMITADA'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 font-outfit text-[10px] font-bold tracking-[2px] hover:bg-[#FF3A2D] hover:border-[#FF3A2D] transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-syncopate text-[9px] text-white/20 tracking-[4px] mb-6 uppercase">CATEGORÍAS</h5>
                  <div className="flex flex-wrap gap-3">
                    {['HOMBRE', 'MUJER', 'KIDS', 'LIFESTYLE'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setQuery(cat)}
                        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 font-outfit text-[10px] font-bold tracking-[2px] hover:bg-white hover:text-black transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
