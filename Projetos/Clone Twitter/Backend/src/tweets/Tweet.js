const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  user: {
    // parâmetro para receber o id do usuário associado ao projeto
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  likes: { type: Array, required: false },
  comments: { type: Array, required: false },
  retweets: { type: Array, required: false },
});

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;
