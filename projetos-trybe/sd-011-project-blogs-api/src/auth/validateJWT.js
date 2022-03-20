const jwt = require('jsonwebtoken');
const { User } = require('../../models');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token.trim() === '') return res.status(401).json({ message: 'Token not found' });

  try {
    const { data } = jwt.verify(token, secret);

    const user = await User.findOne({ where: { email: data } });

    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;
    
    return next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};