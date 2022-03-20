const moment = require('moment');
const messagesController = require('../controller/messagesController');

const timestamp = moment().format('MM-DD-YYYY h:mm:ss A');

const returnNicknames = ({ io, nicknames }) => io.emit('online-users', nicknames);

let nicknames = [];

const emitNicknames = ({ io, id, nickname, action }) => {
  if (action === 'newNickname') {
    nicknames.push({ id, nickname });
    return returnNicknames({ io, nicknames });
  }
  
  const filteredNicknames = nicknames.filter((user) => user.id !== id);
  nicknames = filteredNicknames;
  nicknames.push({ id, nickname });
  returnNicknames({ io, nicknames });
};

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;

  socket.on('userNickname', ({ nickname, action }) => emitNicknames({ io, id, nickname, action }));

  socket.on('message', async ({ chatMessage: message, nickname }) => {
    console.log(`${timestamp} - ${nickname}: ${message}`);
    await messagesController.createMessage({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('disconnect', () => {
    const filteredNicknames = nicknames.filter((user) => user.id !== id);

    nicknames = filteredNicknames;
    returnNicknames({ io, nicknames });
  });

  socket.on('generateNickname', () => socket.emit('generateNickname', id));
});
