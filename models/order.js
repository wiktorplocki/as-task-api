const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  amount: { type: Number, default: 1 }
});

module.exports = mongoose.model("Order", OrderSchema);
