const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ status: true, data: { products }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { price, name } = req.body;
    if (!price || !name) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Missing require fields" });
    }
    const product = await Product.create({ price, name });
    return res.status(201).json({
      status: true,
      data: { product },
      message: "Product added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { getProducts, addProduct };
