const Categories = (sequelize, DataTypes) => {
  const category = sequelize.define('Categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
    timestamps: false,
  });

  return category;
};

module.exports = Categories;