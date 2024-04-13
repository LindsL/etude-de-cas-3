const express = require("express");
const usersController = require("./users.controller");
const authMiddleware = require("../../middlewares/auth.js")
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", authMiddleware, usersController.create);
router.put("/:id", authMiddleware, usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
