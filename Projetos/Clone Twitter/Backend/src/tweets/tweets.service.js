const Tweet = require("./Tweet");

const createTweetService = (message, userId) =>
  Tweet.create({
    message,
    user: userId,
  });

// populate mostra todas as informações do usuario que fez o tweet
const findAllTweetsService = (limit, offset) =>
  Tweet.find().sort({ _id: -1 }).limit(limit).skip(offset).populate("user");

const numberMaxTweets = () => Tweet.countDocuments();

const searchTweetService = (message) =>
  Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  }).populate("user");

const likeTweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const commentTweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

const retweetService = (id, userId) =>
  Tweet.findOneAndUpdate(
    {
      _id: id,
      "retweets.userId": { $nin: [userId] },
    },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );

module.exports = {
  createTweetService,
  findAllTweetsService,
  numberMaxTweets,
  searchTweetService,
  likeTweetService,
  commentTweetService,
  retweetService,
};
