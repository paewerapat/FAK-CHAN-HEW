const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const { auth } = require('../middlewares/auth');


// LOGIN API
router.post('/login', authCtrl.login);

// Register API
router.post('/register', authCtrl.register);

// Current API
router.post('/current-user', auth, authCtrl.currentUser);

// Service Charge
router.get('/services-charge', auth, authCtrl.getServiceCharge);


module.exports = router;