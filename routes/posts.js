const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = new Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("成功");
    } else {
      return res.status(403).json("ほかの人の投稿です");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
