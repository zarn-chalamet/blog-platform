const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.get("/", getBlogs);

router.post("/", createBlog);

router.get("/:id", getBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
