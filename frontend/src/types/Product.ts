export interface Product {
  _id: string;
  codigo: string;
  descricao: string;
  preco: string;
  data_cadastro?: Date;
}

export type ProductToSendDB = Omit<Product, "_id">;
