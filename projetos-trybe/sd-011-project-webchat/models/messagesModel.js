const connection = require('./connection');

const createMessage = async ({ message, nickname, timestamp }) => {
  const db = await connection();
  const messageInserted = await db.collection('messages')
    .insertOne({ message, nickname, timestamp });

  return messageInserted;
};

const getAll = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find().toArray();

  return messages;
};

module.exports = {
  createMessage,
  getAll,
};
