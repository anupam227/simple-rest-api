const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

const { Signup, login, deleteUser } = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');


router.post('/signup',[check("email","email is required").isEmail()], Signup)

router.post('/login',[check("email","email is required").isEmail()], login)

router.delete('/:userId',checkAuth, deleteUser)

module.exports = router;