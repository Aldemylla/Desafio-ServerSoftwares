export interface Product {
  _id: string;
  codigo: string;
  descricao: string;
  preco: number;
  data_cadastro?: Date;
}
