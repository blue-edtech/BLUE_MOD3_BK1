const router = require("express").Router();

const tweetsController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/create", authMiddleware, tweetsController.createTweetController);

router.get("/", authMiddleware, tweetsController.findAllTweetsController);

router.get("/search", authMiddleware, tweetsController.searchTweetController);

router.patch("/:id/like", authMiddleware, tweetsController.likeTweetController);

router.patch(
  "/:id/comment",
  authMiddleware,
  tweetsController.commentTweetController
);

router.patch(
  "/:id/retweet",
  authMiddleware,
  tweetsController.retweetController
);

module.exports = router;
