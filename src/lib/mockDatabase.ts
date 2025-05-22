import { Product } from '../types';

// Mock database for products
const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for product 1",
    price: 19.99,
    stock: 100
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description for product 2",
    price: 29.99,
    stock: 50
  }
];

// Functions to manipulate product data
export const getProducts = (): Product[] => {
  return [...products]; // Return a copy to prevent direct modification
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const newProduct = {
    ...product,
    id: Date.now().toString()
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Omit<Product, 'id'>>): Product | null => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates
  };
  
  return products[index];
};

export const deleteProduct = (id: string): Product | null => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  const [deletedProduct] = products.splice(index, 1);
  return deletedProduct;
};
