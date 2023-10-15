const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cart: {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
      totalPrice: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.products.findIndex((cartProduct) => {
    return cartProduct.product.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartProducts = [...this.cart.products];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.products[cartProductIndex].quantity + 1;
    updatedCartProducts[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartProducts.push({
      product: product._id,
      quantity: newQuantity,
    });
  }
  this.cart.products = updatedCartProducts;
  this.cart.totalPrice += product.price;
  return this.save();
};

userSchema.methods.deleteProductFromCart = function (product) {
  const toBeDeletedProdcutId = this.cart.products.findIndex(
    (cartProduct) => product._id.toString() === cartProduct.product.toString()
  );
  if (toBeDeletedProdcutId >= 0) {
    const toBeDeletedProdcut = this.cart.products[toBeDeletedProdcutId];
    const updatedCartProducts = this.cart.products.filter((cartProduct) => {
      return cartProduct.product.toString() !== product._id.toString();
    });
    this.cart.products = updatedCartProducts;
    this.cart.totalPrice -= product.price * toBeDeletedProdcut.quantity;
    return this.save();
  } else {
    throw new Error("No such product in your cart");
  }
};

userSchema.methods.clearCart = function () {
  this.cart = { products: [], totalPrice: 0 };
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
