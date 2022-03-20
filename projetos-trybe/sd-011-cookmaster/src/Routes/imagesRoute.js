const router = require('express').Router();
const imagesController = require('../controllers/imagesController');

router.get('/:imageName', imagesController.getImageByRecipeId);

module.exports = router;
