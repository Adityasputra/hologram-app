const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (user) => {
  return jwt.sign(
    {
      _id: user.id,
      nama: user.name,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET
  );
};

module.exports = generateToken;
