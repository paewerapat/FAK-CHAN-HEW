const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const { auth } = require('../middlewares/auth')


router.post('/products', auth, productCtrl.createProduct)

router.get('/products', auth, productCtrl.getProduct)

router.patch('/products', auth, productCtrl.updateProduct)


module.exports = router