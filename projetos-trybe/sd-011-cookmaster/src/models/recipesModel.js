const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const recipesConnection = await connection();
  const recipes = await recipesConnection.collection('recipes').find().toArray();

  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipesConnection = await connection();
  const recipe = await recipesConnection.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const updateRecipeById = async ({ id, userId, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  const findId = { _id: ObjectId(id) };
  const query = { $set: { name, ingredients, preparation } };

  const recipesConnection = await connection();
  await recipesConnection.collection('recipes').updateOne(findId, query);

  return { _id: id, name, ingredients, preparation, userId };
};

const uploadRecipeImage = async ({ id, filePath }) => {
  const findId = { _id: ObjectId(id) };
  const query = { $set: { image: filePath } };

  const recipesConnection = await connection();
  await recipesConnection.collection('recipes').updateOne(findId, query);
};

const create = async ({ name, ingredients, preparation, userId }) => {
  const data = {
    name,
    ingredients,
    preparation,
    userId,
  };

  const recipesConnection = await connection();
  const insert = await recipesConnection.collection('recipes').insertOne(data);

  return { _id: insert.insertedId, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id) => {
  const recipesConnection = await connection();
  await recipesConnection.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return { statusCode: 204 };
};

module.exports = {
  getAll,
  getById,
  updateRecipeById,
  uploadRecipeImage,
  create,
  deleteRecipe,
};