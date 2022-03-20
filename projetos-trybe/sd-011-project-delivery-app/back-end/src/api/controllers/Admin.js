const md5 = require('md5');
const models = require('../../database/models');

const admin = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await models.users.create({
    name,
    email,
    password: md5(password),
    role,
  });

  return res.status(201).json(user);
};

module.exports = admin;
