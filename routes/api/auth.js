const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { auth, upload } = require('../../middlewares');

router.post('/signup', ctrl.register);
router.get('/verify/:verificationToken', ctrl.verify);
router.post('/login', ctrl.login);
router.get('/current', auth, ctrl.getCurrent);
router.get('/logout', auth, ctrl.logOut);
router.patch('/', auth, ctrl.changeSubscription);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.setAvatar);

module.exports = router;
