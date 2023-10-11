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

  static addToCart(product, userId, cart) {
    const cartProductId = cart.products.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartProducts = [...cart.products];
    if (cartProductId >= 0) {
      newQuantity = cart.products[cartProductId].quantity + 1;
      updatedCartProducts[cartProductId].quantity = newQuantity;
    } else {
      updatedCartProducts.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      products: updatedCartProducts,
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

  static getCart(cart) {
    const db = getDb();
    const productIds = cart.products.map((product) => product.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: cart.products.find((i) => {
              return i.productId.toString() === product._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => err);
  }

  static deleteProductFromCart(productId, userId, cart) {
    const updatedCartProducts = cart.products.filter(
      (product) => product.productId.toString() !== productId.toString()
    );
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(userId) },
        { $set: { cart: { products: updatedCartProducts } } }
      )
      .then((result) => result)
      .catch((err) => err);
  }

  static addOrder(user) {
    const db = getDb();
    return this.getCart(user.cart)
      .then((products) => {
        console.log(products);
        const order = {
          items: products,
          user: {
            _id: new mongodb.ObjectId(user._id),
            name: user.username,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        cart = { products: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(user._id) },
            { $set: { cart: { products: [] } } }
          );
      })
      .catch((err) => err);
  }

  static getOrders(user) {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new mongodb.ObjectId(user._id) })
      .toArray()
      .then((orders) => orders)
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
