const { getDb } = require("../configs/db");
const mongodb = require("mongodb");

class User {
  constructor(username, email, mobileNumber, password) {
    this.username = username;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
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
