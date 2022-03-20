const socket = window.io();

const formMessage = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');

const formNickname = document.querySelector('.nicknameForm');
const inputNickname = document.querySelector('#nicknameInput');

const userNickname = document.querySelector('#nickname');

const sendUserNickNameToSessionStorage = (nickname) => {
  console.log(nickname);
  sessionStorage.setItem('nickname', nickname);
};

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: userNickname.innerText });
  inputMessage.value = '';
  return false;
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname.innerText = inputNickname.value;
  sendUserNickNameToSessionStorage(inputNickname.value);
  socket.emit('userNickname', { nickname: inputNickname.value, action: 'updateNickname' });
  inputNickname.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const cutID = (id) => id.slice(-16);

const showUserNickname = () => {
  socket.emit('generateNickname');

  socket.on('generateNickname', (id) => {
    const nickname = cutID(id);
    userNickname.innerText = nickname;
    sendUserNickNameToSessionStorage(nickname);
    socket.emit('userNickname', { nickname, action: 'newNickname' });
  });
};

showUserNickname();

const showOnlineUsers = (nicknames) => {
  const onlineUsersList = document.querySelector('#users-online');
  onlineUsersList.innerText = '';

  nicknames.forEach(({ nickname }) => {
    if (nickname !== sessionStorage.getItem('nickname')) {
      const li = document.createElement('li');
      li.setAttribute('data-testid', 'online-user');
      li.innerText = nickname;
      onlineUsersList.appendChild(li);
    }
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('online-users', (nicknames) => showOnlineUsers(nicknames));