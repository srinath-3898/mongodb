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
  return this.save();
};

userSchema.methods.deleteProductFromCart = function (productId) {
  const updatedCartProducts = this.cart.products.filter((cartProduct) => {
    return cartProduct.product.toString() !== productId.toString();
  });

  this.cart.products = updatedCartProducts;
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
