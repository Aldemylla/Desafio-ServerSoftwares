const Product = require("../models/Product");

module.exports = {
  async index(request, response) {
    try {
      const products = await Product.find({});
      return response.status(200).json({ products });
    } catch (error) {
      response.status(500).json({ message: "Erro ao recuperar os produtos." });
    }
  },

  async create(request, response) {
    const { codigo, descricao, preco } = request.body;

    if (!codigo || !descricao || !preco) {
      return response.status(400).json({ message: "Estão faltando campos obrigatórios." });
    }

    const product = new Product({ codigo, descricao, preco });

    try {
      await product.save();
      return response.status(201).json({ product });
    } catch (error) {
      response.status(400).json({ message: "Erro ao criar o produto." });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const updateData = request.body;

    try {
      const productUpdated = await Product.findByIdAndUpdate(id, updateData, { new: true });

      if (!productUpdated) {
        return response.status(404).json({ message: "Produto não encontrado." });
      }

      return response.status(200).json(productUpdated);
    } catch (err) {
      return response.status(400).json({ error: "Erro ao atualizar produto." });
    }
  },

  async delete(request, response) {
    try {
      await Product.findByIdAndDelete(request.params.id);
      return response.status(204).send({ message: "Produto deletado com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: "Erro ao deletar o produto." });
    }
  },
};
