// Define the Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Type for creating a new product (no id required)
export type ProductCreate = Omit<Product, 'id'>;

// Type for updating a product (all fields optional except id)
export type ProductUpdate = Partial<ProductCreate> & { id: string };