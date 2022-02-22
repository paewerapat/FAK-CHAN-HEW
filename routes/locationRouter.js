const router = require('express').Router();
const locationCtrl = require('../controllers/locationCtrl');
const { auth } = require('../middlewares/auth')


router.post("/location", auth, locationCtrl.createLocation)


router.get("/location", auth, locationCtrl.getlocation)


module.exports = router