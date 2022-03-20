module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define("sales", {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true
  });

  sales.associate = ({ users, salesProducts }) => {
    sales.belongsTo(users,
      { foreignKey: 'user_id', as: 'user' },
      { foreignKey: 'seller_id', as: 'seller' });
    sales.hasMany(salesProducts,
      { foreignKey: 'sale_id', as: 'sales'}); 
  }

  return sales;
};
