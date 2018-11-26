const express = require("express");
const Ctrl = require("../controllers/clientsOrders");
const router = express.Router();

router.get("/", Ctrl.aggregate);

module.exports = router;
