// const models = require('../../database/models');
// const { createToken } = require('../../auth/validadeJWT');

// create user
const createUser = async (req, res) => {
  // const { name, email, password } = req.body;

  // const user = await models.users.findOne({ where: { email } });

  // if (user) {
  //   return res.status(409).json({ message: 'userExists' });
  // }

  // const userToken = createToken({ payload: { name, email, password } });
  // const newUser = await models.users.create({
  //   name,
  //   email,
  //   password,
  // });

  res.status(201).json({ message: 'userCreated' });
};

module.exports = createUser;
