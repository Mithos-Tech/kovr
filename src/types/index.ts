export interface Product {
  id: number | string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  description: string;
  img: string;
  color: string;
  pantone?: string;
  tag?: string;
  category: string;
}

export type Page = 'home' | 'collection';
