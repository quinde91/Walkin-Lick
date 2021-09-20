const express = require('express');
const router = express.Router();
const {checkoutCtrlFunction, cartSuccessFunction, finishOrder}  = require('../controllers/checkoutCtrlFile')

router.post('/', checkoutCtrlFunction);
router.get('/success', cartSuccessFunction);
router.get('/session/:id', finishOrder);

module.exports = router;