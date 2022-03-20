const jwt = require('jsonwebtoken');

const secret = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

const createToken = (payload) => jwt.sign(payload, secret);

const validateToken = (token) => jwt.verify(token, secret);

module.exports = {
  createToken,
  validateToken,
};
