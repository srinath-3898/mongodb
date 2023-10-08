// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema(
//   {
//     price: { type: Number, required: true },
//     name: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
const mongodb = require("mongodb");
const { getDb } = require("../configs/db");

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save(productId) {
    const db = getDb();
    if (productId) {
      return db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(productId) }, { $set: this })
        .then((product) => product)
        .catch((err) => err);
    } else {
      return db
        .collection("products")
        .insertOne(this)
        .then((product) => product)
        .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static delete(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then((product) => product)
      .catch((err) => err);
  }
}

module.exports = Product;
