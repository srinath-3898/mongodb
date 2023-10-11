const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const connectDB = require("./configs/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   // User.findById("6526b9aacbd88b62e6b3db29")
//   //   .then((user) => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch((err) => console.log(err));
// });
app.use("/admin", require("./routes/adminRoutes"));
app.use("/shop", require("./routes/shopRoutes"));

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server running pn port 3000");
  });
});
