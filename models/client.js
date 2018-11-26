const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

module.exports = mongoose.model("Client", ClientSchema);
