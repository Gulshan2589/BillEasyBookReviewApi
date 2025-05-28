const jwt = require('jsonwebtoken');
const jwtSceret = process.env.JWT_SECRET
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id
    },
    jwtSceret,
    { expiresIn: '3d' }
  );
  return token;
};

module.exports = generateToken;