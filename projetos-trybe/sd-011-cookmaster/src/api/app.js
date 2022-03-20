const express = require('express');
const usersRoute = require('../Routes/usersRoute');
const loginRoute = require('../Routes/loginRoute');
const recipesRoute = require('../Routes/recipesRoute');
const imagesRoute = require('../Routes/imagesRoute');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRoute);

app.use('/login', loginRoute);

app.use('/recipes', recipesRoute);

app.use('/images', imagesRoute);

module.exports = app;
