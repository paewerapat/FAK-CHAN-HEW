const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const { manager, auth } = require('../middlewares/auth')


router.get('/all-members', auth, manager, userCtrl.getAllMembers)

router.patch('/all-members', auth, manager, userCtrl.updateMembers)

router.get("/profile-user/:id", auth, userCtrl.getProfileUser)

router.put("/cart", auth, userCtrl.updateMyCart);

router.get("/cart", auth, userCtrl.getMyCart);

router.delete("/cart", auth, userCtrl.deleteAllCart);


module.exports = router;