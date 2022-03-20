const jwt = require('jsonwebtoken'); // npm install jsonwebtoken
const User = require('../models/usersModel');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
   const secret = 'seusecretdetoken';

   const validateLogin = (email, password) => {
    if (!email || !password) return true;
    return false;
  };
  
  const validateEmail = (user, password) => {
    if (!user || user.password !== password) return true;
    return false;
  };

const makeSingature = async (req, res) => {
  try {
  const { email, password } = req.body;

  if (validateLogin(email, password)) { 
    return res.status(401).json({ message: 'All fields must be filled' }); 
  }

  const user = await User.getByEmail(email);

  if (validateEmail(user, password)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

   /* Criamos uma config básica para o nosso JWT, onde:
      expiresIn -> significa o tempo pelo qual esse token será válido;
      algorithm -> algoritmo que você usará para assinar sua mensagem
                  (lembra que falamos do HMAC-SHA256 lá no começo?). */

    /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  /*
      Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlNTQ1OTBiYTQ5NDQ4ZjdlNWZhNzNjMCIsInVzZXJuYW1lIjoiaXRhbHNzb2RqIiwicGFzc3dvcmQiOiJzZW5oYTEyMyIsIl9fdiI6MH0sImlhdCI6MTU4MjU4NzMyNywiZXhwIjoxNTg0Nzc0NzE0OTA4fQ.UdSZi7K105aaVnoKSW-dnw-Kv7H3oKMtE9xv4jwyfSM
      */
    const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  makeSingature,
};