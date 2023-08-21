const jwt = require("jsonwebtoken");
const jwt_key = "chanduisaprogrammer@";

const fetchUser = (req, res, next) => {
  // Get the user from jwt token and add user id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_key);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
