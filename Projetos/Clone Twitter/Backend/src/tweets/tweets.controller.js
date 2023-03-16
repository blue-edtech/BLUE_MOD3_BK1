const tweetsService = require("./tweets.service");

const createTweetController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).send({
        message:
          "Você não enviou todos os dados necessários para a criação do tweet!",
      });
    }

    const { id } = await tweetsService.createTweetService(message, req.userId);

    return res.send({
      message: "Tweet criado com sucesso!",
      tweet: { id, message },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllTweetsController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const tweets = await tweetsService.findAllTweetsService(limit, offset);

    // Total

    const total = await tweetsService.numberMaxTweets();

    // Pagination

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    return res.send({
      // Pagination
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      // Results
      results: tweets.map((tweet) => ({
        id: tweet._id,
        username: tweet.user.username,
        name: tweet.user.name,
        avatar: tweet.user.avatar,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchTweetController = async (req, res) => {
  const { message } = req.query;

  const tweets = await tweetsService.searchTweetService(message);

  if (tweets.length === 0) {
    return res.status(404).send({ message: "Tweet não encontrado!" });
  }

  return res.send({
    tweets: tweets.map((tweet) => ({
      id: tweet._id,
      username: tweet.user.username,
      name: tweet.user.name,
      avatar: tweet.user.avatar,
      message: tweet.message,
      likes: tweet.likes.length,
      comments: tweet.comments.length,
      retweets: tweet.retweets.length,
    })),
  });
};

const likeTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetLiked = await tweetsService.likeTweetService(id, userId);

  if (tweetLiked.lastErrorObject.n === 0) {
    return res.status(400).send({ message: "Você já deu like neste tweet!" });
  }

  return res.send({
    message: "Like realizado com sucesso!",
  });
};

const commentTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const comment = await tweetsService.commentTweetService(id, userId);

  return res.send({
    message: "Comentário realizado com sucesso!",
  });
};

const retweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const retweet = await tweetsService.retweetService(id, userId);

  if (retweet.lastErrorObject.n === 0) {
    return res.status(400).send({ message: "Você já retwitou esse tweet!" });
  }

  return res.send({
    message: "Retweet realizado com sucesso!",
  });
};

module.exports = {
  createTweetController,
  findAllTweetsController,
  searchTweetController,
  likeTweetController,
  commentTweetController,
  retweetController,
};
