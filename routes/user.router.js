const router = require('express').Router();
const { register, login, refreshtoken } = require('../controllers/user.controller');
const authMiddleware = require('../utils/middleware/authmiddleware');

router.post('/register', register);

router.post('/login', login);

router.post('/refresh-token', authMiddleware, refreshtoken);

module.exports = router;

