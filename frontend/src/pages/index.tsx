import Head from "next/head";
import { useState } from "react";

import { ProductModal } from "@/components/ProductModal";
import { ProductCard } from "@/components/ProductCard";

interface HomeProps {
  data: {
    products: Array<Product>;
  };
}

interface Product {
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro: Date;
}

export default function Home({ data }: HomeProps) {
  const { products } = data;
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
            {products.map(({ codigo, descricao }) => (
              <li key={codigo}>
                <ProductCard codigo={codigo} descricao={descricao} />
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
  const res = await fetch(`${process.env.API_URL}/products`);
  const data = await res.json();

  return { props: { data } };
}

