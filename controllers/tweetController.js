const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { roundToNearestMinutesWithOptions } = require("date-fns/fp");

// Display a listing of the resource.
async function index(req, res) {
  //const postUser = await User.findById(req.user).populate("tweets").populate("following");
  // la línea 7 trae sus propios Tweets, no los de las personas que sigue.
  const postUser = req.user;
  const userFollowingList = postUser.following;
  //console.log("LISTA DE IDs", userFollowingList);
  //tweetsOfFollowings = await Tweet.find({ author: { $in: userFollowingList } }).populate("author"); // TRAE LOS TWEETS DE GENTE QUE SIGO
  //console.log("LISTA DE TWEETS", tweetsOfFollowings);
  const last100Tweets = await Tweet.find({}).limit(100).populate("author");
  res.render("home", { last100Tweets, postUser });
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function store(req, res) {
  const { following } = req.params;
  await new Tweet({
    content: req.body.comment,
    author: req.user.id,
    articleId: id,
  });
  Tweet.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  console.log("ESTOY DESTRUYENDO EL SIGUIENTE TWEET: ", req.params);
  const { id } = req.params;
  await User.updateOne({ _id: req.user }, { $pull: { tweets: { $in: [id] } } });
  await Tweet.findByIdAndRemove({ _id: id });
  res.redirect("/home");
}
//***************************************************** */
async function likes(req, res) {
  const selectedTweet = await Tweet.findById({ _id: req.params.id });
  //console.log("tweet id seleccionado", req.params.id);
  const lista = selectedTweet.likes;

  //console.log("id USUARIO", req.user._id);
  //console.log(lista.indexOf(req.user._id), "POSICION");

  if (lista.indexOf(req.user._id) < 0) {
    //console.log("entré al IF");
    await Tweet.updateOne({ _id: req.params.id }, { $push: { likes: req.user } });

    res.redirect("/home");
  } else {
    //console.log("entré al ELSE");
    await Tweet.updateOne({ _id: req.params.id }, { $pull: { likes: { $in: [req.user] } } });

    res.redirect("/home");
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  //create,
  store,
  edit,
  update,
  destroy,
  likes,
};
