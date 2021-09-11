const express = require('express');
const router = express.Router();
const {checkoutCtrlFunction, cartSuccessFunction}  = require('../controllers/checkoutCtrlFile')

router.post('/', checkoutCtrlFunction);
router.get('/success', cartSuccessFunction);

module.exports = router;