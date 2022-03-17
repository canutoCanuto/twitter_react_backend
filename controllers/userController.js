const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { format } = require("date-fns");
const jwt = require("jsonwebtoken");

// show profile
async function show(req, res) {
  try {
    const postUser = await User.findOne({ username: req.params.username });
    const tweets = await Tweet.find({ author: postUser._id });
    const formattedDate = format(postUser.createdAt, "MMMM yyyy");

    res.status(200).json({ postUser, formattedDate, tweets });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "error" });
  }
}
// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: "usuario creado" });
  } catch (error) {
    console.log(error);
    res.json({ message: "ocurrió un error" });
  }
}
//************************************************ */
async function toggleFollowings(req, res) {
  const selectedUser = await User.findById({ _id: req.params.id });
  const followersList = selectedUser.followers;
  const userId = req.user.sub;
  /*   console.log(
    followersList.some((item) => item._id === req.user._id), // RESULTADO FALSE , FINDINDEX -1
    "POSICION del SOME", // ---> item._id ---> modificación de item a item._id 1/3/21
  ); */

  if (followersList.indexOf(req.user._id) < 0) {
    console.log("entré al IF, NO LO SEGUIA");
    const user = await User.findByIdAndUpdate(userId, { $push: { following: selectedUser._id } });
    const followerUser = await User.findByIdAndUpdate(selectedUser._id, {
      $push: { followers: userId },
    });
    res.status(200).json({ user, followerUser });
  } else {
    console.log("entré al ELSE, YA LO SEGUIA Y AHORA NO");
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { following: { $in: [selectedUser._id] } },
    });
    const unFollowerUser = await User.findByIdAndUpdate(selectedUser._id, {
      $pull: { followers: { $in: [userId] } },
    });

    res.status(200).json({ user, unFollowerUser });
  }
}
//Logout
async function logout(req, res) {
  await req.logout();
  res.status(200).json({ message: "logout ok" });
}

//*************    Generar y borrar token        ************************* */

async function getToken(req, res) {
  const user = await User.findOne({ username: req.body.username });

  if (user && (await user.validPassword(req.body.password))) {
    const token = jwt.sign({ sub: user._id }, process.env.ACCESS_TOKEN_SECRET);
    await User.updateOne({ _id: user.id }, { $push: { tokens: token } });
    res.status(200).json({ id: user.id, username: user.username, token: token });
  } else {
    res.status(401).json({ message: "error" });
  }
}

async function deleteToken(req, res) {
  const user = await User.updateOne({ _id: user.id }, { $pullAll: { tokens: token } });
  res.status(200).json({ user });
}

// Otros handlers...
// ...

module.exports = {
  show,
  logout,
  store,
  toggleFollowings,
  getToken,
  deleteToken,
};
