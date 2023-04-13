import { MouseEventHandler, MouseEvent } from "react";
import Image from "next/image";

import { useProductsContext } from "@/contexts/ProductsContext";
import styles from "@/styles/ProductCard.module.scss";

import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  onClick: MouseEventHandler;
  detailed: boolean;
}

interface ProductInfoProps {
  title: string;
  info: string;
}

function ProductInfo({ title, info }: ProductInfoProps) {
  return (
    <p>
      <strong>{title}:</strong> {info}
    </p>
  );
}

export function ProductCard({ product, onClick, detailed }: ProductCardProps) {
  const { codigo, descricao, preco, data_cadastro } = product;
  const { setProductToUpdate, setProductFormModalOpened, deleteProduct } = useProductsContext();

  function handleEditProduct(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setProductToUpdate(product);
    setProductFormModalOpened(true);
  }

  async function handleDeleteProduct(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    deleteProduct(product);
  }

  return (
    <div onClick={onClick} className={styles.container}>
      <div role='group' className={styles.infos_container}>
        <ProductInfo title={"Código"} info={codigo} />
        <ProductInfo title={"Descrição"} info={descricao} />
        {detailed && (
          <>
            <ProductInfo title={"Preço"} info={`${preco}`} />
            <ProductInfo title={"Data do cadastro"} info={`${data_cadastro}`} />
          </>
        )}
      </div>
      <div role='group' aria-label='Ações' className={styles.actions_container}>
        <button type='button' onClick={handleEditProduct} className={styles.action_edit}>
          <Image
            className={styles.action_icon}
            src={"/icons/edit.svg"}
            alt='Editar'
            width={15}
            height={15}
          />
          <p>Editar</p>
        </button>
        <button type='button' onClick={handleDeleteProduct} className={styles.action_delete}>
          <Image
            className={styles.action_icon}
            src={"/icons/delete.svg"}
            alt='Deletar'
            width={15}
            height={15}
          />
          <p>Deletar</p>
        </button>
      </div>
    </div>
  );
}
