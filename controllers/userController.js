const User = require("../models/User");
const Tweet = require("../models/Tweet");
const passport = require("passport");
const { format } = require("date-fns");

// Display a listing of the resource.
async function index(req, res) {}

// Show the start
async function showstart(req, res) {
  try {
    res.render("start");
  } catch (error) {
    res.status(404).send("error");
  }
}
// Show the form for login
async function showLogin(req, res) {
  try {
    res.render("login");
  } catch (error) {
    res.status(404).send("error");
  }
}
// verify login.
const verifyLogin = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});
//Logout
async function logout(req, res) {
  await req.logout();
  res.redirect("/");
}
// show profile
async function show(req, res) {
  try {
    const postUser = await User.findOne({ username: req.params.username });
    const tweets = await Tweet.find({ author: postUser._id });
    const formattedDate = format(postUser.createdAt, "MMMM yyyy");

    res.render("userProfile", { postUser, formattedDate, tweets });
  } catch (error) {
    console.log(error.message);
    res.status(404).send("error");
  }
}

// Show the form for creating a new resource.
async function create(req, res) {
  try {
    res.render("userForm");
  } catch (error) {
    res.status(404).send("error");
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.resdirect("/home");
  } catch (error) {
    console.log(error);
    res.json({ message: "Ocurrió un error" });
  }
}
//***************************************************** */
// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

//************************************************ */
async function toggleFollowings(req, res) {
  const selectedUser = await User.findById({ _id: req.params.id });
  console.log("************ AGREGAR O  QUITAR DE LISTA FOLLOWINGS-FOLLOWERS ****************");
  const followersList = selectedUser.followers;
  console.log(req.user._id, "ID_ USER");
  console.log(followersList);

  /*   console.log(
    followersList.some((item) => item._id === req.user._id), // RESULTADO FALSE , FINDINDEX -1
    "POSICION del SOME", // ---> item._id ---> modificación de item a item._id 1/3/21
  ); */
  console.log("POSICION ", followersList.indexOf(req.user._id));

  if (followersList.indexOf(req.user._id) < 0) {
    console.log("entré al IF, NO LO SEGUIA");
    await User.findByIdAndUpdate(req.user, { $push: { following: selectedUser._id } });
    await User.findByIdAndUpdate(selectedUser._id, { $push: { followers: req.user._id } });
    res.redirect("/home");
  } else {
    console.log("entré al ELSE, YA LO SEGUIA Y AHORA NO");
    await User.findByIdAndUpdate(req.user, { $pull: { following: { $in: [selectedUser._id] } } });
    await User.findByIdAndUpdate(selectedUser._id, { $pull: { followers: { $in: [req.user] } } });

    res.redirect("/home");
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
