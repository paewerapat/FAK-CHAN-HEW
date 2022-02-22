const router = require('express').Router();
const orderCtrl = require('../controllers/orderCtrl');
const { auth } = require('../middlewares/auth')

// Buyer Order
router.post("/order-buy-product", auth, orderCtrl.buyProductOrder)

router.get("/order-buy-product", auth, orderCtrl.getBuyProductOrder)

router.patch("/order-buy-product", auth, orderCtrl.updateBuyProduct)

// Seller Order
router.get("/order-product-sale", auth, orderCtrl.getProductSaleOrder)

router.patch("/order-product-sale", auth, orderCtrl.updateOrderProductSale)


module.exports = router