const router = require('express').Router();
const SalesController = require('../controllers/SalesController');

router.post('/', SalesController.create);

router.get('/', SalesController.getAll);

router.get('/:id', SalesController.getById);

router.put('/:id', SalesController.update);

router.delete('/:id', SalesController.remove);

module.exports = router;