const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController");

router.get("/", CommentController.read);
router.post("/", CommentController.create);
router.get("/:id", CommentController.find);
router.patch("/:id", CommentController.update);
router.delete("/:id", CommentController.delete);

module.exports = router;