const express = require('express');

const app = express();
const PORT = 3000;

const productsRoute = require('./Routes/ProductsRoute');
const salesRoute = require('./Routes/SalesRoute');

app.use(express.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
