const express = require('express');
const router = express.Router();
const { homeCtrlFunction, cartCtrlFunction, storeCtrlFunction} = require('../controllers/pagesCtrlFile')

router.get('/', homeCtrlFunction);
router.get('/cart', cartCtrlFunction);
router.get('/store', storeCtrlFunction);

module.exports = router;