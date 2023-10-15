const Product = require("../models/productModel");
const User = require("../models/userModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
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
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Missing product id" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Product not found" });
    }
    const updatedCart = await req.user.addToCart(product);
    return res.status(201).json({
      status: true,
      data: updatedCart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    if (!req.user.cart.products) {
      return res.status(200).json({
        status: true,
        data: { cart: [] },
        message: "Cart is empty",
      });
    }
    const cart = await req.user.populate("cart.products.productId");
    return res.status(200).json({ status: true, data: cart, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await User.deleteProductFromCart(productId, req.user._id, req.user.cart);
    return res.status(200).json({
      status: true,
      data: null,
      message: "Product deleted from cart successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    await User.addOrder(req.user);
    return res
      .status(201)
      .json({ status: true, data: null, message: "Order placed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await User.getOrders(req.user);
    return res
      .status(200)
      .json({ status: true, data: { orders }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProductToCart,
  getCart,
  deleteProductFromCart,
  placeOrder,
  getOrders,
};
