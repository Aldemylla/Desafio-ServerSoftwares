const express = require("express");
const routes = express.Router();

const ProductController = require("../controllers/ProductController");

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.create);
// router.put('/products/:codigo', productController.update);
// router.delete('/products/:codigo', productController.delete);

module.exports = routes;
