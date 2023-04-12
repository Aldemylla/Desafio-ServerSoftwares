import Head from "next/head";
import { useEffect, useState } from "react";

import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";
import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";

interface HomeProps {
  data: {
    products: Array<Product>;
  };
}

export default function Home({ data }: HomeProps) {
  const { products: contextProducts, setProducts } = useProductsContext();
  const products: Array<Product> | [] = contextProducts || data.products;

  useEffect(() => {
    if (contextProducts.length === 0) {
      setProducts(data.products);
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  function handleModal() {
    setModalOpen((prev) => !prev);
  }

  return (
    <>
      <Head>
        <title>Desafio ServerSoftware</title>
        <meta name='description' content='Lista de produtos' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <header>
        <h1>Produtos</h1>
        <p>
          Produtos cadastrados: <span>{products.length}</span>
        </p>
      </header>
      <main>
        {products?.length !== 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <ProductCard {...product} />
              </li>
            ))}
          </ul>
        ) : (
          <p>:( Ainda não existem produtos cadastrados.</p>
        )}
        <button onClick={handleModal}>Cadastrar novo produto</button>
      </main>
      <ProductModal open={modalOpen} />
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.BASE_URL}/products`);
  const data = await response.json();

  return { props: { data } };
}

