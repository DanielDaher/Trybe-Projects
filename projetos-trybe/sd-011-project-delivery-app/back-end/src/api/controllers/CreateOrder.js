const models = require('../../database/models');

const order = async (req, res) => {
  const {
    user_id: userId,
    seller_id: sellerId,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    status,
  } = req.body;

  const createdOrder = await models.sales.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  });
  
  res.status(201).json(createdOrder);
};

module.exports = order;
