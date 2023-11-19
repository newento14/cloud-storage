const { Router } = require('express');
const router = new Router()
const fileController = require('../controllers/fileController')
const {body} = require('express-validator')
const auth = require('../middlewares/auth.middleware')


router.post('/folder', auth, fileController.createFolder);
router.post('', auth, fileController.getAllFiles);
router.delete('', auth, fileController.deleteFile);
router.post('/setStarred', auth, fileController.setStarred);
router.post('/upload', auth, fileController.uploadFile);
router.get('/download', auth, fileController.downloadFile)


module.exports = router