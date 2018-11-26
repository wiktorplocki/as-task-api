const express = require("express");
const Ctrl = require("../controllers/client");
const router = express.Router();

router.get("/", Ctrl.getAll);
router.get("/:id", Ctrl.get);
router.post("/", Ctrl.create);
router.delete("/:id", Ctrl.destroy);

module.exports = router;
