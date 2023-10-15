const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const connectDB = require("./configs/db");
const User = require("./models/userModel");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("652b707500854d9af1b47fe8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", require("./routes/adminRoutes"));
app.use("/shop", require("./routes/shopRoutes"));

connectDB().then(async () => {
  const user = await User.findOne();
  if (!user) {
    await User.create({
      name: "srinath",
      email: "srinath.3898@gmail.com",
      cart: { products: [] },
    });
  }
  app.listen(3000, () => {
    console.log("server running pn port 3000");
  });
});
