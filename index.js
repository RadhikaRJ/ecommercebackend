const express = require("express");

const port = 3000;
const app = express();

app.use(express.json());

const { initializeDbConnection } = require("./src/database/db.connection");
initializeDbConnection();

const categoryRouter = require("./src/routers/category.router");
app.use("/category", categoryRouter);

const offerRouter = require("./src/routers/offer.router");
app.use("/offer", offerRouter);

const cartRouter = require("./src/routers/cart.router");
app.use("/cart", cartRouter);

const userRouter = require("./src/routers/user.router");
app.use("/user", userRouter);

const productRouter = require("./src/routers/product.router");
app.use("/product", productRouter);

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

app.listen(process.env.PORT || port, () => {
  console.log(`Sample app listening at port ${port}`);
});
