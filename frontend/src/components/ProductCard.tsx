import React from "react";

type ProductCardProps = {
  codigo: string;
  descricao: string;
};

export function ProductCard({ codigo, descricao }: ProductCardProps) {
  return (
    <article>
      <h2>Código: {codigo}</h2>
      <p>Descrição: {descricao}</p>
      <div role='group' aria-label='Ações'>
        <button type='button' onClick={() => console.log("Editar")}>
          Editar
        </button>
        <button type='button' onClick={() => console.log("Deletar")}>
          Deletar
        </button>
        <button type='button' onClick={() => console.log("Detalhes")}>
          Detalhes
        </button>
      </div>
    </article>
  );
}
