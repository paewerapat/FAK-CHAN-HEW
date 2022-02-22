const router = require('express').Router();
const profileCtrl = require('../controllers/profileCtrl')
const { auth } = require('../middlewares/auth')


// Update Profile
router.patch('/update-profile', auth, profileCtrl.updateProfile);

// Update Profile
router.patch('/update-password', auth, profileCtrl.updatePassword);


module.exports = router;