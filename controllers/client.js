const mongoose = require("mongoose");
const Client = require("../models/client");

function getAll(req, res) {
  Client.find()
    .select("_id name surname")
    .exec()
    .then(clients => {
      res.status(200).json(clients);
    })
    .catch(err => res.status(500).json(err));
}

function get(req, res) {
  Client.findById(req.params.id)
    .select("_id name surname")
    .exec()
    .then(client => {
      if (!client) {
        return res.status(404).json({
          error: `Client ID ${req.body.id} not found!`
        });
      }
      res.status(200).json(client);
    })
    .catch(err => res.status(500).json({ error: err }));
}

function create(req, res) {
  const client = new Client({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname
  });
  client
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json(err));
}

function destroy(req, res) {
  Client.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      res.status(404).json({ error: err });
    }
    res.status(418).json(result);
  });
}

module.exports = { getAll, get, create, destroy };
