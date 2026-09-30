import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, useScroll as useMotionScroll } from 'motion/react';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import ProductModal from './components/collection/ProductModal';
import CartDrawer from './components/layout/CartDrawer';
import SearchOverlay from './components/layout/SearchOverlay';
import CheckoutModal from './components/layout/CheckoutModal';
import WishlistDrawer from './components/layout/WishlistDrawer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Legal from './pages/Legal';
import { Page, Product, LegalSection } from './types';
import { INITIAL_PRODUCTS, ALL_PRODUCTS } from './constants/products';
import { useScroll } from './hooks/useScroll';

const App: React.FC = () => {
  // Navigation State
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<LegalSection>('privacidad');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // UI State
  const { isVisible } = useScroll();
  const [selectedTrendCategory, setSelectedTrendCategory] = useState('TODOS');
  const [collectionCategory, setCollectionCategory] = useState('TODOS');
  const [currentIndex, setCurrentIndex] = useState(0);

  const starProduct: Product = {
    id: 'apex-70',
    name: 'KOVR APEX-70',
    price: 210,
    oldPrice: 250,
    rating: 5.0,
    reviews: 340,
    description: 'Edición limitada de ingeniería urbana con suela reactiva Techwear V2 y tejido balístico impermeable de alto rendimiento.',
    img: 'https://res.cloudinary.com/dk1tkgjpj/image/upload/v1775010591/running_hero_cknqsf.png',
    color: '#FF3A2D',
    category: 'HOMBRE',
    tag: 'EDICIÓN LIMITADA'
  };

  const handleOpenCollectionCategory = (category: string) => {
    setCollectionCategory(category);
    navigateTo('collection', 'catalog-top');
  };

  const handleOpenStarProduct = () => {
    setSelectedProduct(starProduct);
  };

  // Scroll to top immediately when switching pages so content NEVER begins at the bottom
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activePage]);

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Favorites Handlers
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFavorite = (productId: string | number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  // Unified Navigation Handler (Handles smooth in-page scrolling & clean cross-page transitions without bottom-starts)
  const navigateTo = (page: Page, sectionId?: string) => {
    if (page === activePage) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } else {
      // Cross-page navigation:
      // 1. Immediately reset viewport position to top so target page NEVER loads at the bottom
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. Switch page
      setActivePage(page);

      // 3. If a section was targeted, scroll smoothly to it once rendered
      if (sectionId) {
        let attempts = 0;
        const checkAndScroll = () => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (attempts < 25) {
            attempts++;
            setTimeout(checkAndScroll, 50);
          }
        };
        setTimeout(checkAndScroll, 80);
      }
    }
  };

  // Legal Page Handler
  const handleOpenLegal = (section: LegalSection) => {
    setLegalSection(section);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setActivePage('legal');
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
        wishlistCount={favorites.length}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setSelectedTrendCategory={setSelectedTrendCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={navigateTo}
      />

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        setActivePage={setActivePage}
        onNavigate={navigateTo}
        onOpenLegal={handleOpenLegal}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        wishlistCount={favorites.length}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onAddToCart={addToCart}
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
        onOpenSizeGuide={() => {
          setSelectedProduct(null);
          handleOpenLegal('tallas');
        }}
        isFavorite={selectedProduct ? favorites.some(f => f.id === selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => setCartItems([])}
      />

      <AnimatePresence mode="wait">
        {activePage === 'home' && (
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
        )}
        {activePage === 'collection' && (
          <Collection 
            key="collection-page"
            collectionProducts={collectionProducts}
            setSelectedProduct={setSelectedProduct}
            setActivePage={setActivePage}
            onOpenLegal={handleOpenLegal}
            initialCategory={collectionCategory}
          />
        )}
        {activePage === 'legal' && (
          <Legal 
            key="legal-page"
            currentSection={legalSection}
            onSelectSection={setLegalSection}
            setActivePage={setActivePage}
            onNavigate={navigateTo}
          />
        )}
      </AnimatePresence>

      <Footer 
        setActivePage={setActivePage}
        setSelectedTrendCategory={setSelectedTrendCategory}
        onOpenLegal={handleOpenLegal}
        onNavigate={navigateTo}
        onOpenCollectionCategory={handleOpenCollectionCategory}
        onOpenStarProduct={handleOpenStarProduct}
      />
    </div>
  );
};

export default App;
