const express = require("express");
const {
  getProducts,
  getProductById,
  addProductToCart,
  getCart,
  deleteProductFromCart,
  placeOrder,
  getOrders,
} = require("../controllers/shopController");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.get("/add-to-cart/:productId", addProductToCart);
router.get("/cart", getCart);
router.get("/delete-product/:productId", deleteProductFromCart);
router.get("/place-order", placeOrder);
router.get("/get-orders", getOrders);

module.exports = router;
