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
    const product = await Product.create({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user._id,
    });
    return res.status(201).json({
      status: true,
      data: product,
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
    const products = await Product.find({ userId: req.user._id });
    // .select("title price -_id")
    // .populate("userId", "name email");
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
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Product not found" });
    }
    return res.status(201).json({
      status: true,
      data: updatedProduct,
      message: "Product edited successfully",
    });
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
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Product not found" });
    }
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
