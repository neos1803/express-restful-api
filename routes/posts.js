const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");
const upload = require("../middleware/UploadMiddleware")

router.get("/", PostController.read);
router.post("/", upload.single("image"), PostController.create);
router.get("/:id", PostController.find);
router.patch("/:id", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;