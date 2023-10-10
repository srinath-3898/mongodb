const { getDb } = require("../configs/db");
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart) {
    this.username = username;
    this.email = email;
    this.cart = cart;
  }
  save(userId) {
    const db = getDb();
    if (userId) {
      return db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: this })
        .then((user) => user)
        .catch((err) => err);
    } else {
      return db
        .collection("users")
        .insertOne(this)
        .then((user) => user)
        .catch((err) => console.log(err));
    }
  }

  static addToCart(product, userId) {
    // const cartProductId = this.cart.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });
    const updatedCart = {
      products: [{ productId: new mongodb.ObjectId(product.Id), quantity: 1 }],
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(userId) },
        { $set: { cart: updatedCart } }
      )
      .then((result) => result)
      .catch((err) => err);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
