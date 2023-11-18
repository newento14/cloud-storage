const { Router } = require('express');
const router = new Router()
const fileController = require('../controllers/fileController')
const {body} = require('express-validator')
const auth = require('../middlewares/auth.middleware')


router.post('/folder', auth, fileController.createFolder);
router.get('', auth, fileController.getAllFiles);
router.delete('', auth, fileController.deleteFile);


module.exports = router