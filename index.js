const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const { initializeDbConnection } = require("./src/database/db.connection");
initializeDbConnection();

const categoryRouter = require("./src/route/category.route");
app.use("/category", categoryRouter);

const offerRouter = require("./src/route/offer.route");
app.use("/offer", offerRouter);

const cartRouter = require("./src/route/cart.route");
app.use("/cart", cartRouter);

const userRouter = require("./src/route/user.route");
app.use("/user", userRouter);

const productRouter = require("./src/route/product.route");
app.use("/product", productRouter);

const wishlistRouter = require("./src/route/wishlist.route");
app.use("/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.json({ Hello: "world" });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    errMsg: "route not found on server, please check path",
  });
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    errMessage: err.message,
  });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sample app listening at port ${port}`);
});
