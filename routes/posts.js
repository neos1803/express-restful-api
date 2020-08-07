const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

router.get("/", PostController.read);
router.post("/", PostController.create);
router.get("/:id", PostController.find);
router.patch("/:id", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;