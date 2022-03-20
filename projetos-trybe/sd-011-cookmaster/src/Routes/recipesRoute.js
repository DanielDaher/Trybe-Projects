const router = require('express').Router();
const { upload } = require('../helpers/upload');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');

router.post('/', validateJWT, recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.put('/:id', validateJWT, recipesController.updateRecipeById);
router.put('/:id/image/', upload.single('image'), validateJWT, recipesController.uploadRecipeImage);
router.delete('/:id', validateJWT, recipesController.deleteRecipe);

module.exports = router;