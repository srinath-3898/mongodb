const express = require("express");
const {
  getProducts,
  getProductById,
  addProductToCart,
  getCart,
  deleteProductFromCart,
} = require("../controllers/shopController");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.post("/add-to-cart", addProductToCart);
router.get("/cart", getCart);
router.get("/delete-product/:productId", deleteProductFromCart);

module.exports = router;
