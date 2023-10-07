const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/db");
require("colors");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", require("./routes/productRoutes"));

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server running pn port 3000");
  });
});
