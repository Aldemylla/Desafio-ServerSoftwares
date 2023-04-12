const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  data_cadastro: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
