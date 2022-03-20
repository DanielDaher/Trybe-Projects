const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  '/images',
  express.static(path.join(__dirname, '..', '..', 'public')),
);

const controllers = require('./controllers');
const { validateNewUser, userExists } = require('./middlewares');

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/products', controllers.getAllProducts);
app.get('/product/:id', controllers.getProductById);
app.post('/login', controllers.login);
app.post('/register', validateNewUser, userExists, controllers.register);
app.get('/sales/:id', controllers.salesBySellerId);
app.get('/sale/:id', controllers.getSaleById);
app.put('/sale/update', controllers.updateSale);
app.get('/saleDetails/:id', controllers.saleDetailsBySaleId);
app.post('/admin', validateNewUser, userExists, controllers.admin); // admin
app.post('/order', controllers.order);
app.post('/sale', controllers.sale);
app.get('/sellers', controllers.sellers);
app.get('/saleSeller/:id', controllers.getSaleWithSellerName);
app.get('/seller/:id', controllers.sellerById);
app.get('/customerSales/:id', controllers.salesByCustomerId);

module.exports = app;
