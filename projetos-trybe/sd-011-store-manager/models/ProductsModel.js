const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const data = {
    name,
    quantity,
  };

  const db = await connection();
  const inserted = await db.collection('products').insertOne(data);
  return { _id: inserted.insertedId, name, quantity };
};

const getByName = async ({ name }) => {
  const data = {
    name,
  };

  const db = await connection();
  const product = await db.collection('products').find(data).toArray();
  return product;
};

const getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const product = await db.collection('products').findOne(ObjectId(id));
  /* console.log(product); */
  
  return product;
};

const update = async ({ name, quantity, id }) => {
  const dataId = {
    _id: ObjectId(id),
  };

  const query = {
    $set: { name, quantity },
  };

  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db.collection('products').updateOne(dataId, query);

  return { _id: id, name, quantity };
};

const remove = async ({ id }) => {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  remove,
};