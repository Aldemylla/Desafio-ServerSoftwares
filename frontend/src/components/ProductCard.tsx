import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";
import { MouseEventHandler } from "react";

interface ProductCardProps {
  product: Product;
  onClick: MouseEventHandler;
  detailed: boolean;
}

export function ProductCard({ product, onClick, detailed }: ProductCardProps) {
  const { _id, codigo, descricao, preco, data_cadastro } = product;
  const { deleteProduct } = useProductsContext();

  async function handleDeleteProduct() {
    const response = await fetch(`${process.env.BASE_URL}/products/${_id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      deleteProduct(product);
      console.log("Produto deletado com sucesso!");
    }
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
        <button type='button' onClick={() => console.log("editar")}>
          Editar
        </button>
        <button type='button' onClick={handleDeleteProduct}>
          Deletar
        </button>
      </div>
    </div>
  );
}
