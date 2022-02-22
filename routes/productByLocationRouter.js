const router = require('express').Router();
const { auth } = require('../middlewares/auth')
const productByLocationCtrl = require('../controllers/productByLocationCtrl')


router.post("/product-by-location", auth, productByLocationCtrl.createProductByLocation);


router.get("/product-by-location", auth, productByLocationCtrl.getProductByLocation)



module.exports = router