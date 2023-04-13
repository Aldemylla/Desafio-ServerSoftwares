import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";

import styles from "@/styles/Home.module.scss";
import "react-toastify/dist/ReactToastify.css";

interface HomeProps {
  data: {
    products: Array<Product>;
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: HomeProps) {
  const {
    products: contextProducts,
    setProducts,
    setProductToUpdate,
    setProductFormModalOpened,
  } = useProductsContext();
  const products: Array<Product> | [] = contextProducts || data.products;
  const [detailedProduct, setDetailedProduct] = useState("");

  useEffect(() => {
    if (contextProducts.length === 0) {
      setProducts(data.products);
    }
  }, []);

  function openProductFormModal() {
    setProductToUpdate(null);
    setProductFormModalOpened(true);
  }

  function handleProductDetail(id: string) {
    setDetailedProduct(id);
  }

  return (
    <>
      <Head>
        <title>Desafio ServerSoftware</title>
        <meta name='description' content='Lista de produtos' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <div className={`${styles.parent_container} ${inter.className}`}>
        <header className={`${styles.header}`}>
          <p className={styles.registered_products}>
            Produtos cadastrados <span className={styles.products_length}>{products.length}</span>
          </p>
        </header>
        <main className={`${styles.main}`}>
          {products?.length !== 0 ? (
            <ul className={styles.product_list}>
              {products.map((product) => (
                <li key={product._id}>
                  <ProductCard
                    onClick={() => handleProductDetail(product._id)}
                    product={product}
                    detailed={product._id === detailedProduct}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.no_products_text}>
              <span role='separator'>:(</span> Ainda não existem produtos cadastrados
            </p>
          )}
          <Button onClick={openProductFormModal}>Cadastrar novo produto</Button>
        </main>

        <ProductModal />
        <ToastContainer newestOnTop />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.BASE_URL}/products`);
  const data = await response.json();

  return { props: { data } };
}

