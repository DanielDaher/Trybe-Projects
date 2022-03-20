module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {}, { timestamps: false, tableName: 'PostsCategories' });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};