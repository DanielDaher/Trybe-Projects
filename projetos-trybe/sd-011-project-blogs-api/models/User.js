const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, { foreignKey: 'id', as: 'blogPosts' });
  };

  return user;
};

module.exports = User;