const router = require('express').Router();
const ProductsController = require('../controllers/ProductsController');

router.post('/', ProductsController.create);

router.get('/', ProductsController.getAll);

router.get('/:id', ProductsController.getById);

router.put('/:id', ProductsController.update);

router.delete('/:id', ProductsController.remove);

module.exports = router;