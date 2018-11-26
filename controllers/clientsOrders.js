const Order = require("../models/order");

function aggregate(req, res) {
  Order.aggregate(
    [
      {
        $group: {
          _id: "$clientId",
          total: { $sum: "$amount" }
        }
      }
    ],
    (err, order) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json(order);
    }
  );
}

module.exports = { aggregate };
