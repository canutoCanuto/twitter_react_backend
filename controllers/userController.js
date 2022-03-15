const User = require("../models/User");
const Tweet = require("../models/Tweet");
const passport = require("passport");
const { format } = require("date-fns");

// verify login.
const verifyLogin = passport.authenticate("local", {
  successRedirect: res.status(200).json({ message: "usuario autenticado" }),
  failureRedirect: res.status(400).json({ message: "error de autenticación" }),
});
//Logout
async function logout(req, res) {
  await req.logout();
  res.status(200).json({ message: "logout ok" });
}
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
  /*   console.log(
    followersList.some((item) => item._id === req.user._id), // RESULTADO FALSE , FINDINDEX -1
    "POSICION del SOME", // ---> item._id ---> modificación de item a item._id 1/3/21
  ); */

  if (followersList.indexOf(req.user._id) < 0) {
    console.log("entré al IF, NO LO SEGUIA");
    const user = await User.findByIdAndUpdate(req.user, { $push: { following: selectedUser._id } });
    await User.findByIdAndUpdate(selectedUser._id, { $push: { followers: req.user._id } });
    res.status(200).json({ user });
  } else {
    console.log("entré al ELSE, YA LO SEGUIA Y AHORA NO");
    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { following: { $in: [selectedUser._id] } },
    });
    await User.findByIdAndUpdate(selectedUser._id, { $pull: { followers: { $in: [req.user] } } });

    res.status(200).json({ user });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  showLogin,
  verifyLogin,
  logout,
  create,
  store,
  edit,
  update,
  destroy,
  showstart,
  toggleFollowings,
};
