const router = require('express').Router();
const imagesCtrl = require('../controllers/imagesCtrl');
const { auth } = require('../middlewares/auth')


// Destroy API
router.post('/images', imagesCtrl.destroyImages)


module.exports = router;