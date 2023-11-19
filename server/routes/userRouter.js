const { Router } = require('express');
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')


router.post('/refresh', userController.refresh)
router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 64}),
  userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router