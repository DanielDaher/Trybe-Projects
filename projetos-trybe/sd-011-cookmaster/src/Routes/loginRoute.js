const router = require('express').Router();
const loginController = require('../controllers/loginController');
/* const validateJWT = require('../auth/validateJWT'); */

router.post('/', loginController.makeSingature);

module.exports = router;