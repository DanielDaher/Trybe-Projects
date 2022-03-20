const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const usersConnection = await connection();
  const users = await usersConnection.collection('users').find().toArray();

  return users;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const usersConnection = await connection();
  const user = await usersConnection.collection('users').findOne(ObjectId(id));

  return user;
};

const getByEmail = async (email) => {
  /* const query = { email }; */

  const usersConnection = await connection();
  const userEmail = await usersConnection.collection('users').findOne({ email });

  return userEmail;
};

const create = async ({ email, password, name }) => {
  const data = {
    email,
    password,
    name,
    role: 'user',
  };

  const usersConnection = await connection();
  const insert = await usersConnection.collection('users').insertOne(data);

  return { _id: insert.insertedId, name, email, role: data.role };
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
};