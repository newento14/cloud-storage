const { Router } = require('express');
const router = Router(); // Створюємо об'єкт Router
const userRouter = require('./userRouter');

router.use('/user', userRouter);

module.exports = router;