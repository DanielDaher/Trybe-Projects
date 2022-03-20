const express = require('express');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

const userRoute = require('./src/Routes/userRoute.js');
const loginRoute = require('./src/Routes/loginRoute.js');
const categorieRoute = require('./src/Routes/categorieRoute.js');
const blogPostRoute = require('./src/Routes/blogPostRoute.js');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);

app.use('/login', loginRoute);

app.use('/categories', categorieRoute);

app.use('/post', blogPostRoute);
