const express = require('express');
const router = express.Router();
const { productsCtrlFunction } = require('../controllers/productsCtrlFile')

router.get('/', productsCtrlFunction );


module.exports = router;