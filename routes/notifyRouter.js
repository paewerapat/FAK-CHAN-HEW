const router = require('express').Router();
const { auth } = require('../middlewares/auth')
const notifyCtrl = require('../controllers/notifyCtrl');


router.post('/notify', auth, notifyCtrl.createNotify)


router.get('/notify', auth, notifyCtrl.getNotify)


router.patch('/notify/:id', auth, notifyCtrl.readNotify)


module.exports = router