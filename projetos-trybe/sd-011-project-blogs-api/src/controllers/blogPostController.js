const blogPostService = require('../services/blogPostService');

const create = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { user } = req;
  
    const insert = await blogPostService.create({ title, categoryIds, content, user });
  
    return res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const findPosts = await blogPostService.getAllPosts();

    return res.status(findPosts.statusCode).json(findPosts.responseMessage);
  } catch (error) {
    console.error(error);
  }
}; 

module.exports = {
  create,
  getAllPosts,
};