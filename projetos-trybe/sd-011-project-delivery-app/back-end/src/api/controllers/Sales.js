const { Op } = require('sequelize');
const models = require('../../database/models');

const salesBySellerId = async (req, res) => {
  const { id } = req.params;
  const salesList = await models.sales.findAll({ where: { sellerId: id } });

  return res.status(200).json(salesList);
};

const salesByCustomerId = async (req, res) => {
  const { id } = req.params;
  const salesList = await models.sales.findAll({ where: { userId: id } });

  return res.status(200).json(salesList);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await models.sales.findOne({ where: { id } });

  return res.status(200).json(sale);
};

const saleDetailsBySaleId = async (req, res) => {
  const { id } = req.params;

  const productList = await models.salesProducts.findAll({ where: { saleId: id } });

  res.status(200).json(productList);
};

const updateSale = async (req, res) => {
  const { saleId, newStatus } = req.body;
  const sale = await models.sales.findByPk(saleId);
  sale.status = newStatus;
  const updatedSale = await sale.save();

  res.status(200).json(updatedSale);
};

const getSaleWithSellerName = async (req, res) => {
  const { id } = req.params;
  const sale = await models.sales.findByPk(id);
  const seller = await models.users.findByPk(sale.sellerId);
  const productList = await models.salesProducts.findAll({ where: { saleId: id } });
  const productsIDs = productList.map(({ productId }) => productId);
  const products = await models.products.findAll({ where: { id: { [Op.in]: productsIDs } } });
  const data = {
    seller: seller.name,
    ...sale.dataValues,
    productList,
    products,
  };

  res.status(200).json(data);
};

module.exports = {
  salesBySellerId,
  getSaleById,
  saleDetailsBySaleId,
  salesByCustomerId,
  updateSale,
  getSaleWithSellerName,
};