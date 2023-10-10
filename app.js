const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const { mongoConnect } = require("./configs/db");
const User = require("./models/userModel");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("652419539ddb49bfd5d0a51c")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", require("./routes/adminRoutes"));
app.use("/shop", require("./routes/shopRoutes"));

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("server running pn port 3000");
  });
});
