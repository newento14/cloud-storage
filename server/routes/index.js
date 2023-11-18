const { Router } = require('express');
const router = Router(); // Створюємо об'єкт Router
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

router.use('/user', userRouter);
router.use('/file', fileRouter)

module.exports = router;