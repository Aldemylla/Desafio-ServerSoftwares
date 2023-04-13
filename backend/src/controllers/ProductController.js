const Product = require("../models/Product");

module.exports = {
  async index(request, response) {
    try {
      const products = await Product.find({});
      return response.status(200).json({ products });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Erro ao recuperar os produtos.", error: error.message });
    }
  },

  async create(request, response) {
    const { codigo, descricao, preco } = request.body;

    if (!codigo || !descricao || !preco) {
      return response.status(400).json({ message: "Estão faltando campos obrigatórios." });
    }

    const existingProduct = await Product.findOne({ codigo });

    if (existingProduct) {
      return response.status(400).json({ message: "Já existe um produto com esse código." });
    }

    const product = new Product({ codigo, descricao, preco });

    try {
      await product.save();
      return response.status(201).json(product);
    } catch (error) {
      response.status(400).json({ message: "Erro ao criar o produto.", error: error.message });
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
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao atualizar produto.", error: error.message });
    }
  },

  async delete(request, response) {
    try {
      await Product.findByIdAndDelete(request.params.id);
      return response.status(204).send();
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao deletar o produto.", error: error.message });
    }
  },
};
