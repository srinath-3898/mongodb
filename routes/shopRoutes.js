const express = require("express");
const {
  getProducts,
  getProductById,
  addProductToCart,
} = require("../controllers/shopController");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.post("/add-to-cart", addProductToCart);

module.exports = router;
