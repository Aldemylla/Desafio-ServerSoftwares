import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";
import { MouseEventHandler, MouseEvent } from "react";

interface ProductCardProps {
  product: Product;
  onClick: MouseEventHandler;
  detailed: boolean;
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
    <div onClick={onClick}>
      <h2>Código: {codigo}</h2>
      <p>Descrição: {descricao}</p>
      {detailed && (
        <>
          <p>Preço: {preco}</p>
          <p>Data do cadastro: {String(data_cadastro)}</p>
        </>
      )}
      <div role='group' aria-label='Ações'>
        <button type='button' onClick={handleEditProduct}>
          Editar
        </button>
        <button type='button' onClick={handleDeleteProduct}>
          Deletar
        </button>
      </div>
    </div>
  );
}
