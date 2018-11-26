const mongoose = require("mongoose");
const Order = require("../models/order");

function getAll(req, res) {
  Order.find()
    .select("_id amount clientId")
    .populate("clientId")
    .exec()
    .then(orders => {
      if (!orders) {
        res.status(404).json({ error: `No orders found!` });
      }
      if (orders && orders.length === 0) {
        res.status(204).json({ message: "List of orders is empty." });
      }
      res.status(200).json(
        orders.map(order => {
          return {
            _id: order._id,
            clientId: order.clientId._id,
            amount: order.amount
          };
        })
      );
    })
    .catch(err => res.status(500).json(err));
}

function get(req, res) {
  Order.findById(req.params.id)
    .select("_id amount clientId")
    .exec()
    .then(order => {
      if (!order) {
        res.status(404).json({ error: `Order ID ${req.params.id} not found!` });
      }
      res.status(200).json(order);
    })
    .catch(err => res.status(500).json({ error: err }));
}

function getByClientId(req, res) {
  Order.find({ clientId: req.params.id })
    .select("_id amount clientId")
    .exec()
    .then(order => {
      if (!order) {
        res.status(404).json({
          error: `Orders with the Client ID of ${req.params.id} not found!`
        });
      }
      res.status(200).json(order);
    })
    .catch(err => res.status(500).json({ error: err }));
}

// function get(req, res) {
//   Order.findById(req.params.id).exec((err, order) => {
//     if (err) {
//       res.status(400).json(err);
//     }
//     if (!order) {
//       res.status(404).json({ error: `Order ID ${req.params.id} not found!` });
//     }
//     res.status(200).json(order);
//   });
// }

function create(req, res) {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    amount: req.body.amount,
    clientId: req.body.clientId
  });
  order
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json(err));
}

function destroy(req, res) {
  Order.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      res.status(404).json({ error: err });
    }
    res.status(418).json(result);
  });
}

module.exports = { getAll, get, getByClientId, create, destroy };
