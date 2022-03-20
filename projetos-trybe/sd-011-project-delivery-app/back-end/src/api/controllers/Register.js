const md5 = require('md5');
const models = require('../../database/models');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await models.users.create({
    name,
    email,
    password: md5(password),
    role: 'custumer',
  });
  console.log(user);

  return res.status(201).json(user);
};

module.exports = register;
