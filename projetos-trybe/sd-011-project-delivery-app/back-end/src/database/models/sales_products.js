module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define("salesProducts",
  {
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true
  });

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts, // tabela que faz o meio de campo (que possui as relacoes)
      foreignkey: 'product_id',
      otherkey: 'sale_id'
    });
    models.sales.belongsToMany(models.products, {
      as: 'product',
      through: salesProducts,
      otherkey: 'product_id'
    });
  }

  return salesProducts;
};
