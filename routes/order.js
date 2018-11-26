const express = require("express");
const Ctrl = require("../controllers/order");
const router = express.Router();

router.get("/", Ctrl.getAll);
router.get("/:id", Ctrl.get);
router.get("/clientId/:id", Ctrl.getByClientId);
router.post("/", Ctrl.create);
router.delete("/:id", Ctrl.destroy);

module.exports = router;
