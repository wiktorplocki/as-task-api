const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.options("*", cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API routes
const clientsOrdersRoutes = require("./routes/clientsOrders");
const clientRoutes = require("./routes/client");
const orderRoutes = require("./routes/order");
app.use("/clients-orders", clientsOrdersRoutes);
app.use("/clients", clientRoutes);
app.use("/orders", orderRoutes);

mongoose
  .connect(`mongodb://root:secret123@ds115874.mlab.com:15874/as-test-db`)
  .then(() => console.log(`connected with DB`));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
