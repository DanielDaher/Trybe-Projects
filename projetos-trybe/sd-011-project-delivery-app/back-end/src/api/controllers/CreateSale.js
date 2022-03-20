const models = require('../../database/models');

/* const sale = async (req, res) => {
  const {
    sale_id: saleId,
    product_id: productId,
    quantity,
  } = req.body;

  const theSale = await models.salesProducts.create({
    saleId,
    productId,
    quantity,
  });

  res.status(201).json(theSale);
}; */

const registerSale = async (req, res) => {
  const { saleId, saleProducts } = req.body;

  const registers = saleProducts
    .map(({ productId, quantity }) => 
      models.salesProducts.create({ saleId, productId, quantity }));
  // registers cria um array de promises, que colocarão os produtos dentro do database.

  await Promise.all(registers);
  // Cada produto tem uma promise. O promise.all, executa tudo de uma vez, com uma performance melhor.

  res.status(201).end();
};

module.exports = registerSale;
