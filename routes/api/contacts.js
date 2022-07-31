const express = require('express');
const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrl.getAll);
router.post('/', ctrl.post);
router.get('/:contactId', ctrl.getById);
router.delete('/:contactId', ctrl.remove);
router.put('/:contactId', ctrl.put);
router.patch('/:contactId/favorite', ctrl.updateFavorite);

module.exports = router;
