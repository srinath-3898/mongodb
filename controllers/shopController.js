const Product = require("../models/productModel");
const User = require("../models/userModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    return res.json({ status: true, data: { products }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const product = await Product.findById(productId);
    return res
      .status(200)
      .json({ status: true, data: { product }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Missing product id" });
    }
    const product = await Product.findById(productId);
    const result = await User.addToCart(product, req.user._id);
    return res.status(201).json({
      status: true,
      data: result,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { getProducts, getProductById, addProductToCart };
