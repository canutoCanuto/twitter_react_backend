const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

module.exports = { getToken, deleteToken };
