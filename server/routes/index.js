const { Router } = require('express');
const router = Router(); // Створюємо об'єкт Router
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

router.use('/auth', userRouter);
router.use('/files', fileRouter)

module.exports = router;