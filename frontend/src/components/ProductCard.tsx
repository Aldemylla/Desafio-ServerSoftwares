import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/Product";
import React from "react";

export function ProductCard(product: Product) {
  const { _id, codigo, descricao } = product;
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
    <div>
      <h2>Código: {codigo}</h2>
      <p>Descrição: {descricao}</p>
      <div role='group' aria-label='Ações'>
        <button type='button' onClick={() => console.log("editar")}>
          Editar
        </button>
        <button type='button' onClick={handleDeleteProduct}>
          Deletar
        </button>
        <button type='button' onClick={() => console.log("Detalhes")}>
          Detalhes
        </button>
      </div>
    </div>
  );
}
