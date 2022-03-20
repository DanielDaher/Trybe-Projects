const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const generateNewToken = async (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateNewToken,
};
