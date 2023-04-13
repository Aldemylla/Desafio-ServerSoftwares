import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { Product, ProductToSendDB } from "@/types/Product";

interface ProductsContextProps {
  products: Array<Product> | [];
  setProducts: Dispatch<SetStateAction<Array<Product>>>;
  addProduct: (product: ProductToSendDB) => void;
  updateProduct: (product: ProductToSendDB) => void;
  deleteProduct: (product: Product) => void;
  productToUpdate: Product | null;
  setProductToUpdate: Dispatch<SetStateAction<Product | null>>;
  productFormModalOpened: boolean;
  setProductFormModalOpened: Dispatch<SetStateAction<boolean>>;
}

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  productToUpdate: null,
  setProductToUpdate: () => null,
  productFormModalOpened: false,
  setProductFormModalOpened: () => null,
});

export function useProductsContext() {
  return useContext(ProductsContext);
}

export const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [productFormModalOpened, setProductFormModalOpened] = useState(false);

  async function addProduct(product: ProductToSendDB) {
    if (product) {
      const response = await fetch(`${process.env.BASE_URL}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseProduct = await response.json();

      if (response.status === 201) {
        setProducts((oldProducts) => [...oldProducts, responseProduct]);
      }
    }
  }

  async function updateProduct(product: ProductToSendDB) {
    if (productToUpdate && product) {
      const response = await fetch(`${process.env.BASE_URL}/products/${productToUpdate._id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseProduct = await response.json();

      if (response.status === 200) {
        const newProducts = [...products];
        const productToUpdateIndex = newProducts.findIndex(
          (filteredProduct) => filteredProduct._id === productToUpdate._id
        );
        newProducts[productToUpdateIndex] = responseProduct;

        setProducts(newProducts);
        console.log("Produto atualizado com sucesso!"); // TODO: Implement the rendered message
      }
    }
  }

  async function deleteProduct(product: Product) {
    if (product) {
      const response = await fetch(`${process.env.BASE_URL}/products/${product._id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setProducts((oldProducts) =>
          oldProducts.filter((filteredProduct) => filteredProduct._id !== product._id)
        );
        console.log("Produto deletado com sucesso!"); // TODO: Implement the rendered message
      }
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        productToUpdate,
        setProductToUpdate,
        productFormModalOpened,
        setProductFormModalOpened,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
