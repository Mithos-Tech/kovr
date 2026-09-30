import React from 'react';
import { motion, MotionValue } from 'motion/react';
import Hero from '../components/home/Hero';
import Trends from '../components/home/Trends';
import Lifestyle from '../components/home/Lifestyle';
import BestSellers from '../components/home/BestSellers';
import { Product, Page } from '../types';

interface HomeProps {
  selectedTrendCategory: string;
  setSelectedTrendCategory: (category: string) => void;
  currentIndex: number;
  filteredProducts: Product[];
  nextSlide: () => void;
  prevSlide: () => void;
  setSelectedProduct: (product: Product) => void;
  setActivePage: (page: Page) => void;
  lifestyleRef: React.RefObject<HTMLElement | null>;
  lifestyleScroll: MotionValue<number>;
}

const Home: React.FC<HomeProps> = ({
  selectedTrendCategory,
  setSelectedTrendCategory,
  currentIndex,
  filteredProducts,
  nextSlide,
  prevSlide,
  setSelectedProduct,
  setActivePage,
  lifestyleRef,
  lifestyleScroll
}) => {
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

  return (
    <motion.main 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero onAcquireNow={() => setSelectedProduct(starProduct)} />
      <Trends 
        selectedTrendCategory={selectedTrendCategory}
        setSelectedTrendCategory={setSelectedTrendCategory}
        currentIndex={currentIndex}
        filteredProducts={filteredProducts}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        setSelectedProduct={setSelectedProduct}
        setActivePage={setActivePage}
      />
      <Lifestyle 
        lifestyleRef={lifestyleRef}
        lifestyleScroll={lifestyleScroll}
        setActivePage={setActivePage}
      />
      <BestSellers 
        setSelectedProduct={setSelectedProduct}
        setActivePage={setActivePage}
      />
    </motion.main>
  );
};

export default Home;
