const express = require('express');
const router = express.Router();
const { homeCtrlFunction, cartCtrlFunction} = require('../controllers/pagesCtrlFile')

router.get('/', homeCtrlFunction);
router.get('/cart', cartCtrlFunction);

module.exports = router;