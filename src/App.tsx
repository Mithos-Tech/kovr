import React, { useState, useRef } from 'react';
import { AnimatePresence, useScroll as useMotionScroll } from 'motion/react';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import ProductModal from './components/collection/ProductModal';
import CartDrawer from './components/layout/CartDrawer';
import SearchOverlay from './components/layout/SearchOverlay';
import Home from './pages/Home';
import Collection from './pages/Collection';
import { Page, Product } from './types';
import { INITIAL_PRODUCTS, ALL_PRODUCTS } from './constants/products';
import { useScroll } from './hooks/useScroll';

const App: React.FC = () => {
  // Navigation State
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // UI State
  const { isVisible } = useScroll();
  const [selectedTrendCategory, setSelectedTrendCategory] = useState('TODOS');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Refs for Scroll Sections
  const lifestyleRef = useRef<HTMLElement>(null);
  const { scrollYProgress: lifestyleScroll } = useMotionScroll({
    target: lifestyleRef,
    offset: ["start end", "end start"]
  });

  // Filtering Logic
  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    selectedTrendCategory === 'TODOS' || p.category === selectedTrendCategory
  );

  const collectionProducts = ALL_PRODUCTS.filter(p => 
    selectedTrendCategory === 'TODOS' || 
    p.category === selectedTrendCategory ||
    (selectedTrendCategory === 'HOMBRES' && p.category === 'HOMBRE') ||
    (selectedTrendCategory === 'MUJERES' && p.category === 'MUJER')
  );

  // Carousel Navigation
  const nextSlide = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const visibleCards = isMobile ? 1 : isTablet ? 2 : 3;
    
    if (currentIndex < filteredProducts.length - visibleCards) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="bg-[#0A0A14] text-white selection:bg-[#FF3A2D] selection:text-white overflow-x-hidden">
      
      <Navbar 
        isVisible={isVisible}
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartItems.length}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setSelectedTrendCategory={setSelectedTrendCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        setActivePage={setActivePage}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setSelectedProduct={setSelectedProduct}
        setActivePage={setActivePage}
      />

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <Home 
            key="home-page"
            selectedTrendCategory={selectedTrendCategory}
            setSelectedTrendCategory={setSelectedTrendCategory}
            currentIndex={currentIndex}
            filteredProducts={filteredProducts}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            setSelectedProduct={setSelectedProduct}
            setActivePage={setActivePage}
            lifestyleRef={lifestyleRef}
            lifestyleScroll={lifestyleScroll}
          />
        ) : (
          <Collection 
            key="collection-page"
            collectionProducts={collectionProducts}
            setSelectedProduct={setSelectedProduct}
            setActivePage={setActivePage}
          />
        )}
      </AnimatePresence>

      <Footer 
        setActivePage={setActivePage}
        setSelectedTrendCategory={setSelectedTrendCategory}
      />
    </div>
  );
};

export default App;
