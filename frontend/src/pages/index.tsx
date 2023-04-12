import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
          Produtos cadastrados: <span>0</span>
        </p>
      </header>
      <main>
        <div>
          <p>:( Ainda não existem produtos cadastrados.</p>
          <button>Adicionar novo produto</button>
        </div>
      </main>
    </>
  );
}

