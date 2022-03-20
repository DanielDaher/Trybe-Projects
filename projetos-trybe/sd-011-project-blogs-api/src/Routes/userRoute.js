const router = require('express').Router();
const validateJWT = require('../auth/validateJWT');
const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/:id', validateJWT, userController.getUserByID);
router.get('/', validateJWT, userController.getAllUsers);

module.exports = router;
