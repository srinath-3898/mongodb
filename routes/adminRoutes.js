const express = require("express");
const {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/products", getProducts);
router.post("/edit-product/:productId", editProduct);
router.delete("/delete-product/:productId", deleteProduct);

module.exports = router;
