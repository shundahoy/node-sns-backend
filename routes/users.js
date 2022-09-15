const router = require("express").Router();

const User = require("../models/User");

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findOneAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が消去されました");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を消去できます");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
      } else {
        return res.status(500).json("すでにフォローしている");
      }
      res.status(200).json("フォローに成功しました");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("自分自身をフォローできない");
  }
});

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
      } else {
        return res.status(500).json("すでにフォローしていない");
      }
      res.status(200).json("フォロー解除に成功しました");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("自分自身をフォロー解除できない");
  }
});

module.exports = router;
