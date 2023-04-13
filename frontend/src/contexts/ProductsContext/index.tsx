import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { Product, ProductToSendDB } from "@/types/Product";

interface ProductsContextProps {
  products: Array<Product> | [];
  setProducts: Dispatch<SetStateAction<Array<Product>>>;
  addProduct: (product: ProductToSendDB) => Promise<void>;
  updateProduct: (product: ProductToSendDB) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  productToUpdate: Product | null;
  setProductToUpdate: Dispatch<SetStateAction<Product | null>>;
  productFormModalOpened: boolean;
  setProductFormModalOpened: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: string;
}

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: () => [],
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  productToUpdate: null,
  setProductToUpdate: () => null,
  productFormModalOpened: false,
  setProductFormModalOpened: () => null,
  loading: false,
  error: "",
});

export function useProductsContext() {
  return useContext(ProductsContext);
}

export const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [productFormModalOpened, setProductFormModalOpened] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addProduct(product: ProductToSendDB) {
    if (product) {
      if (error) {
        setError("");
      }

      setLoading(true);
      try {
        const response = await fetch(`${process.env.BASE_URL}/products`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseJSON = await response.json();

        if (response.ok) {
          setProducts((oldProducts) => [...oldProducts, responseJSON]);
        } else {
          setError(responseJSON.message);
        }
      } catch (error: any) {
        console.error(error);
      }
      setLoading(false);
    }
  }

  async function updateProduct(product: ProductToSendDB) {
    if (productToUpdate && product) {
      if (error) {
        setError("");
      }

      setLoading(true);

      const response = await fetch(`${process.env.BASE_URL}/products/${productToUpdate._id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJSON = await response.json();

      if (response.ok) {
        const newProducts = [...products];
        const productToUpdateIndex = newProducts.findIndex(
          (filteredProduct) => filteredProduct._id === productToUpdate._id
        );
        newProducts[productToUpdateIndex] = responseJSON;

        setProducts(newProducts);
      } else {
        setError(responseJSON.message);
      }

      setLoading(false);
    }
  }

  async function deleteProduct(product: Product) {
    if (product) {
      if (error) {
        setError("");
      }

      setLoading(true);
      const response = await fetch(`${process.env.BASE_URL}/products/${product._id}`, {
        method: "DELETE",
      });

      const responseJSON = await response.json();

      if (response.status === 204) {
        setProducts((oldProducts) =>
          oldProducts.filter((filteredProduct) => filteredProduct._id !== product._id)
        );
      } else {
        setError(responseJSON.message);
      }
    }

    setLoading(false);
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
        loading,
        error,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
