const router = require('express').Router();
const { auth, manager } = require('../middlewares/auth')
const categoryCtrl = require('../controllers/categoryCtrl');


router.post("/category", auth, categoryCtrl.createCategory);

router.get("/category", auth, categoryCtrl.getCategory)

router.patch("/category", auth, manager, categoryCtrl.updateCategory)

router.delete("/category/:id", auth, manager, categoryCtrl.deleteCategory)


module.exports = router