const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const { mongoConnect } = require("./configs/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", require("./routes/adminRoutes"));
app.use("/shop", require("./routes/shopRoutes"));

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("server running pn port 3000");
  });
});
