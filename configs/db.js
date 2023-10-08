// const mogoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mogoose.connect(process.env.MONGO_URI);
//     console.log(`Mongodb connected:${conn.connection.host}`.black.underline);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongodb = require("mongodb");
const MondgoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MondgoClient.connect(
    "mongodb+srv://munnurusrinath3898:Munnuru1998@cluster0.mut8kym.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

module.exports = { mongoConnect, getDb };
