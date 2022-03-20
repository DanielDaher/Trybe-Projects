module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true
  });

  users.associate = ({ sales }) => {
    users.hasMany(sales,
      { foreignkey: 'user_id', as: 'user' },
      { foreignkey: 'seller_id', as: 'seller' });
  }

  return users;
};
