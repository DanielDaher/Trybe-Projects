module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true
  });

  products.associate = ({ salesProducts }) => {
    products.hasMany(salesProducts, {
      foreignKey: 'product_id', as: 'product'
    });
  };

  return products;
};
