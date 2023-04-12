import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { Product } from "@/types/Product";

interface ProductsContextProps {
  products: Array<Product> | [];
  setProducts: Dispatch<SetStateAction<Array<Product>>>;
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
}

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => [],
  addProduct: () => [],
  deleteProduct: () => [],
});

export function useProductsContext() {
  return useContext(ProductsContext);
}

export const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  function addProduct(product: Product) {
    if (product) {
      setProducts((oldProducts) => [...oldProducts, product]);
    }
  }

  function deleteProduct(product: Product) {
    if (product) {
      setProducts((oldProducts) =>
        oldProducts.filter((filteredProduct) => filteredProduct._id !== product._id)
      );
    }
  }

  return (
    <ProductsContext.Provider value={{ products, setProducts, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
