const router = require('express').Router();

const randomToken = require('../helper/token');
const validateEmail = require('../helper/validations/validateEmail');
const validatePassword = require('../helper/validations/validatePassword');

router.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: randomToken });
});

module.exports = router;