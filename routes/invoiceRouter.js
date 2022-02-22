const router = require('express').Router()
const invoiceCtrl = require('../controllers/invoiceCtrl')
const { auth } = require('../middlewares/auth')


router.post("/invoice", auth, invoiceCtrl.createInvoice)

router.patch("/accept-invoice", auth, invoiceCtrl.acceptInvoice)

router.patch("/invoice-shipped", auth, invoiceCtrl.alreadyShipped)

router.get("/invoice", invoiceCtrl.getInvoice)

router.get("/invoice/:id", invoiceCtrl.getInvoiceDetail)

router.get("/my-invoice", auth, invoiceCtrl.getMyInvoice)

router.get("/my-shipment", auth, invoiceCtrl.getMyShipment)


module.exports = router