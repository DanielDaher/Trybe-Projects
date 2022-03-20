const messagesModel = require('../models/messagesModel');

const getMessage = async (req, res) => {
  const messages = await messagesModel.getAll();

  if (!messages) {
    return res.status(400)
      .render('webchat', { messages: 'Mensagens não encontradas' });
  }

  /* const messages = [{
    timestamp: '12-08-2021 1:27:52 PM',
    nickname: 'diego',
    message: 'Lorem ipsum', 
  }]; */
  res.status(200).render('webchat', { messages });
};

const createMessage = async (req, res) => {
  try {
    const { message, nickname, timestamp } = req;
    const insertMessage = await messagesModel.createMessage({ message, nickname, timestamp });
  
    return insertMessage;
  } catch (error) {
    res.status(400).json({ error: 'Erro ao inserir mensagem no banco de dados' });
    console.error(error);
  }
};

module.exports = {
  getMessage,
  createMessage,
};