const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const auth = require('../../middlewares');

router.post('/signup', ctrl.register);
router.post('/login', ctrl.login);
router.get('/current', auth, ctrl.getCurrent);
router.get('/logout', auth, ctrl.logOut);
router.patch('/', auth, ctrl.changeSubscription);

module.exports = router;
