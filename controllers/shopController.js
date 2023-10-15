const Order = require("../models/orderModel");
const Product = require("../models/productModel");

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
    if (!product) {
      return res
        .status(404)
        .json({ status: false, data: null, messgae: "No product found" });
    }
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
    const cart = await req.user.populate("cart.products.product");
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
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "No product found" });
    }
    const updatedCart = await req.user.deleteProductFromCart(product);
    return res.status(200).json({
      status: true,
      data: updatedCart,
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
    const cartProducts = req.user.cart.products;
    if (cartProducts.length === 0) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Your cart is empty" });
    }
    const order = await Order.create({
      products: cartProducts,
      user: req.user._id,
      totalPrice: req.user.cart.totalPrice,
    });
    if (!order) {
      throw new Error(
        "Something went wrong while placing order, please try again"
      );
    }
    await req.user.clearCart();
    return res.status(201).json({
      status: true,
      data: order,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
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
