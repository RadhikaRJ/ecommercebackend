const mongoose = require("mongoose");

function initializeDbConnection() {
  mongoose
    .connect(
      "mongodb+srv://radhikarjoshi:2%24RJoshi%242@neog-cluster.hcvgh.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connection to Mongoose successful"))
    .catch((err) =>
      console.log("connection failed. Error message: ", err.message)
    );
}

module.exports = { initializeDbConnection };
