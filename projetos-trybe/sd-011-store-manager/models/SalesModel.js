const { ObjectId } = require('mongodb');
const connection = require('./connection');
const ProductsModel = require('./ProductsModel');

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
};

const getAll = async () => {
  const db = await connection();

  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const update = async (id, sale) => {
  const dataId = {
    _id: ObjectId(id),
  };

  const query = {
    $set: { itensSold: sale },
  };

  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db.collection('sales').updateOne(dataId, query);

  return { _id: id, itensSold: sale };
};

const updateProducts = async (sales, action) => {
  if (action === 'remove') {
    await sales.map(async (sale) => {
        const info = await ProductsModel.getById(sale.productId);
        await ProductsModel
          .update({ name: info.name, quantity: info.quantity - sale.quantity, id: sale.productId });
        return info;
      });
      return;
  }
  const infoSale = await getById(sales);
  await infoSale.itensSold.map(async (sale) => { 
    const item = await ProductsModel.getById(sale.productId);
    await ProductsModel
      .update({ name: item.name, quantity: item.quantity + sale.quantity, id: sale.productId });
  });
};

const remove = async ({ id }) => {
  const db = await connection();
  await updateProducts(id, 'add');
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

const create = async (sales) => {
  const data = {
    itensSold: sales,
  };
  const db = await connection();

  const inserted = await db.collection('sales').insertOne(data);

  await updateProducts(sales, 'remove');

  return { _id: inserted.insertedId, itensSold: sales };
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
};