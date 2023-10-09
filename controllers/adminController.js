const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { title, price, description, imageUrl } = req.body;
    if (!title || !price || !description || !imageUrl) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Missing required fields",
      });
    }
    const product = new Product(
      title,
      price,
      description,
      imageUrl,
      req.user._id
    );
    await product.save();

    return res.status(201).json({
      status: true,
      data: result,
      message: "Prodcut added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    console.log(products);
    return res
      .status(200)
      .json({ status: true, data: { products }, message: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Missing product id" });
    }
    const { title, price, description, imageUrl } = req.body;
    if (!title || !price || !description || !imageUrl) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Missing required fields",
      });
    }
    const product = new Product(title, price, description, imageUrl);
    await product.save(productId);
    return res
      .status(201)
      .json({ status: true, data: null, message: "Product edit successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json({ status: false, data: null, message: "Missing product id" });
    }
    const deletedProduct = await Product.delete(productId);
    return res.status(201).json({
      status: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, data: null, message: error.message });
  }
};

module.exports = { addProduct, getProducts, editProduct, deleteProduct };
