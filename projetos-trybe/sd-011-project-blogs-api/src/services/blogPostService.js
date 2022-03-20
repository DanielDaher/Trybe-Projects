const { BlogPost, User, Categories } = require('../../models');
const { invalidBlogPostReqBody, validateCategoryArray } = require('./helpers');

const create = async ({ title, categoryIds, content, user }) => {
  const invalidReqBody = invalidBlogPostReqBody({ title, content, categoryIds });
  const { statusCode, errorMessage } = invalidReqBody;
  if (invalidReqBody) return { statusCode, responseMessage: errorMessage };
  
  const categoriesDoesntExist = await validateCategoryArray(categoryIds);
  if (categoriesDoesntExist) return { statusCode: 400, responseMessage: categoriesDoesntExist };

  const newPost = await BlogPost.create({ title, content, userId: user.id });

  await newPost.setCategories(categoryIds);
  await newPost.setUser(user);

  return { responseMessage: newPost, statusCode: 201 };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ 
      model: User, 
      as: 'user', 
      attributes: { exclude: ['password'] },
     },
     { model: Categories, as: 'categories' }],
  });

  return { statusCode: 200, responseMessage: posts };
};

module.exports = {
  create,
  getAllPosts,
};