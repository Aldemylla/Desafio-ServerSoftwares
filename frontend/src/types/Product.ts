export interface Product {
  _id: string;
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro?: Date;
}

export type ProductToSendDB = Omit<Product, "_id">;
