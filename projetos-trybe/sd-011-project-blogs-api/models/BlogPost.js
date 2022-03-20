const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPost;