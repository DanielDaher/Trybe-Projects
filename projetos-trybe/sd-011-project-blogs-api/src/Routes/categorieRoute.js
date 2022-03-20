const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const categorieController = require('../controllers/categorieController');

router.post('/', validateJWT, categorieController.create);
router.get('/', validateJWT, categorieController.getAllCategories);

module.exports = router;