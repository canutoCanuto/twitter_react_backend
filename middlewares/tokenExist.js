const User = require("../models/User");

const tokenExist = async (req, res, next) => {
  const { tokens } = await User.findById(req.user.sub, { tokens: 1 });
  const [Bearer, actualToken] = req.headers.authorization.split(" ");
  const exist = tokens.some((token) => token === actualToken);
  if (exist) return next();
  res.json({ message: "error" });
};
module.exports = tokenExist;
