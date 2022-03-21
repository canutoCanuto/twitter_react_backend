const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { roundToNearestMinutesWithOptions } = require("date-fns/fp");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const postUser = req.user;
    const { following } = await User.findById(req.user.sub, { following: 1 }); //Followings usuario logueado
    const tweetsFollowings = await Tweet.find({ author: { $in: following } }).populate("author"); //Tweets followings usuario logueado
    const last100Tweets = await Tweet.find({}).limit(100).populate("author"); //Tweets aleatorios
    console.log(tweetsFollowings);

    res.status(200).json({ tweetsFollowings, last100Tweets, postUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const newTweet = await new Tweet({
      content: req.body.content,
      author: req.user.sub,
    });
    console.log(newTweet);
    await newTweet.save();
    const newTweetWithAuthor = await newTweet.populate("author");
    User.findByIdAndUpdate(req.user.sub, { $push: { tweets: newTweet.id } });
    res.status(200).json(newTweetWithAuthor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There was an error" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(req.user.sub, { $pull: { tweets: id } });

    if (user) {
      await Tweet.findByIdAndRemove(id);
      res.status(200).json({ message: "Tweet deleted successfully" });
    } else {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
//***************************************************** */
async function likes(req, res) {
  try {
    const selectedTweet = await Tweet.findById({ _id: req.params.id });
    //console.log("tweet id seleccionado", req.params.id);
    const lista = selectedTweet.likes;

    if (lista.indexOf(req.user.sub) < 0) {
      //console.log("entré al IF");
      const upDatedTweet = await Tweet.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { likes: req.user.sub } },
        { returnOriginal: false },
      ).populate("author");

      res.status(200).json({ upDatedTweet });
    } else {
      //console.log("entré al ELSE");
      const upDatedTweet = await Tweet.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: { $in: [req.user.sub] } } },
        { returnOriginal: false },
      ).populate("author");

      res.status(200).json({ upDatedTweet });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  store,
  destroy,
  likes,
};
