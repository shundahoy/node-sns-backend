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

module.exports = router;
