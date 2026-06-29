const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/posts", postController.getPosts);
router.post("/posts", postController.createPost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
