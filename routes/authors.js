const express = require("express");
const router = express.Router();
const models = require("../models")

const AuthorController = require("../controllers/AuthorController");

// const AuthMiddleware = require("../middleware/AuthMiddleware")

router.get("/", AuthorController.read);
router.post("/", AuthorController.create);
router.get("/:id", AuthorController.find);
router.patch("/:id", AuthorController.update);
router.delete("/:id", AuthorController.delete);

module.exports = router;