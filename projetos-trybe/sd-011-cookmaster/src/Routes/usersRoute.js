const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);

module.exports = router;