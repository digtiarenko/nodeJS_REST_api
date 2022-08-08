const express = require('express');
const ctrl = require('../../controllers/contacts');
const { auth } = require('../../middlewares/');
const router = express.Router();

router.get('/', auth, ctrl.getAll);
router.post('/', auth, ctrl.post);
router.get('/:contactId', auth, ctrl.getById);
router.delete('/:contactId', auth, ctrl.remove);
router.put('/:contactId', auth, ctrl.put);
router.patch('/:contactId/favorite', auth, ctrl.updateFavorite);

module.exports = router;
