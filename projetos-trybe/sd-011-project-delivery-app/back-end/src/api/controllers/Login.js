const md5 = require('md5');
const models = require('../../database/models');
const validadeJWT = require('../../auth/validateJWT');

const login = async (req, res) => {
  const { login: email, password } = req.body;

  const userData = await models.users.findOne({ where: { email } });

  if (!userData) {
    return res.status(404).json();
  }

  const user = userData.dataValues;

  const hashPassword = md5(password);
  const isValid = user.password === hashPassword;

  if (!isValid) {
    return res.status(401).json();
  }

  const token = validadeJWT.createToken({ user });

  res.status(200).json({ user, token });
};

module.exports = login;
