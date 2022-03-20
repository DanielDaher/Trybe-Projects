const login = require('./Login');
const register = require('./Register');
const createUser = require('./CreateUser');
const { getAllProducts, getProductById } = require('./ProductsController');
const {
  salesBySellerId,
  getSaleById,
  saleDetailsBySaleId,
  salesByCustomerId,
  updateSale,
  getSaleWithSellerName,
} = require('./Sales');
const products = require('./ProductsController');
const admin = require('./Admin');
const order = require('./CreateOrder');
const sale = require('./CreateSale');
const sellers = require('./GetAllSellers');
const sellerById = require('./GetSellerById');

module.exports = {
  login,
  register,
  createUser,
  getAllProducts,
  getProductById,
  salesBySellerId,
  getSaleById,
  salesByCustomerId,
  saleDetailsBySaleId,
  updateSale,
  getSaleWithSellerName,
  products,
  admin,
  order,
  sale,
  sellers,
  sellerById,
};
