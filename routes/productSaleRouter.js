const router = require('express').Router();
const productSaleCtrl = require('../controllers/productSaleCtrl');
const { auth } = require('../middlewares/auth');


router.post("/product-sale", auth, productSaleCtrl.addProductSale)

router.get("/product-sale", productSaleCtrl.getProductSale)

router.get("/product-sale/:id", productSaleCtrl.getProductSaleDetail)


router.get("/my-product-sale", auth, productSaleCtrl.myProductSale)

router.patch('/my-product-sale/:id', auth, productSaleCtrl.updateProductSale)

router.delete('/my-product-sale/:id', auth, productSaleCtrl.deleteProductSale)


router.patch("/stock-product-sale", auth, productSaleCtrl.stockProductSale)


module.exports = router